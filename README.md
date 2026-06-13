# FinTrack Pro

FinTrack Pro is a production-grade personal finance management application.

## Architecture

This project is structured as a monorepo using npm workspaces:

- `apps/mobile`: The Expo React Native mobile application.
- `apps/api`: The Express backend API with PostgreSQL and Prisma.
- `packages/shared`: Shared TypeScript types, schemas, and utilities used by both frontend and backend.

## Development Setup

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- Expo CLI

### Installation

1. Install dependencies from the root directory:
   ```bash
   npm install
   ```
2. Set up Git hooks (Husky):
   ```bash
   npm run prepare
   ```

### Backend (`apps/api`)

The backend is an Express application using TypeScript and Prisma ORM.

#### Environment Variables
Create a `.env` file in `apps/api` with the following variables:
```env
PORT=4000
DATABASE_URL="postgresql://user:password@localhost:5432/fintrack?schema=public"
```

#### Database Setup
Generate the Prisma client:
```bash
npm run db:generate --workspace=apps/api
```
Run database migrations:
```bash
npm run db:migrate --workspace=apps/api
```

#### Running the API
```bash
npm run dev:api
```

### Mobile App (`apps/mobile`)

The mobile app is built with React Native and Expo. It uses feature-based architecture.

#### Environment Variables
Create a `.env` file in `apps/mobile` with your Firebase and API configurations.

#### Running the App
```bash
npm run dev:mobile
```

## Development Standards

- **TypeScript**: Strict mode is enabled globally.
- **Linting & Formatting**: ESLint and Prettier are configured globally. Run `npm run lint` and `npm run format`.
- **Git Hooks**: `lint-staged` is configured via Husky to run on pre-commit, ensuring all committed code is formatted and lint-free.
- **Validation**: Zod is used for data validation across the stack.
