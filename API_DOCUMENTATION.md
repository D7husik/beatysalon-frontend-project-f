# API Documentation - Glam Salon Booking System

## Overview

This document describes the REST API endpoints used by the Glam Salon Booking System. The API is currently implemented as a **mock API** with in-memory storage for demonstration purposes.

## Base URL

```
Mock API: In-memory (no external requests)
```

## Authentication

Currently, no authentication is required (mock API).

---

## Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/services` | Get all services |
| GET | `/services/:id` | Get service by ID |
| GET | `/staff` | Get all staff members |
| GET | `/staff/:id` | Get staff member by ID |
| GET | `/appointments` | Get all appointments |
| POST | `/appointments` | Create a new appointment |
| PUT | `/appointments/:id` | Update an appointment |
| DELETE | `/appointments/:id` | Delete an appointment |

---

## Services

### GET All Services

Retrieves a list of all available salon services.

**Endpoint:** `GET /services`

**Response:**
```json
[
  {
    "id": "1",
    "name": "Haircut & Styling",
    "description": "Professional haircut with expert styling and consultation",
    "price": 45,
    "duration": 60,
    "category": "hair"
  },
  {
    "id": "2",
    "name": "Hair Coloring",
    "description": "Full color treatment with premium products",
    "price": 120,
    "duration": 120,
    "category": "hair"
  }
]
```

### GET Service by ID

Retrieves details of a specific service.

**Endpoint:** `GET /services/:id`

**Parameters:**
- `id` (path) - Service ID

**Response:**
```json
{
  "id": "1",
  "name": "Haircut & Styling",
  "description": "Professional haircut with expert styling and consultation",
  "price": 45,
  "duration": 60,
  "category": "hair"
}
```

**Error Response (404):**
```json
{
  "error": "Service not found"
}
```

---

## Staff

### GET All Staff

Retrieves a list of all staff members.

**Endpoint:** `GET /staff`

**Response:**
```json
[
  {
    "id": "1",
    "name": "Anna Smith",
    "specialty": "Hair Stylist & Colorist",
    "experience": "8 years",
    "bio": "Specializing in modern cuts and balayage techniques"
  }
]
```

### GET Staff by ID

Retrieves details of a specific staff member.

**Endpoint:** `GET /staff/:id`

**Parameters:**
- `id` (path) - Staff member ID

**Response:**
```json
{
  "id": "1",
  "name": "Anna Smith",
  "specialty": "Hair Stylist & Colorist",
  "experience": "8 years",
  "bio": "Specializing in modern cuts and balayage techniques"
}
```

---

## Appointments

### GET All Appointments

Retrieves all appointments.

**Endpoint:** `GET /appointments`

**Response:**
```json
[
  {
    "id": "1702500000000",
    "serviceIds": ["1", "3"],
    "serviceNames": "Haircut & Styling, Manicure",
    "staffId": "1",
    "staffName": "Anna Smith",
    "date": "2024-12-15",
    "time": "10:00",
    "clientName": "John Doe",
    "phone": "+1 555 0100",
    "email": "john@example.com",
    "notes": "",
    "totalPrice": 80,
    "totalDuration": 105,
    "status": "confirmed",
    "createdAt": "2024-12-13T12:00:00.000Z"
  }
]
```

### POST Create Appointment

Creates a new appointment.

**Endpoint:** `POST /appointments`

**Request Body:**
```json
{
  "serviceIds": ["1", "3"],
  "serviceNames": "Haircut & Styling, Manicure",
  "staffId": "1",
  "staffName": "Anna Smith",
  "date": "2024-12-15",
  "time": "10:00",
  "clientName": "John Doe",
  "phone": "+1 555 0100",
  "email": "john@example.com",
  "notes": "First time customer",
  "totalPrice": 80,
  "totalDuration": 105,
  "status": "confirmed"
}
```

**Response (201 Created):**
```json
{
  "id": "1702500000000",
  "serviceIds": ["1", "3"],
  "serviceNames": "Haircut & Styling, Manicure",
  "staffId": "1",
  "staffName": "Anna Smith",
  "date": "2024-12-15",
  "time": "10:00",
  "clientName": "John Doe",
  "phone": "+1 555 0100",
  "email": "john@example.com",
  "notes": "First time customer",
  "totalPrice": 80,
  "totalDuration": 105,
  "status": "confirmed",
  "createdAt": "2024-12-13T12:00:00.000Z"
}
```

### PUT Update Appointment

Updates an existing appointment.

**Endpoint:** `PUT /appointments/:id`

**Parameters:**
- `id` (path) - Appointment ID

**Request Body:**
```json
{
  "date": "2024-12-16",
  "time": "14:00",
  "notes": "Rescheduled"
}
```

**Response:**
```json
{
  "id": "1702500000000",
  "serviceIds": ["1", "3"],
  "date": "2024-12-16",
  "time": "14:00",
  "notes": "Rescheduled",
  ...
}
```

### DELETE Appointment

Deletes (cancels) an appointment.

**Endpoint:** `DELETE /appointments/:id`

**Parameters:**
- `id` (path) - Appointment ID

**Response:**
```json
{
  "id": "1702500000000",
  "deleted": true
}
```

**Error Response (404):**
```json
{
  "error": "Appointment not found"
}
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

Error response format:
```json
{
  "error": "Error message description"
}
```

---

## Testing with the Mock API

Since this uses a mock API with in-memory storage:

1. **Data persists** during the session (while the app is running)
2. **Data resets** when the app refreshes
3. **All CRUD operations** work as expected

To test the API:
1. Start the development server: `npm run dev`
2. Open the app at `http://localhost:3000`
3. Use the UI to create, view, and delete appointments
4. Check browser DevTools Console for API call logs (if enabled)

---

## Sample API Usage (JavaScript)

```javascript
import { api } from './api';

// GET all services
const services = await api.getServices();

// GET single service
const service = await api.getService('1');

// GET all staff
const staff = await api.getStaff();

// POST create appointment
const newAppointment = await api.createAppointment({
  serviceIds: ['1'],
  staffId: '1',
  date: '2024-12-15',
  time: '10:00',
  clientName: 'John Doe',
  phone: '+1 555 0100'
});

// DELETE appointment
await api.deleteAppointment('1702500000000');
```
