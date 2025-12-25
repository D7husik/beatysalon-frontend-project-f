import React from 'react';
import { Check } from 'lucide-react';

/**
 * Staff Card Component
 * Displays a staff member with their details in a selectable card
 * @param {Object} props
 * @param {Object} props.staff - Staff member object
 * @param {boolean} props.selected - Whether the card is selected
 * @param {Function} props.onClick - Click handler
 */
const StaffCard = ({ staff, selected, onClick }) => (
    <div
        onClick={onClick}
        className={`staff-card ${selected ? 'staff-card--selected' : ''}`}
    >
        <div className="staff-card__content">
            <div className="staff-card__avatar">
                {staff.name.charAt(0)}
            </div>
            <div className="staff-card__info">
                <h4 className="staff-card__name">{staff.name}</h4>
                <p className="staff-card__specialty">{staff.specialty}</p>
                <p className="staff-card__experience">{staff.experience} experience</p>
            </div>
            {selected && <Check className="staff-card__check" />}
        </div>
    </div>
);

export default StaffCard;
