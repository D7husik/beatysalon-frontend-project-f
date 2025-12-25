import React, { createContext, useState, useEffect } from 'react';
import { api } from '../api';

// localStorage key for appointments
const APPOINTMENTS_STORAGE_KEY = 'suulu_salon_appointments';

/**
 * Load appointments from localStorage
 */
const loadAppointmentsFromStorage = () => {
    try {
        const stored = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading appointments from localStorage:', error);
        return [];
    }
};

/**
 * Save appointments to localStorage
 */
const saveAppointmentsToStorage = (appointments) => {
    try {
        localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
    } catch (error) {
        console.error('Error saving appointments to localStorage:', error);
    }
};

/**
 * Booking Context
 * Provides global state management for the booking system
 */
export const BookingContext = createContext();

/**
 * Booking Provider Component
 * Wraps the application and provides booking state and actions
 */
export const BookingProvider = ({ children }) => {
    // Data state
    const [services, setServices] = useState([]);
    const [staff, setStaff] = useState([]);
    // Load appointments from localStorage on initial render
    const [appointments, setAppointments] = useState(() => loadAppointmentsFromStorage());

    // Selection state
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load initial data on mount (services and staff from API)
    useEffect(() => {
        loadInitialData();
    }, []);

    // Save appointments to localStorage whenever they change
    useEffect(() => {
        saveAppointmentsToStorage(appointments);
    }, [appointments]);

    /**
     * Load initial data from API
     */
    const loadInitialData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [servicesData, staffData, appointmentsData] = await Promise.all([
                api.getServices(),
                api.getStaff(),
                api.getAppointments()
            ]);
            setServices(servicesData);
            setStaff(staffData);
            // Merge API appointments with localStorage appointments
            const storedAppointments = loadAppointmentsFromStorage();
            const allAppointments = [...storedAppointments];
            // Add API appointments that aren't already in localStorage
            appointmentsData.forEach(apt => {
                if (!allAppointments.find(a => a.id === apt.id)) {
                    allAppointments.push(apt);
                }
            });
            setAppointments(allAppointments);
        } catch (err) {
            setError(err.message);
            // Still use localStorage appointments if API fails
        } finally {
            setLoading(false);
        }
    };

    /**
     * Create a new appointment
     * @param {Object} appointmentData - Appointment details
     * @returns {Promise<Object>} Created appointment
     */
    const createAppointment = async (appointmentData) => {
        setLoading(true);
        setError(null);
        try {
            const newAppointment = await api.createAppointment(appointmentData);
            setAppointments(prev => [...prev, newAppointment]);
            return newAppointment;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delete an appointment
     * @param {string} id - Appointment ID
     */
    const deleteAppointment = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await api.deleteAppointment(id);
            setAppointments(prev => prev.filter(apt => apt.id !== id));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update an appointment
     * @param {string} id - Appointment ID
     * @param {Object} updatedData - Updated appointment data
     * @returns {Promise<Object>} Updated appointment
     */
    const updateAppointment = async (id, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await api.updateAppointment(id, updatedData);
            setAppointments(prev => prev.map(apt => apt.id === id ? updated : apt));
            return updated;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Reset booking selections
     */
    const resetSelections = () => {
        setSelectedServices([]);
        setSelectedStaff(null);
        setSelectedDate('');
        setSelectedTime('');
    };

    // Context value
    const value = {
        // Data
        services,
        staff,
        appointments,

        // Selection state
        selectedServices,
        setSelectedServices,
        selectedStaff,
        setSelectedStaff,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,

        // UI state
        loading,
        error,

        // Actions
        createAppointment,
        deleteAppointment,
        updateAppointment,
        resetSelections,
        refreshAppointments: loadInitialData
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};
