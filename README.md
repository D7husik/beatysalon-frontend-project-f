# 💅 Glam Salon Booking System

A modern, responsive salon booking application built with **React 18** and **Vite**. This single-page application (SPA) allows users to browse salon services, select specialists, and book appointments with real-time weather-based care tips.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Project Description

**Problem Solved:** Scheduling salon appointments traditionally requires phone calls or in-person visits. This application provides a seamless digital booking experience where customers can:

- Browse available services with detailed descriptions and pricing
- Select their preferred specialist
- Choose convenient date and time slots
- Receive personalized weather-based care tips after booking

### Main Features

| Feature | Description |
|---------|-------------|
| 🔍 **Service Catalog** | Browse, search, and filter salon services by category |
| 👤 **Staff Selection** | View specialist profiles with experience and specialties |
| 📅 **Appointment Booking** | Select date/time with real-time availability |
| ✅ **Booking Confirmation** | Complete booking with client details and validation |
| 📱 **Appointment Management** | View, and cancel existing appointments |
| 🌤️ **Weather Tips** | Personalized care recommendations based on live weather |
| 🌙 **Dark/Light Theme** | Toggle between themes for comfortable viewing |

---

## 🔗 APIs Used

### 1. Mock Booking API (Primary)
A fully-functional mock REST API with in-memory storage for salon data.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/services` | Get all services |
| GET | `/services/:id` | Get service details |
| GET | `/staff` | Get all staff members |
| GET | `/staff/:id` | Get staff details |
| GET | `/appointments` | Get all appointments |
| POST | `/appointments` | Create new appointment |
| PUT | `/appointments/:id` | Update appointment |
| DELETE | `/appointments/:id` | Cancel appointment |

📄 **Full API Documentation:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### 2. Open-Meteo Weather API (External)
Free weather API for real-time weather data - **no API key required**.

- **Base URL:** `https://api.open-meteo.com/v1`
- **Documentation:** [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)
- **Usage:** Fetches current temperature, humidity, wind speed, UV index for weather-based care tips

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with functional components & hooks |
| **Vite 5** | Build tool and development server |
| **React Router** | Client-side routing for SPA navigation |
| **Lucide React** | Modern icon library |
| **CSS3** | Custom styling with Flexbox/Grid, dark mode support |
| **ES6+** | Modern JavaScript (async/await, modules, destructuring) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/D7husik/BeatySalon-FrontEnd-Project.git

# Navigate to project directory
cd BeatySalon-FrontEnd-Project

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Environment Variables (Optional)

Copy `.env.example` to `.env` for custom configuration:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `/api` | API base URL |
| `VITE_USE_MOCK_API` | `true` | Enable mock API |
| `VITE_DEBUG_MODE` | `false` | Enable debug logging |

> **Note:** The Open-Meteo weather API requires no API key.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── api/                 # API service layer
│   ├── config.js        # API configuration & endpoints
│   ├── bookingApi.js    # Booking CRUD operations
│   ├── weatherApi.js    # Open-Meteo weather integration
│   └── index.js         # API exports
├── components/          # Reusable UI components
│   ├── common/          # Generic components (LoadingSpinner, ErrorMessage)
│   ├── services/        # Service listing & details
│   ├── staff/           # Staff cards & selection
│   ├── booking/         # Booking form, WeatherTips
│   └── layout/          # Navbar, Footer
├── context/             # React Context providers
├── data/                # Mock data (services, staff)
├── hooks/               # Custom React hooks
├── pages/               # Page components
│   ├── HomePage.jsx
│   ├── BookingPage.jsx
│   ├── ConfirmationPage.jsx
│   └── AppointmentsPage.jsx
├── utils/               # Utility functions
│   ├── formatUtils.js   # Date formatting
│   └── weatherTipsUtils.js  # Weather tip generation
├── styles/              # CSS stylesheets
│   └── index.css        # Main styles with dark mode
├── App.jsx              # Root component with routing
└── main.jsx             # Application entry point
```

---

## ✨ Feature Implementation Details

### API Integration
- **Centralized configuration** in `src/api/config.js`
- **Async/await** with `fetch` for all API calls
- **Loading states** with spinners during data fetch
- **Error handling** with user-friendly messages and retry options
- **Data caching** in React state to minimize API calls

### CRUD Operations
- **Create:** Book new appointments via multi-step form
- **Read:** Display services, staff, and appointment lists
- **Delete:** Cancel appointments with confirmation

### Form Validation
- Required field validation (name, phone, date, time)
- Phone number format validation (integers only)
- Email format validation
- Real-time error messages next to fields

### Responsive Design
- Mobile-first approach
- Flexbox and CSS Grid layouts
- Breakpoints: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- Touch-friendly buttons and navigation

---

## ⚠️ Known Limitations

1. **Mock API Persistence:** Data resets on page refresh (in-memory storage)
2. **Weather Location:** Fixed to New York coordinates (customizable in code)
3. **Payment Integration:** Not implemented (mockup only)
4. **User Authentication:** No login system (demo purposes)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      React App                          │
├─────────────────────────────────────────────────────────┤
│  Pages (HomePage, BookingPage, ConfirmationPage, etc.)  │
├─────────────────────────────────────────────────────────┤
│  Components (ServiceCard, StaffCard, BookingForm, etc.) │
├─────────────────────────────────────────────────────────┤
│  Hooks (useBooking, useServices)  │  Context (Theme)    │
├─────────────────────────────────────────────────────────┤
│                    API Layer                            │
│  ┌─────────────────┐    ┌─────────────────────────┐    │
│  │  bookingApi.js  │    │    weatherApi.js        │    │
│  │  (Mock CRUD)    │    │    (Open-Meteo)         │    │
│  └─────────────────┘    └─────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 🎓 Technical Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| **State persistence** | Used `localStorage` to persist appointments across sessions |
| **API error handling** | Implemented fallback data and retry mechanisms |
| **Weather integration** | Selected Open-Meteo (free, no-key API) with WMO weather code mapping |
| **Form validation** | Built custom validation with real-time feedback |
| **Dark mode styling** | CSS custom properties with `[data-theme]` selector |

---

## 📺 Live Demo

🌐 **Deployed URL:** [Vercel Deployment](https://beaty-salon-front-end-project.vercel.app/)

### Demo Flow
1. **Home Page** → Browse services and about section
2. **Services** → Filter by category, view details
3. **Book Now** → Select services → Choose staff → Pick date/time → Enter details
4. **Confirmation** → View booking summary with weather tips
5. **Appointments** → View and manage bookings

---

## 📝 License

© 2025 Glam Salon. All rights reserved.

---

## 👤 Author

**Alisher Dzhusuev**  
University of Central Asia  
Front-End Capstone Project - December 2025
