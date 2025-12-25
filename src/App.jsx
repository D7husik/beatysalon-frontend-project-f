import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider, ThemeProvider } from './context';
import { Navbar, Footer } from './components';
import { HomePage, BookingPage, ConfirmationPage, MyAppointmentsPage } from './pages';
import './styles/index.css';

/**
 * Main App Component
 * Root component with React Router, theme provider, and layout
 */
const App = () => {
    return (
        <ThemeProvider>
            <BookingProvider>
                <BrowserRouter>
                    <div className="app">
                        <a href="#main-content" className="skip-link">
                            Skip to main content
                        </a>
                        <Navbar />
                        <main id="main-content" className="main-content" role="main">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/booking" element={<BookingPage />} />
                                <Route path="/confirmation" element={<ConfirmationPage />} />
                                <Route path="/appointments" element={<MyAppointmentsPage />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </BrowserRouter>
            </BookingProvider>
        </ThemeProvider>
    );
};

export default App;
