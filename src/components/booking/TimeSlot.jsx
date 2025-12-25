import React from 'react';

/**
 * Time Slot Component
 * Displays a selectable time slot button
 * @param {Object} props
 * @param {string} props.time - Time string in HH:MM format
 * @param {boolean} props.available - Whether the slot is available
 * @param {boolean} props.selected - Whether the slot is selected
 * @param {Function} props.onClick - Click handler
 */
const TimeSlot = ({ time, available, selected, onClick }) => (
    <button
        onClick={onClick}
        disabled={!available}
        className={`time-slot ${!available
                ? 'time-slot--unavailable'
                : selected
                    ? 'time-slot--selected'
                    : ''
            }`}
    >
        {time}
    </button>
);

export default TimeSlot;
