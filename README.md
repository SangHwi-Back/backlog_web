# Backlog - Next.js Blog Application

A blog application built with Next.js and PostgreSQL.

## Features

- Blog post management (Create, Read, Update, Delete)
- Category management
- Search functionality
- Pagination
- Responsive design

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- pnpm (v10 or later)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backlog_web
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up the database:
   - Create a PostgreSQL database
   - Copy `.env.example` to `.env.local` and update the database connection string:
     ```
     DATABASE_URL=postgresql://username:password@localhost:5432/database_name
     ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following database schema:

- **Posts**: Stores blog posts with title, description, author, etc.
- **Categories**: Stores categories for blog posts
- **PostCategories**: Junction table for many-to-many relationship between posts and categories

The schema is automatically applied when the application starts for the first time.

## API Routes

The application provides the following API routes:

- `GET /api/posts`: Get all posts with pagination
- `GET /api/posts/:id`: Get a specific post
- `POST /api/posts`: Create a new post
- `PUT /api/posts/:id`: Update a post
- `DELETE /api/posts/:id`: Delete a post
- `GET /api/categories`: Get all categories

## Technologies Used

- Next.js
- PostgreSQL
- React
- TypeScript
- Zod (for validation)
- Material UI
