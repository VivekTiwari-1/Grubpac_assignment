# Room Booking System

A full-stack hotel/accommodation room booking application built with **Next.js** (frontend) and **Express.js** (backend), featuring real-time room availability, user authentication, and secure booking management.

---

## Features

### Authentication & Authorization

- User registration and login with JWT tokens
- Secure password hashing with bcryptjs
- Protected routes and endpoints
- Cookie-based session management

### Room Management

- Browse available rooms with descriptions and pricing
- View detailed room information including capacity and amenities
- Real-time availability checking
- Room filtering and search

### Booking System

- Reserve rooms for specific date ranges
- Automatic overlap prevention to avoid double-bookings
- Dynamic price calculation based on stay duration
- View booking history and manage reservations
- Prevent conflicts with database-level transaction locking

### Dashboard

- Personal booking dashboard
- View upcoming and past bookings
- Manage reservations
- Account management

---

## Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js 5.2.1
- **Database:** MySQL 2
- **Authentication:** JWT (jsonwebtoken), bcryptjs
- **Utilities:** dotenv, CORS, cookie-parser
- **Dev Tools:** Nodemon

### Frontend

- **Framework:** Next.js 16.1.6
- **React:** 19.2.3
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Date Handling:** react-datepicker, date-fns
- **Dev Tools:** ESLint

---

## Project Structure

```
.
├── backend/                      # Express.js API server
│   ├── server.js                # Entry point
│   ├── src/
│   │   ├── app.js               # Express app configuration
│   │   ├── config/
│   │   │   └── db.js            # MySQL connection pool
│   │   ├── controllers/         # HTTP request handlers
│   │   ├── services/            # Business logic
│   │   ├── routes/              # API endpoints
│   │   └── middleware/          # Express middleware
│   └── package.json
│
├── frontend/                     # Next.js application
│   ├── src/
│   │   ├── app/                 # App router pages
│   │   │   ├── layout.js        # Root layout
│   │   │   ├── (auth)/          # Authentication routes
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   └── (protected)/     # Protected routes (require auth)
│   │   │       ├── dashboard/
│   │   │       ├── my-bookings/
│   │   │       └── rooms/
│   │   ├── components/
│   │   ├── lib/
│   │   │   ├── api.js           # API client configuration
│   │   │   └── authInit.js      # Auth initialization
│   │   └── store/               # Zustand state management
│   └── package.json
│
├── database/
│   └── schema.sql               # MySQL database schema
│
├── postman-collection.json
|── architecture-notes.txt
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- MySQL 8.0+
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Grubpac_assignment
   ```

2. **Setup MySQL Database**

   ```bash
   mysql -u root -p
   SOURCE database/schema.sql;
   ```

3. **Install Backend Dependencies**

   ```bash
   cd backend
   pnpm install
   ```

4. **Configure Backend Environment**
   Create a `.env` file in the `backend/` directory:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=room_booking
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. **Install Frontend Dependencies**

   ```bash
   cd ../frontend
   pnpm install
   ```

6. **Configure Frontend Environment**
   Create a `.env.local` file in the `frontend/` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

### Running the Application

**Terminal 1 - Backend Server**

```bash
cd backend
pnpm run dev
```

Server will run on `http://localhost:5000`

**Terminal 2 - Frontend Application**

```bash
cd frontend
pnpm run dev
```

Frontend will run on `http://localhost:3000`

---

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Rooms

- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id/availability?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` - Check room availability

### Bookings

- `GET /api/bookings` - Get user's bookings (protected)
- `POST /api/bookings` - Create new booking (protected)
- `GET /api/bookings/:id` - Get booking details (protected)
- `DELETE /api/bookings/:id` - Cancel booking (protected)

---

## Architecture Highlights

### Overlap Prevention

The system prevents double-bookings through a two-layer approach:

1. **SQL Query Layer:** Uses a temporal overlap condition

   ```sql
   SELECT id FROM bookings
   WHERE room_id = ?
     AND start_date < ? (new end_date)
     AND end_date > ?   (new start_date)
   ```

2. **Database Transaction with Row Locking:**
   - Opens a transaction and locks the room row with `SELECT ... FOR UPDATE`
   - Re-checks availability inside the transaction
   - Prevents race conditions from simultaneous bookings

### Layered Architecture

**Backend:**

```
Routes → Controllers → Services → Database
```

- **Routes:** Define endpoints and middleware
- **Controllers:** Handle HTTP concerns (validation, status codes)
- **Services:** Contain business logic (overlap checking, calculations)
- **Database:** Persistent data storage with connection pooling

This separation ensures business logic is testable and decoupled from HTTP handling.

**Frontend:**

- Feature-based folder structure
- State management with Zustand stores
- Protected routes with authentication guards
- Responsive UI with Tailwind CSS

---

## Scripts

### Backend

- `pnpm run start` - Start production server
- `pnpm run dev` - Start development server with hot reload

### Frontend

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint

---

## Database Schema

The system uses three main tables:

**Users**

- `id` (PK): Auto-increment
- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password
- `created_at`: Timestamp

**Rooms**

- `id` (PK): Auto-increment
- `name`: Room name
- `description`: Room details
- `price_per_night`: Decimal price
- `capacity`: Number of guests
- `image_url`: Room image
- `created_at`: Timestamp

**Bookings**

- `id` (PK): Auto-increment
- `user_id` (FK): Reference to users
- `room_id` (FK): Reference to rooms
- `start_date`: Check-in date
- `end_date`: Check-out date
- `total_price`: Calculated booking price
- `created_at`: Timestamp
- **Constraints:** `end_date > start_date`, overlap prevention

---

## Error Handling

The application includes comprehensive error handling:

- **400 Bad Request** - Invalid input or missing fields
- **401 Unauthorized** - Missing or invalid authentication
- **403 Forbidden** - User lacks permission
- **404 Not Found** - Resource doesn't exist
- **409 Conflict** - Booking overlap detected
- **500 Internal Server Error** - Server error with logging

---

## Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ SQL injection prevention via parameterized queries
- ✅ HTTP-only cookies for session tokens
- ✅ Protected API endpoints with middleware
- ✅ Environment variables for sensitive data
- ✅ Database constraints for data integrity

---

## Deployment

### Deploy Backend

1. Set up MySQL database on production server
2. Configure environment variables
3. Deploy to hosting platform (Heroku, Railway, etc.)

### Deploy Frontend

1. Run `pnpm run build`
2. Deploy to Vercel or similar platform
3. Update `NEXT_PUBLIC_API_URL` to production backend URL

---

## License

ISC

---

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Happy Coding!** 🚀
