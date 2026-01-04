# Tournado

Tournado is a modern, full-stack tour management platform built with **Next.js**, **TypeScript**, and **Prisma**, designed to streamline the creation and management of travel tours. The application focuses on clean architecture, type safety, and scalable data modeling.

This project demonstrates production-oriented frontend and backend development using a modern React-based framework and ORM-driven database access.

---

## Features

- Tour creation and management
- Structured data modeling with Prisma
- Server-side rendering and API routes via Next.js
- Type-safe frontend and backend with TypeScript
- Clean project structure with ESLint and Prettier
- Optimized asset handling and configuration
- Clean and standard UI/UX

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript

### Backend
- Next.js API Routes
- Prisma ORM

### Database
- Relational database via Prisma (PostgreSQL / MySQL configurable)

### Tooling
- ESLint
- Prettier
- PostCSS
- Node.js

---

## Project Structure (Simplified)

```
src/
 ├── pages/
 ├── components/
 ├── lib/
 ├── styles/
prisma/
 ├── schema.prisma
public/
scripts/
```

---

## Installation & Setup

### Prerequisites
- Node.js >= 18
- NPM
- Database supported by Prisma

### Steps

```bash
git clone https://github.com/your-username/tournado.git
cd tournado

npm install
cp .env.example .env
```

Configure database connection in `.env`, then:

```bash
npx prisma migrate dev
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Available Scripts

```bash
npm run dev
npm run build
npm run start
```

---

## Database & ORM

- Prisma is used for schema definition, migrations, and queries
- Strongly typed database access across the application
- Migration-based schema evolution

---


## License

MIT License

---

## Author

Faraz Pourebrahim
