/**
 * Weather API Service
 * Uses Open-Meteo API - completely free, no API key required!
 * https://open-meteo.com/
 */

// New York coordinates
const NYC_LAT = 40.7128;
const NYC_LON = -74.0060;

// Open-Meteo API base URL (free, no key needed)
const WEATHER_API_BASE = 'https://api.open-meteo.com/v1';

/**
 * Map WMO weather codes to simple conditions
 * https://open-meteo.com/en/docs#weathervariables
 */
const mapWeatherCode = (code) => {
    if (code === 0) return 'sunny';
    if (code >= 1 && code <= 3) return 'cloudy';
    if (code >= 45 && code <= 48) return 'cloudy'; // Fog
    if (code >= 51 && code <= 67) return 'rain'; // Drizzle/Rain
    if (code >= 71 && code <= 77) return 'snow';
    if (code >= 80 && code <= 82) return 'rain'; // Rain showers
    if (code >= 85 && code <= 86) return 'snow'; // Snow showers
    if (code >= 95 && code <= 99) return 'storm'; // Thunderstorm
    return 'cloudy';
};

/**
 * Get weather description from WMO code
 */
const getWeatherDescription = (code) => {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Thunderstorm with heavy hail'
    };
    return descriptions[code] || 'Partly cloudy';
};

/**
 * Fetch current weather for New York using Open-Meteo (FREE!)
 * @returns {Promise<Object>} Weather data
 */
export const getWeather = async () => {
    try {
        // Open-Meteo API - no API key required!
        const url = `${WEATHER_API_BASE}/forecast?latitude=${NYC_LAT}&longitude=${NYC_LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=uv_index_max&timezone=America%2FNew_York`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        const current = data.current;
        const daily = data.daily;

        return {
            temperature: Math.round(current?.temperature_2m || 22),
            condition: mapWeatherCode(current?.weather_code || 2),
            humidity: current?.relative_humidity_2m || 65,
            windSpeed: Math.round(current?.wind_speed_10m || 12),
            uvIndex: Math.round(daily?.uv_index_max?.[0] || 4),
            description: getWeatherDescription(current?.weather_code || 2)
        };
    } catch (error) {
        console.error('[Weather API] Error fetching weather:', error);
        // Return fallback data if API fails
        return {
            temperature: 22,
            condition: 'cloudy',
            humidity: 65,
            windSpeed: 12,
            uvIndex: 4,
            description: 'Partly cloudy'
        };
    }
};

export default { getWeather };
