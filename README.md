# Countries info App

This is a test task for backend role in "DevelopsToday".

Backend API for Countries info App – a Node.js + TypeScript application using Express, PostgreSQL, and TypeORM.

---

## Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **TypeORM**
- **PostgreSQL**
- **Joi** — validation
- **Docker** + **docker-compose**

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18`
- Docker + Docker Compose
- npm
- Created Postgres database

---

### Env setup

Setup and use `.env` file for this project.

To build app in Docker use `.env.pg` as well.

**Important:** All `.env.pg` variables should have same values as `.env` DB-related values has. For host use "postgres" if you didn't change container name.

Before running application make sure that your Postgres DB exists and has correct options (same as .env)

### 🛠 Local Development with Docker (Preferred)

```bash
# Docker will build application with necessary dependencies automatically
docker compose up --build -d
```

### 🛠 Local Development manual installation

```bash
# Install dependencies
npm ci

# Start in dev mode (build + nodemon)
npm run start:dev
```
