import { useContext } from 'react';
import { BookingContext } from '../context';

/**
 * Custom hook to access booking context
 * @returns {Object} Booking context value
 * @throws {Error} If used outside of BookingProvider
 */
export const useBooking = () => {
    const context = useContext(BookingContext);

    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }

    return context;
};
