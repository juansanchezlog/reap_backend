# Forms Backend API

A RESTful API backend for creating and managing dynamic forms, built with Node.js, Express, TypeScript, and Prisma.

## Live Demo

- **API Base URL**: [https://reap-backend.onrender.com](https://reap-backend.onrender.com)
- **Frontend**: [https://reapform.netlify.app](https://reapform.netlify.app)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Configured for cross-origin requests
- **Deployment**: Render

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (or Supabase account)

### 1. Install dependencies

```bash
yarn install
# or
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
NODE_ENV=development
```

### 3. Database Setup

```bash
yarn db:generate

yarn db:migrate

yarn db:studio
```

### 4. Start Development Server

```bash
yarn dev
```

The server will start on `http://localhost:3001`

## Database Schema

### Models

- **User**: Admin user for authentication
- **Form**: Main form entity with title, description, and token
- **Section**: Form sections containing fields
- **Field**: Individual form fields (TEXT/NUMBER)
- **FormSubmission**: User submissions to forms
- **FieldResponse**: Individual field responses

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |

### Forms

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/forms` | Create a new form |
| GET | `/api/forms` | Get all forms |
| GET | `/api/forms/:id` | Get form by ID |
| PUT | `/api/forms/:id` | Update form |
| DELETE | `/api/forms/:id` | Delete form |
