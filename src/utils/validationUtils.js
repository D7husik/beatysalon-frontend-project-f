/**
 * Form validation utility functions
 */

/**
 * Validate booking form data
 * @param {Object} formData - Form data object
 * @param {string} formData.clientName - Client's full name
 * @param {string} formData.phone - Client's phone number
 * @param {string} formData.email - Client's email (optional)
 * @returns {Object} Errors object with field names as keys
 */
export const validateBookingForm = (formData) => {
    const errors = {};

    // Name validation
    if (!formData.clientName?.trim()) {
        errors.clientName = 'Name is required';
    } else if (formData.clientName.length < 2) {
        errors.clientName = 'Name must be at least 2 characters';
    }

    // Phone validation - only digits allowed
    if (!formData.phone?.trim()) {
        errors.phone = 'Phone is required';
    } else if (!/^\d{10,}$/.test(formData.phone)) {
        errors.phone = 'Phone number must be at least 10 digits';
    }

    // Email validation (optional)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

/**
 * Check if form has any errors
 * @param {Object} errors - Errors object
 * @returns {boolean} True if form is valid (no errors)
 */
export const isFormValid = (errors) => {
    return Object.keys(errors).length === 0;
};
