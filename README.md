# Course Selling Platform API

A RESTful API for a course selling platform built with Node.js and Express.

## Features

- User authentication and authorization
- Course management
- Admin functionalities
- Secure password hashing
- JWT-based authentication

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Zod for validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ishivxnshh/Course-Selling-Project.git
cd Course-Selling-Project
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and update the environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Development mode:
```bash
npm run dev
```

2. Production mode:
```bash
npm start
```

## API Endpoints

### User Endpoints
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/profile` - Get user profile (auth required)

### Admin Endpoints
- `POST /api/v1/admin/login` - Admin login
- `POST /api/v1/admin/courses` - Create new course
- `GET /api/v1/admin/courses` - Get all courses
- `PUT /api/v1/admin/courses/:id` - Update course
- `DELETE /api/v1/admin/courses/:id` - Delete course

### Course Endpoints
- `GET /api/v1/course` - Get all courses
- `GET /api/v1/course/:id` - Get course by ID
- `POST /api/v1/course/purchase` - Purchase course

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.
