/**
 * Weather Tips Generator Utility
 * Generates personalized care tips based on weather conditions and booked services
 */

/**
 * Weather condition icons
 */
const WEATHER_ICONS = {
    rain: '🌧️',
    storm: '⛈️',
    snow: '❄️',
    sunny: '☀️',
    cloudy: '☁️',
    windy: '🌬️',
    default: '🌤️'
};

/**
 * Category icons
 */
const CATEGORY_ICONS = {
    transportation: '🚕',
    protection: '☂️',
    product: '✨',
    timing: '⏰',
    clothing: '🧣',
    care: '💆'
};

/**
 * Normalize service names for matching
 */
const normalizeService = (service) => service.toLowerCase().replace(/[&\s]+/g, '');

/**
 * Check if services include certain categories
 */
const hasHairService = (services) =>
    services.some(s => {
        const normalized = normalizeService(s);
        return normalized.includes('hair') || normalized.includes('styling') || normalized.includes('coloring');
    });

const hasNailService = (services) =>
    services.some(s => {
        const normalized = normalizeService(s);
        return normalized.includes('manicure') || normalized.includes('pedicure') || normalized.includes('nail');
    });

const hasMakeupService = (services) =>
    services.some(s => {
        const normalized = normalizeService(s);
        return normalized.includes('makeup');
    });

const hasSkinService = (services) =>
    services.some(s => {
        const normalized = normalizeService(s);
        return normalized.includes('facial') || normalized.includes('skin') || normalized.includes('waxing');
    });

/**
 * Generate weather summary text
 */
const getWeatherSummary = (weather) => {
    const { temperature, condition, humidity } = weather;

    let tempDesc = '';
    if (temperature > 25) tempDesc = 'Hot';
    else if (temperature < 10) tempDesc = 'Cold';
    else tempDesc = 'Mild';

    let conditionDesc = '';
    switch (condition) {
        case 'rain':
        case 'storm':
            conditionDesc = 'and rainy';
            break;
        case 'snow':
            conditionDesc = 'and snowy';
            break;
        case 'sunny':
            conditionDesc = 'and sunny';
            break;
        case 'windy':
            conditionDesc = 'and windy';
            break;
        case 'cloudy':
            conditionDesc = 'and cloudy';
            break;
        default:
            conditionDesc = '';
    }

    if (humidity > 70) {
        return `${tempDesc} ${conditionDesc} (high humidity)`.trim();
    }

    return `${tempDesc} ${conditionDesc}`.trim();
};

/**
 * Generate tips based on weather and services
 */
const generateTips = (weather, services) => {
    const tips = [];
    const { temperature, condition, humidity, windSpeed, uvIndex } = weather;

    const hasHair = hasHairService(services);
    const hasNails = hasNailService(services);
    const hasMakeup = hasMakeupService(services);
    const hasSkin = hasSkinService(services);

    // Rain/Storm tips
    if (condition === 'rain' || condition === 'storm') {
        if (hasHair) {
            tips.push({
                category: 'transportation',
                icon: CATEGORY_ICONS.transportation,
                title: 'Consider Taking a Taxi',
                message: `It's raining outside! Protect your fresh hairstyle by taking a taxi or rideshare home. Your new look deserves to stay perfect!`
            });
            tips.push({
                category: 'protection',
                icon: CATEGORY_ICONS.protection,
                title: 'Bring an Umbrella',
                message: `Rain can cause frizz and affect your hair color. Keep it covered with a large umbrella until you're safely indoors.`
            });
        }
        if (hasNails) {
            tips.push({
                category: 'care',
                icon: '💅',
                title: 'Extra Drying Time',
                message: `High humidity from the rain means your nail polish needs extra time to set. Wait an additional 5-10 minutes before leaving.`
            });
        }
        if (humidity > 70 && hasHair) {
            tips.push({
                category: 'product',
                icon: CATEGORY_ICONS.product,
                title: 'Anti-Humidity Protection',
                message: `Humidity is at ${humidity}%. Ask your stylist for anti-frizz serum to keep your hair smooth and styled all day.`
            });
        }
    }

    // Hot weather tips
    if (temperature > 25) {
        if (hasHair) {
            tips.push({
                category: 'protection',
                icon: '🧢',
                title: 'Wear a Hat or Scarf',
                message: `At ${temperature}°C, UV rays can fade your hair color quickly. Protect your style with a wide-brimmed hat or silk scarf.`
            });
        }
        if (uvIndex >= 6) {
            tips.push({
                category: 'product',
                icon: '🧴',
                title: 'UV Protection Spray',
                message: `UV index is high (${uvIndex}). Ask about UV-protectant hair spray to shield your color from sun damage.`
            });
        }
        if (hasSkin || hasMakeup) {
            tips.push({
                category: 'care',
                icon: '💧',
                title: 'Stay Hydrated',
                message: `Hot weather at ${temperature}°C can affect your skin. Stay hydrated to maintain your fresh facial glow!`
            });
        }
        if (hasMakeup) {
            tips.push({
                category: 'timing',
                icon: CATEGORY_ICONS.timing,
                title: 'Avoid Peak Sun Hours',
                message: `At ${temperature}°C, try to stay indoors between 12-3 PM when UV rays are strongest to preserve your makeup.`
            });
        }
    }

    // Cold weather tips
    if (temperature < 10) {
        if (hasHair) {
            tips.push({
                category: 'clothing',
                icon: CATEGORY_ICONS.clothing,
                title: 'Cover Your Hair',
                message: `At ${temperature}°C, cold air can dry out your freshly treated hair. Wear a silk-lined hat to protect your style.`
            });
        }
        if (hasMakeup) {
            tips.push({
                category: 'care',
                icon: '🧊',
                title: 'Protect Your Makeup',
                message: `Cold wind at ${temperature}°C can dry and crack your makeup. Apply moisturizer and keep lip balm handy.`
            });
        }
        if (hasSkin) {
            tips.push({
                category: 'care',
                icon: '🧴',
                title: 'Moisturize Well',
                message: `Cold weather can undo your facial treatment benefits. Use a rich moisturizer to lock in hydration.`
            });
        }
    }

    // Windy weather tips
    if (condition === 'windy' || windSpeed > 20) {
        if (hasHair) {
            tips.push({
                category: 'protection',
                icon: CATEGORY_ICONS.clothing,
                title: 'Protect Your Style',
                message: `Wind speed is ${windSpeed} km/h! Tie your hair loosely or use a scarf to keep your fresh style intact.`
            });
        }
        if (hasMakeup) {
            tips.push({
                category: 'protection',
                icon: CATEGORY_ICONS.clothing,
                title: 'Shield Your Face',
                message: `Strong winds at ${windSpeed} km/h can disturb your makeup. Wear a scarf loosely around your face for protection.`
            });
        }
    }

    // High humidity tips (if not already covered by rain)
    if (humidity > 70 && condition !== 'rain' && condition !== 'storm') {
        if (hasHair) {
            tips.push({
                category: 'product',
                icon: CATEGORY_ICONS.product,
                title: 'Anti-Frizz Protection',
                message: `Humidity is at ${humidity}%. Ask your stylist for anti-humidity serum to keep your hair smooth and beautiful.`
            });
        }
        if (hasNails) {
            tips.push({
                category: 'care',
                icon: '⏱️',
                title: 'Extra Drying Time Needed',
                message: `High humidity (${humidity}%) means polish dries slower. Add 5-10 minutes to your usual drying time.`
            });
        }
    }

    // Sunny/clear weather tips
    if (condition === 'sunny' && uvIndex >= 3) {
        if (hasHair && tips.length < 2) {
            tips.push({
                category: 'protection',
                icon: '🧢',
                title: 'Sun Protection',
                message: `Beautiful sunny day! But UV rays (index: ${uvIndex}) can fade your hair color. Consider wearing a hat outdoors.`
            });
        }
        if (hasSkin) {
            tips.push({
                category: 'care',
                icon: '🧴',
                title: 'Apply Sunscreen',
                message: `UV index is ${uvIndex}. Don't forget sunscreen on your face to protect your fresh facial treatment!`
            });
        }
    }

    // General tips if we don't have enough specific ones
    if (tips.length < 2) {
        if (hasNails) {
            tips.push({
                category: 'care',
                icon: '💅',
                title: 'Avoid Water for 2 Hours',
                message: 'Give your fresh nails time to fully set. Avoid washing hands or getting nails wet for at least 2 hours.'
            });
        }
        if (hasHair && tips.length < 2) {
            tips.push({
                category: 'care',
                icon: '💆',
                title: 'Wait Before Washing',
                message: 'To maximize your treatment, wait 24-48 hours before washing your hair. This helps the color set properly.'
            });
        }
        if (hasMakeup && tips.length < 2) {
            tips.push({
                category: 'product',
                icon: '💄',
                title: 'Setting Spray Applied',
                message: 'Your makeup has been set with professional spray! It should last all day with minimal touch-ups needed.'
            });
        }
    }

    // Return only 2-3 tips
    return tips.slice(0, 3);
};

/**
 * Generate weather tips based on weather data and booked services
 * @param {Object} weather - Weather data object
 * @param {Array<string>} services - List of booked service names
 * @returns {Object} Weather tips response
 */
export const generateWeatherTips = (weather, services) => {
    const icon = WEATHER_ICONS[weather.condition] || WEATHER_ICONS.default;
    const weatherSummary = getWeatherSummary(weather);
    const tips = generateTips(weather, services);

    return {
        weatherSummary,
        icon,
        temperature: weather.temperature,
        tips
    };
};

export default { generateWeatherTips };
