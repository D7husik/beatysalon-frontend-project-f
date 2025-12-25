import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, AlertCircle, Check } from 'lucide-react';
import { useBooking } from '../../hooks';
import { generateTimeSlots, validateBookingForm, isFormValid } from '../../utils';
import { checkStaffAvailability } from '../../utils/dateUtils';
import { TimeSlot } from '../index';

/**
 * Edit Appointment Modal Component
 * Allows users to modify existing appointments
 * @param {Object} props
 * @param {Object} props.appointment - The appointment to edit
 * @param {Array} props.services - All available services
 * @param {Array} props.staff - All available staff members
 * @param {Function} props.onClose - Close modal handler
 * @param {Function} props.onUpdate - Update success handler
 */
const EditAppointmentModal = ({ appointment, services, staff, onClose, onUpdate }) => {
    const { updateAppointment, appointments, loading } = useBooking();
    const [formData, setFormData] = useState({
        date: appointment.date,
        time: appointment.time,
        clientName: appointment.clientName,
        phone: appointment.phone,
        email: appointment.email || '',
        notes: appointment.notes || ''
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const [success, setSuccess] = useState(false);

    const timeSlots = generateTimeSlots();
    const minDate = new Date().toISOString().split('T')[0];

    // Get staff member details
    const staffMember = staff.find(s => s.id === appointment.staffId);

    // Check if time slot is available
    const isSlotAvailable = (time) => {
        return checkStaffAvailability({
            date: formData.date,
            time: time,
            staffId: appointment.staffId,
            appointments: appointments,
            excludeAppointmentId: appointment.id,
            duration: appointment.totalDuration
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError(null);

        // Validate form
        const validationErrors = validateBookingForm(formData);
        if (!isFormValid(validationErrors)) {
            setErrors(validationErrors);
            return;
        }

        // Check if selected time is still available
        if (!isSlotAvailable(formData.time)) {
            setApiError(`Time slot ${formData.time} is no longer available for ${staffMember?.name}. Please select a different time.`);
            return;
        }

        try {
            await updateAppointment(appointment.id, formData);
            setSuccess(true);
            setTimeout(() => {
                onUpdate();
                onClose();
            }, 1500);
        } catch (error) {
            setApiError(error.message || 'Failed to update appointment');
        }
    };

    // Handle date change
    const handleDateChange = (newDate) => {
        setFormData({ ...formData, date: newDate, time: '' });
        setApiError(null);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal-content--large" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <h2 className="modal-title">Edit Appointment</h2>
                    <button onClick={onClose} className="modal-close" aria-label="Close">
                        <X className="icon" />
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="success-banner">
                        <Check className="icon" />
                        <span>Appointment updated successfully!</span>
                    </div>
                )}

                {/* API Error */}
                {apiError && (
                    <div className="error-banner">
                        <AlertCircle className="icon" />
                        <span>{apiError}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="edit-appointment-form">
                    {/* Service & Staff Info (Read-only) */}
                    <div className="form-section">
                        <h3 className="form-section__title">Service Details</h3>
                        <div className="info-box">
                            <p className="info-box__label">Services</p>
                            <p className="info-box__value">{appointment.serviceNames}</p>
                            <p className="info-box__meta">
                                ${appointment.totalPrice} • {appointment.totalDuration} minutes
                            </p>
                        </div>
                        <div className="info-box">
                            <p className="info-box__label">Specialist</p>
                            <p className="info-box__value">{appointment.staffName}</p>
                        </div>
                    </div>

                    {/* Date & Time Section */}
                    <div className="form-section">
                        <h3 className="form-section__title">Date & Time</h3>

                        <div className="form-group">
                            <label className="form-label">
                                <Calendar className="icon-xs" />
                                Select Date
                            </label>
                            <input
                                type="date"
                                min={minDate}
                                value={formData.date}
                                onChange={(e) => handleDateChange(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>

                        {formData.date && (
                            <div className="form-group">
                                <label className="form-label">
                                    <Clock className="icon-xs" />
                                    Available Time Slots
                                </label>
                                <div className="time-slots-grid">
                                    {timeSlots.map(time => {
                                        const available = isSlotAvailable(time);
                                        return (
                                            <TimeSlot
                                                key={time}
                                                time={time}
                                                available={available}
                                                selected={formData.time === time}
                                                onClick={() => available && setFormData({ ...formData, time })}
                                            />
                                        );
                                    })}
                                </div>
                                {formData.time && (
                                    <p className="form-helper-text">
                                        Selected: {formData.time}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Client Details Section */}
                    <div className="form-section">
                        <h3 className="form-section__title">Your Details</h3>

                        <div className="form-group">
                            <label className="form-label">
                                Full Name <span className="form-required">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.clientName}
                                onChange={(e) => {
                                    setFormData({ ...formData, clientName: e.target.value });
                                    if (errors.clientName) setErrors({ ...errors, clientName: '' });
                                }}
                                className={`form-input ${errors.clientName ? 'form-input--error' : ''}`}
                                placeholder="Jenny Zhus"
                                required
                            />
                            {errors.clientName && (
                                <p className="form-error">
                                    <AlertCircle className="icon-xs" />
                                    {errors.clientName}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Phone Number <span className="form-required">*</span>
                            </label>
                            <input
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={formData.phone}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    setFormData({ ...formData, phone: value });
                                    if (errors.phone) setErrors({ ...errors, phone: '' });
                                }}
                                className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                                placeholder="5550100"
                                required
                            />
                            {errors.phone && (
                                <p className="form-error">
                                    <AlertCircle className="icon-xs" />
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email (Optional)</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                    if (errors.email) setErrors({ ...errors, email: '' });
                                }}
                                className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                                placeholder="jenny@example.com"
                            />
                            {errors.email && (
                                <p className="form-error">
                                    <AlertCircle className="icon-xs" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Special Notes (Optional)</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                rows={3}
                                className="form-textarea"
                                placeholder="Any special requests or preferences..."
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="modal-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn--secondary"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn--primary"
                            disabled={loading || !formData.date || !formData.time || success}
                        >
                            {loading ? 'Updating...' : 'Update Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAppointmentModal;
