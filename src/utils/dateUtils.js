/**
 * Date and time utility functions
 */

/**
 * Generate available time slots for booking
 * Returns slots from 9:00 AM to 5:30 PM in 30-minute intervals
 * @returns {string[]} Array of time slots in HH:MM format
 */
export const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
        for (let minute of [0, 30]) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            slots.push(time);
        }
    }
    return slots;
};

/**
 * Check if a time slot is available for booking
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} time - Time in HH:MM format
 * @param {string} staffId - Staff member ID
 * @param {Array} appointments - List of existing appointments
 * @returns {boolean} True if slot is available
 */
export const isSlotAvailable = (date, time, staffId, appointments) => {
    return !appointments.some(apt =>
        apt.date === date &&
        apt.time === time &&
        apt.staffId === staffId
    );
};

/**
 * Format a date string for display
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date (e.g., "Friday, December 13, 2024")
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
export const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
};

/**
 * Check if a staff member is available at a specific time
 * Prevents double-booking by checking for time conflicts
 * Now accounts for appointment duration to block all affected time slots
 * @param {Object} params
 * @param {string} params.date - Date in YYYY-MM-DD format
 * @param {string} params.time - Time in HH:MM format
 * @param {string} params.staffId - Staff member ID
 * @param {Array} params.appointments - List of existing appointments
 * @param {string} params.excludeAppointmentId - Optional appointment ID to exclude (for edit mode)
 * @param {number} params.duration - Duration of the new appointment in minutes (default: 30)
 * @returns {boolean} True if staff member is available
 */
export const checkStaffAvailability = ({ date, time, staffId, appointments, excludeAppointmentId = null, duration = 30 }) => {
    // Convert requested time to minutes since midnight
    const [reqHours, reqMinutes] = time.split(':').map(Number);
    const requestedStartMinutes = reqHours * 60 + reqMinutes;
    const requestedEndMinutes = requestedStartMinutes + duration;

    // Check if any appointment conflicts with this time slot
    const hasConflict = appointments.some(apt => {
        // Skip the appointment being edited
        if (excludeAppointmentId && apt.id === excludeAppointmentId) {
            return false;
        }

        // Skip if different staff member or different date
        if (apt.staffId !== staffId || apt.date !== date) {
            return false;
        }

        // Convert existing appointment time to minutes
        const [aptHours, aptMinutes] = apt.time.split(':').map(Number);
        const existingStartMinutes = aptHours * 60 + aptMinutes;
        const existingEndMinutes = existingStartMinutes + (apt.totalDuration || 30);

        // Check for overlap:
        // Appointments overlap if one starts before the other ends
        const overlaps = (
            (requestedStartMinutes >= existingStartMinutes && requestedStartMinutes < existingEndMinutes) || // New starts during existing
            (requestedEndMinutes > existingStartMinutes && requestedEndMinutes <= existingEndMinutes) || // New ends during existing
            (requestedStartMinutes <= existingStartMinutes && requestedEndMinutes >= existingEndMinutes)    // New completely contains existing
        );

        return overlaps;
    });

    return !hasConflict;
};
