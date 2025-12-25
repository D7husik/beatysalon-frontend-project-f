import React from 'react';
import { X, Check } from 'lucide-react';

/**
 * Service Detail Modal Component
 * Displays detailed information about a service in a modal
 * @param {Object} props
 * @param {Object} props.service - Service object to display
 * @param {Function} props.onClose - Modal close handler
 * @param {Function} props.onBook - Book service handler
 */
const ServiceDetailModal = ({ service, onClose, onBook }) => {
    if (!service) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal__content">
                    {/* Header */}
                    <div className="modal__header">
                        <div>
                            <h2 className="modal__title">{service.name}</h2>
                            <span className="modal__category">{service.category}</span>
                        </div>
                        <button onClick={onClose} className="modal__close-btn">
                            <X className="icon-lg" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="modal__body">
                        <p className="modal__description">{service.description}</p>

                        <div className="modal__stats">
                            <div className="modal__stat">
                                <p className="modal__stat-label">Duration</p>
                                <p className="modal__stat-value">{service.duration} min</p>
                            </div>
                            <div className="modal__stat">
                                <p className="modal__stat-label">Price</p>
                                <p className="modal__stat-value">${service.price}</p>
                            </div>
                        </div>

                        <div className="modal__info-box">
                            <h3 className="modal__info-title">What to Expect</h3>
                            <ul className="modal__info-list">
                                <li className="modal__info-item">
                                    <Check className="icon-check" />
                                    <span>Professional consultation before treatment</span>
                                </li>
                                <li className="modal__info-item">
                                    <Check className="icon-check" />
                                    <span>Premium products and equipment</span>
                                </li>
                                <li className="modal__info-item">
                                    <Check className="icon-check" />
                                    <span>Experienced and certified professionals</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="modal__footer">
                        <button onClick={onClose} className="btn btn--secondary">
                            Close
                        </button>
                        <button
                            onClick={() => {
                                onBook(service);
                                onClose();
                            }}
                            className="btn btn--primary"
                        >
                            Book This Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailModal;
