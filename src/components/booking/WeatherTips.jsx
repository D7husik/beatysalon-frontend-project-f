import React, { useState, useEffect } from 'react';
import { Cloud, Loader } from 'lucide-react';
import { getWeather } from '../../api/weatherApi';
import { generateWeatherTips } from '../../utils/weatherTipsUtils';

/**
 * Weather Tips Component
 * Displays personalized weather-based care tips on the confirmation page
 * @param {Object} props
 * @param {Array<string>} props.bookedServices - List of booked service names
 * @param {string} props.appointmentTime - Appointment time
 */
const WeatherTips = ({ bookedServices = [], appointmentTime }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [tips, setTips] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherAndGenerateTips = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch weather data
                const weather = await getWeather();
                setWeatherData(weather);

                // Generate tips based on weather and services
                const generatedTips = generateWeatherTips(weather, bookedServices);
                setTips(generatedTips);
            } catch (err) {
                console.error('Error fetching weather tips:', err);
                setError('Unable to load weather tips');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherAndGenerateTips();
    }, [bookedServices]);

    // Loading state
    if (loading) {
        return (
            <div className="weather-tips weather-tips--loading">
                <div className="weather-tips__loading">
                    <Loader className="weather-tips__spinner" />
                    <span>Loading weather tips...</span>
                </div>
            </div>
        );
    }

    // Error state - silently fail, don't show error to user
    if (error || !tips || tips.tips.length === 0) {
        return null;
    }

    return (
        <div className="weather-tips">
            {/* Weather Header */}
            <div className="weather-tips__header">
                <div className="weather-tips__weather-info">
                    <span className="weather-tips__icon">{tips.icon}</span>
                    <div className="weather-tips__details">
                        <h3 className="weather-tips__title">Weather Care Tips</h3>
                        <p className="weather-tips__summary">
                            {tips.weatherSummary} • {tips.temperature}°C in New York
                        </p>
                    </div>
                </div>
            </div>

            {/* Tips Grid */}
            <div className="weather-tips__grid">
                {tips.tips.map((tip, index) => (
                    <div key={index} className="weather-tip-card">
                        <div className="weather-tip-card__icon">{tip.icon}</div>
                        <div className="weather-tip-card__content">
                            <h4 className="weather-tip-card__title">{tip.title}</h4>
                            <p className="weather-tip-card__message">{tip.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherTips;
