# EduPilot

EduPilot is a multi-school SaaS school-management platform. The first milestone establishes a React dashboard, an Express API foundation, MySQL/Sequelize configuration, and initial tenant identity and role migrations.

## Stack

- Frontend: React, Vite, React Router, Lucide icons
- Backend: Node.js, Express, Sequelize, MySQL
- Security foundation: Helmet, CORS allowlist, rate limiting, environment validation

## Getting started

Requirements: Node.js 20+ and MySQL 8+.

1. Create a MySQL database: `CREATE DATABASE edupilot_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
2. Copy `backend/.env.example` to `backend/.env` and set a random JWT secret of at least 32 characters and your local MySQL credentials.
3. Install packages from the repository root: `npm install`.
4. Start the frontend and API: `npm run dev`.
5. Apply the initial identity schema when MySQL is available: `npm --workspace backend run db:migrate`.

The frontend is served at `http://localhost:5173`, and the API health endpoint is `http://localhost:4000/api/v1/health`.

## Current scope

The dashboard is a responsive UI shell with sample data. Database configuration and migrations establish schools, users, memberships, roles, and permissions. Student workflows, registration/login endpoints, real tenant resolution, and authorization are later milestones; the UI does not yet read or write school data.

Never put secrets in source control. Tenant IDs must be resolved from authenticated membership context before implementing school-owned endpoints.
