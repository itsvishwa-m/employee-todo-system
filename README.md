# Employee Todo System Backend

A REST API built with Node.js, Express.js, MongoDB Atlas, JWT Authentication, and Role-Based Access Control.

## Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Admin Routes
- Employee Routes
- Create Todo
- View Todos
- MongoDB Atlas Integration

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

## Installation

```bash
npm install
npm start
```

## Environment Variables

Create a .env file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## API Endpoints

### Auth

POST /api/auth/register

POST /api/auth/login

### Todos

GET /api/todos

POST /api/todos

### Admin

GET /api/admin/users