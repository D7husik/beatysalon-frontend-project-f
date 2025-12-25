import React from 'react';
import { Loader } from 'lucide-react';

/**
 * Loading Spinner Component
 * Displays a spinning loader with loading text
 */
const LoadingSpinner = () => (
    <div className="loading-spinner">
        <Loader className="spinner-icon" />
        <span className="loading-text">Loading...</span>
    </div>
);

export default LoadingSpinner;
