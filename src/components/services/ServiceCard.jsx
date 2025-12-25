import React from 'react';
import { Scissors, Clock, Check } from 'lucide-react';

/**
 * Service Card Component
 * Displays a service with its details in a card format
 * @param {Object} props
 * @param {Object} props.service - Service object
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.selected - Whether the card is selected
 * @param {boolean} props.selectable - Whether the card is in selectable mode
 */
const ServiceCard = ({ service, onClick, selected = false, selectable = false }) => (
    <div
        onClick={onClick}
        className={`service-card ${selected ? 'service-card--selected' : ''}`}
    >
        <div className="service-card__header">
            <div className="service-card__icon">
                <Scissors className="icon" />
            </div>
            <div className="service-card__price-container">
                <span className="service-card__price">${service.price}</span>
                {selectable && selected && (
                    <div className="service-card__check">
                        <Check className="icon-sm" />
                    </div>
                )}
            </div>
        </div>
        <h3 className="service-card__title">{service.name}</h3>
        <p className="service-card__description">{service.description}</p>
        <div className="service-card__footer">
            <div className="service-card__duration">
                <Clock className="icon-xs" />
                <span>{service.duration} min</span>
            </div>
            <span className="service-card__category">{service.category}</span>
        </div>
    </div>
);

export default ServiceCard;
