import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useBooking } from '../hooks';
import { LoadingSpinner, ErrorMessage, AppointmentCard } from '../components';
import { EditAppointmentModal } from '../components/booking';

/**
 * My Appointments Page Component
 * Displays user's upcoming appointments with management options
 */
const MyAppointmentsPage = () => {
    const navigate = useNavigate();
    const {
        appointments,
        services,
        staff,
        deleteAppointment,
        loading,
        error,
        refreshAppointments
    } = useBooking();

    const [editingAppointment, setEditingAppointment] = useState(null);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={refreshAppointments} />;

    // Filter and sort upcoming appointments
    const upcomingAppointments = appointments
        .filter(apt => {
            const aptDate = new Date(apt.date + 'T' + apt.time);
            return aptDate >= new Date();
        })
        .sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.time);
            const dateB = new Date(b.date + 'T' + b.time);
            return dateA - dateB;
        });

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment);
    };

    const handleCloseEdit = () => {
        setEditingAppointment(null);
    };

    const handleUpdateSuccess = () => {
        refreshAppointments();
        setEditingAppointment(null);
    };

    return (
        <div className="appointments-page">
            {/* Header */}
            <div className="appointments-page__header">
                <h1 className="appointments-page__title">My Appointments</h1>
                <p className="appointments-page__subtitle">
                    Manage your upcoming salon appointments
                </p>
            </div>

            {/* Appointments List */}
            {upcomingAppointments.length === 0 ? (
                <div className="empty-appointments">
                    <Calendar className="empty-appointments__icon" />
                    <h3 className="empty-appointments__title">No Upcoming Appointments</h3>
                    <p className="empty-appointments__text">
                        Ready to look your best? Book your next appointment now!
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn--primary"
                    >
                        Book Appointment
                    </button>
                </div>
            ) : (
                <div className="appointments-grid">
                    {upcomingAppointments.map(apt => (
                        <AppointmentCard
                            key={apt.id}
                            appointment={apt}
                            services={services}
                            staff={staff}
                            onCancel={deleteAppointment}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editingAppointment && (
                <EditAppointmentModal
                    appointment={editingAppointment}
                    services={services}
                    staff={staff}
                    onClose={handleCloseEdit}
                    onUpdate={handleUpdateSuccess}
                />
            )}
        </div>
    );
};

export default MyAppointmentsPage;
