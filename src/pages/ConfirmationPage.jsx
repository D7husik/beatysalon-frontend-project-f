import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Calendar, Clock, User, MapPin, AlertCircle } from 'lucide-react';
import { useBooking } from '../hooks';
import { formatDate } from '../utils';
import { LoadingSpinner, ErrorMessage } from '../components';
import WeatherTips from '../components/booking/WeatherTips';

/**
 * Confirmation Page Component
 * Displays booking confirmation after successful appointment creation
 */
const ConfirmationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state?.bookingData;

    const { createAppointment, resetSelections } = useBooking();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const hasCreatedRef = useRef(false);

    const createBooking = async () => {
        if (!bookingData) {
            setError("Booking data not found. Please start over.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const appointmentData = {
                serviceIds: bookingData.services.map(s => s.id),
                serviceNames: bookingData.services.map(s => s.name).join(', '),
                staffId: bookingData.staff.id,
                staffName: bookingData.staff.name,
                date: bookingData.date,
                time: bookingData.time,
                clientName: bookingData.clientName,
                phone: bookingData.phone,
                email: bookingData.email || '',
                notes: bookingData.notes || '',
                totalPrice: bookingData.totalPrice,
                totalDuration: bookingData.totalDuration,
                status: 'confirmed',
                createdAt: new Date().toISOString()
            };

            const newAppointment = await createAppointment(appointmentData);
            setAppointment(newAppointment);
            resetSelections(); // Clear booking selections after successful booking
        } catch (err) {
            setError(err.message || "Failed to create appointment.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!bookingData) {
            navigate('/');
            return;
        }

        if (!hasCreatedRef.current) {
            hasCreatedRef.current = true;
            createBooking();
        }
    }, [bookingData, navigate]);

    if (loading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="confirmation-page confirmation-page--error">
                <ErrorMessage
                    message={error}
                    onRetry={() => navigate('/booking')}
                />
                <button
                    onClick={() => navigate('/')}
                    className="btn btn--primary btn--full"
                >
                    Return Home
                </button>
            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="confirmation-page confirmation-page--error">
                <ErrorMessage message="No appointment details found after confirmation." />
                <button
                    onClick={() => navigate('/')}
                    className="btn btn--primary btn--full"
                >
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="confirmation-page">
            <div className="confirmation-card">
                {/* Success Icon */}
                <div className="confirmation-card__icon">
                    <Check className="icon-lg" />
                </div>

                {/* Title */}
                <h1 className="confirmation-card__title">Booking Confirmed!</h1>
                <p className="confirmation-card__subtitle">
                    Your appointment has been successfully scheduled.
                </p>

                {/* Appointment Details */}
                <div className="confirmation-details">
                    <h2 className="confirmation-details__title">Appointment Details</h2>

                    <div className="confirmation-details__list">
                        <div className="confirmation-details__item">
                            <AlertCircle className="icon" /> {/* Changed from Scissors */}
                            <div className="confirmation-details__content">
                                <p className="confirmation-details__label">Services</p>
                                <p className="confirmation-details__value">
                                    {appointment.serviceNames}
                                </p>
                                <p className="confirmation-details__meta">
                                    ${appointment.totalPrice} • {appointment.totalDuration} minutes
                                </p>
                            </div>
                        </div>

                        <div className="confirmation-details__item">
                            <User className="icon" />
                            <div className="confirmation-details__content">
                                <p className="confirmation-details__label">Specialist</p>
                                <p className="confirmation-details__value">{appointment.staffName}</p>
                            </div>
                        </div>

                        <div className="confirmation-details__item">
                            <Calendar className="icon" />
                            <div className="confirmation-details__content">
                                <p className="confirmation-details__label">Date</p>
                                <p className="confirmation-details__value">{formatDate(appointment.date)}</p>
                            </div>
                        </div>

                        <div className="confirmation-details__item">
                            <Clock className="icon" />
                            <div className="confirmation-details__content">
                                <p className="confirmation-details__label">Time</p>
                                <p className="confirmation-details__value">{appointment.time}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weather Tips */}
                <WeatherTips
                    bookedServices={appointment.serviceNames.split(', ')}
                    appointmentTime={appointment.time}
                />

                {/* Action Buttons */}
                <div className="confirmation-actions">
                    <button
                        onClick={() => navigate('/appointments')}
                        className="btn btn--primary btn--full"
                    >
                        View My Appointments
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="btn btn--secondary btn--full"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
