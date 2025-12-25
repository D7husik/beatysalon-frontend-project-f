import { useContext } from 'react';
import { ThemeContext } from '../context';

/**
 * Custom hook to access theme context
 * @returns {Object} Theme context value with isDarkMode and toggleTheme
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};
