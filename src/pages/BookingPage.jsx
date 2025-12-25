import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Check, AlertCircle } from 'lucide-react';
import { useBooking } from '../hooks';
import { generateTimeSlots, validateBookingForm, isFormValid, checkStaffAvailability } from '../utils';
import { LoadingSpinner, ServiceCard, StaffCard, TimeSlot } from '../components';

/**
 * Booking Page Component
 * Multi-step booking wizard for creating appointments
 */
const BookingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialServices = location.state?.initialServices || [];

    const {
        services,
        staff,
        appointments,
        selectedServices,
        setSelectedServices,
        selectedStaff,
        setSelectedStaff,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        loading
    } = useBooking();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        clientName: '',
        phone: '',
        email: '',
        notes: ''
    });
    const [errors, setErrors] = useState({});

    // Set initial services if provided
    useEffect(() => {
        if (initialServices && initialServices.length > 0) {
            setSelectedServices(initialServices);
        }
    }, [initialServices, setSelectedServices]);

    const timeSlots = generateTimeSlots();
    const minDate = new Date().toISOString().split('T')[0];

    // Toggle service selection
    const toggleService = (service) => {
        setSelectedServices(prev => {
            const exists = prev.find(s => s.id === service.id);
            if (exists) {
                return prev.filter(s => s.id !== service.id);
            } else {
                return [...prev, service];
            }
        });
    };

    // Calculate totals
    const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

    // Form validation
    const handleValidation = () => {
        const newErrors = validateBookingForm(formData);
        setErrors(newErrors);
        return isFormValid(newErrors);
    };

    // Handle successful booking
    const handleBookingSuccess = (bookingData) => {
        navigate('/confirmation', { state: { bookingData } });
    };

    // Submit booking
    const handleSubmit = () => {
        if (handleValidation()) {
            const bookingData = {
                services: selectedServices,
                staff: selectedStaff,
                date: selectedDate,
                time: selectedTime,
                totalPrice,
                totalDuration,
                ...formData
            };
            handleBookingSuccess(bookingData);
        }
    };

    // Check if can proceed to next step
    const canProceed = () => {
        switch (step) {
            case 1: return selectedServices.length > 0;
            case 2: return selectedStaff;
            case 3: return selectedDate && selectedTime;
            case 4: return formData.clientName && formData.phone;
            default: return false;
        }
    };

    // Step labels
    const stepLabels = ['Services', 'Staff', 'Date & Time', 'Details'];

    if (loading) return <LoadingSpinner />;

    return (
        <div className="booking-page">
            {/* Header */}
            <div className="booking-page__header">
                <h1 className="booking-page__title">Book Appointment</h1>
                <div className="booking-page__steps">
                    {stepLabels.map((label, idx) => (
                        <React.Fragment key={idx}>
                            <span className={`booking-page__step ${step > idx + 1 ? 'booking-page__step--completed' :
                                step === idx + 1 ? 'booking-page__step--active' : ''
                                }`}>
                                {label}
                            </span>
                            {idx < 3 && <ChevronRight className="icon-xs" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Step 1: Select Services */}
            {step === 1 && (
                <div className="booking-step">
                    <h2 className="booking-step__title">Select Services</h2>
                    <p className="booking-step__subtitle">Choose one or more services for your appointment</p>

                    {selectedServices.length > 0 && (
                        <div className="booking-summary">
                            <div className="booking-summary__content">
                                <div>
                                    <p className="booking-summary__count">
                                        Selected: {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''}
                                    </p>
                                    <p className="booking-summary__total">
                                        Total: ${totalPrice} • {totalDuration} minutes
                                    </p>
                                </div>
                                <Check className="icon" />
                            </div>
                        </div>
                    )}

                    <div className="booking-grid booking-grid--2">
                        {services.map(service => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                onClick={() => toggleService(service)}
                                selected={selectedServices.some(s => s.id === service.id)}
                                selectable={true}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Step 2: Select Staff */}
            {step === 2 && (
                <div className="booking-step">
                    <h2 className="booking-step__title">Choose Your Specialist</h2>
                    <div className="booking-grid booking-grid--2">
                        {staff.map(person => (
                            <StaffCard
                                key={person.id}
                                staff={person}
                                selected={selectedStaff?.id === person.id}
                                onClick={() => setSelectedStaff(person)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Select Date & Time */}
            {step === 3 && (
                <div className="booking-step">
                    <h2 className="booking-step__title">Pick Date & Time</h2>

                    <div className="form-group">
                        <label className="form-label">Select Date</label>
                        <input
                            type="date"
                            min={minDate}
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setSelectedTime('');
                            }}
                            className="form-input"
                        />
                    </div>

                    {selectedDate && (
                        <div className="form-group">
                            <label className="form-label">Available Time Slots</label>
                            <div className="time-slots-grid">
                                {timeSlots.map(time => {
                                    const available = checkStaffAvailability({
                                        date: selectedDate,
                                        time: time,
                                        staffId: selectedStaff?.id,
                                        appointments: appointments,
                                        duration: totalDuration
                                    });
                                    return (
                                        <TimeSlot
                                            key={time}
                                            time={time}
                                            available={available}
                                            selected={selectedTime === time}
                                            onClick={() => available && setSelectedTime(time)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Step 4: Client Details */}
            {step === 4 && (
                <div className="booking-step">
                    <h2 className="booking-step__title">Your Details</h2>
                    <div className="booking-form">
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
                                    // Only allow digits
                                    const value = e.target.value.replace(/\D/g, '');
                                    setFormData({ ...formData, phone: value });
                                    if (errors.phone) setErrors({ ...errors, phone: '' });
                                }}
                                className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                                placeholder="5550100"
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
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="booking-nav">
                <button
                    onClick={() => step === 1 ? onNavigate('home') : setStep(step - 1)}
                    className="btn btn--secondary"
                >
                    Back
                </button>

                <button
                    onClick={() => step === 4 ? handleSubmit() : setStep(step + 1)}
                    disabled={!canProceed()}
                    className="btn btn--primary"
                >
                    {step === 4 ? 'Confirm Booking' : 'Continue'}
                </button>
            </div>
        </div>
    );
};

export default BookingPage;
