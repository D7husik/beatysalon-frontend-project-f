# 💅 Suulu Beauty Salon - Booking System

A modern, responsive salon booking application built with React that allows customers to browse services, book appointments, and manage their bookings.

**🌐 Live Demo:** [https://beatysalon-frontend.vercel.app](https://beatysalon-frontend.vercel.app)

**📁 Repository:** [https://github.com/D7husik/BeatySalon-FrontEnd-Project](https://github.com/D7husik/BeatySalon-FrontEnd-Project)

---

## 📋 Project Description

Suulu Beauty Salon is a complex yet efficient application  that solves the problem of **salon appointment scheduling**. Customers can:
- Browse available beauty services with search and filter
- View detailed service information
- Book appointments with preferred staff and time
- Manage existing appointments (view, edit, cancel)

The application consumes REST APIs for data and uses localStorage for client-side persistence.

---

## ✨ Main Features

| Feature | Description |
|---------|-------------|
| **Service Listing** | Grid display of all services with cards |
| **Search & Filter** | Real-time search by name, filter by category |
| **Pagination** | Navigate through services (6 per page) |
| **Service Details** | Modal with full service information |
| **Multi-step Booking** | 4-step wizard for appointment creation |
| **Appointment Management** | View, edit, and cancel appointments |
| **Staff Selection** | Choose preferred specialist |
| **Time Conflict Prevention** | Prevents double-booking staff |
| **Dark/Light Theme** | Toggle between themes |
| **Weather Integration** | Beauty tips based on weather |
| **Responsive Design** | Works on mobile, tablet, desktop |

---

## 🔌 APIs Used

### 1. Mock Booking API (Internal)
- **Purpose:** CRUD operations for services, staff, appointments
- **Documentation:** See `/API_DOCUMENTATION.md`
- **Persistence:** localStorage (survives page refresh)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/services` | GET | List all services |
| `/services/:id` | GET | Get service details |
| `/staff` | GET | List all staff members |
| `/appointments` | GET | List all appointments |
| `/appointments` | POST | Create new appointment |
| `/appointments/:id` | PUT | Update appointment |
| `/appointments/:id` | DELETE | Cancel appointment |

### 2. Open-Meteo Weather API (External)
- **Purpose:** Fetch real-time weather data for beauty tips
- **Documentation:** [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)
- **Note:** Free API, no API key required

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with functional components & hooks |
| **React Router v6** | Client-side routing (URL-based navigation) |
| **Vite** | Build tool and development server |
| **Lucide React** | Icon library |
| **CSS3** | Custom styling with CSS variables |
| **localStorage** | Client-side data persistence |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/D7husik/BeatySalon-FrontEnd-Project.git

# Navigate to project folder
cd BeatySalon-FrontEnd-Project

# Install dependencies
npm install

# Start development server
npm run dev
```

The app opens at `http://localhost:5173`

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
│   ├── bookingApi.js    # CRUD operations (with localStorage)
│   ├── weatherApi.js    # Open-Meteo weather integration
│   ├── config.js        # API configuration & endpoints
│   └── index.js         # API exports
├── components/          # Reusable UI components
│   ├── common/          # LoadingSpinner, ErrorMessage
│   ├── booking/         # AppointmentCard, TimeSlot, EditModal
│   ├── services/        # ServiceCard, ServiceDetailModal
│   ├── staff/           # StaffCard
│   └── layout/          # Navbar, Footer
├── context/             # React Context (BookingContext, ThemeContext)
├── hooks/               # Custom hooks (useBooking, useTheme)
├── pages/               # Page components
│   ├── HomePage.jsx     # Landing page with services
│   ├── BookingPage.jsx  # Multi-step booking wizard
│   ├── ConfirmationPage.jsx # Booking confirmation
│   └── MyAppointmentsPage.jsx # Appointment management
├── utils/               # Utility functions
│   ├── dateUtils.js     # Date formatting, time slots
│   ├── validationUtils.js # Form validation
│   └── weatherTipsUtils.js # Weather-based tips
└── styles/              # CSS styles with variables
```

---


## ⚠️ Known Limitations

1. **Mock API** - Uses in-memory API with localStorage persistence (no real backend)
2. **Single Location** - Weather API hardcoded for one location
3. **Browser Storage** - Data clears if user clears browser cache

---


---
## Challenges & Solutions
| Challenge | Solution |
|------------|---------|
| **No backend ** | Mock API + localStorage |
| **Double booking** |Time conflict algorithm |
| **State management** | React Context API |
| **Routing** | React Router v6 |


---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     React App                            │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ HomePage │  │Booking  │  │Confirm  │  │Appoint- │    │
│  │         │  │Page     │  │ation    │  │ments    │    │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    │
│       │            │            │            │          │
│  ┌────┴────────────┴────────────┴────────────┴────┐    │
│  │              React Router v6                    │    │
│  └────────────────────┬───────────────────────────┘    │
│                       │                                 │
│  ┌────────────────────┴───────────────────────────┐    │
│  │           BookingContext + ThemeContext         │    │
│  └────────────────────┬───────────────────────────┘    │
│                       │                                 │
│  ┌────────────────────┴───────────────────────────┐    │
│  │                  API Layer                      │    │
│  │   ┌──────────────┐    ┌──────────────┐         │    │
│  │   │ bookingApi   │    │ weatherApi   │         │    │
│  │   │ (localStorage)│    │ (Open-Meteo) │         │    │
│  │   └──────────────┘    └──────────────┘         │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```
```

┌─────────────┐     Request      ┌─────────────┐
│   React     │ ──────────────▶  │    API      │
│  Component  │                  │   Layer     │
│             │ ◀──────────────  │             │
└─────────────┘     Response     └─────────────┘
                                       │
                                       ▼
                                ┌─────────────┐
                                │ localStorage │
                                │  (Storage)  │
                                └─────────────┘


```
---

## 👩‍💻 Author

**Alisher Dzhusuev**  
University of Central Asia  
Front-End Development Capstone Project - December 2025

---

## 📄 License

© 2025 Suulu Beauty Salon. All rights reserved.
