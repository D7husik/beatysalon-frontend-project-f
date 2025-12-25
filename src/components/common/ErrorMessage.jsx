import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Error Message Component
 * Displays an error message with optional retry button
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onRetry - Optional retry callback
 */
const ErrorMessage = ({ message, onRetry }) => (
    <div className="error-message">
        <div className="error-content">
            <AlertCircle className="error-icon" />
            <div className="error-details">
                <h3 className="error-title">Error</h3>
                <p className="error-text">{message}</p>
                {onRetry && (
                    <button onClick={onRetry} className="error-retry-btn">
                        Try again
                    </button>
                )}
            </div>
        </div>
    </div>
);

export default ErrorMessage;
