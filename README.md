# Fullstack App Monorepo

This project is a fullstack example using a [pnpm](https://pnpm.io/) workspace. It contains both frontend and backend packages managed together.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20.19.0 or higher recommended)
- [pnpm](https://pnpm.io/) (v10.28 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (required for backend; can be run locally or via Docker)

#### Optional

- [Docker](https://www.docker.com/) (required for running the stack with Docker Compose)

To install pnpm globally, run:

```bash
npm install -g pnpm
```

To install pnpm globally, run:

```bash
npm install -g pnpm
```

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/CodeRigged/fullstack-app-template.git
   cd ./fullstack-app-template
   ```

2. **Install dependencies for all packages:**

   ```bash
   pnpm install
   ```

3. **Run the development servers:**

   ```bash
   pnpm dev
   ```

   This command starts both the frontend and backend in development mode. Output from both will be shown in your terminal.

4. **Test all packages:**

   ```bash
   pnpm test
   ```

   This command runs tests for all packages in the workspace.

5. **Lint all packages:**

   ```bash
   pnpm lint
   ```

   This command checks code quality and formatting for all packages in the workspace. You can use `pnpm lint:autofix` to automatically fix issues.

6. **Build all packages:**

   ```bash
   pnpm build
   ```

   This compiles the frontend and backend for production.

7. **Clean build artifacts:**

   ```bash
   pnpm clean
   ```

## Running with Docker

You can run the entire stack (MongoDB, backend, and frontend) using Docker Compose. Make sure Docker is installed and running, then use:

```bash
docker-compose up --build
```

This will start all services as defined in `docker-compose.yml`:

- MongoDB (port 27017)
- Backend API (Express, port 5000)
- Frontend (React, port 8080)

To stop and remove containers, run:

```bash
docker-compose down
```

## Project Structure

- `frontend/` – React TypeScript frontend app
- `backend/` – Backend service (Express + MongoDB, with controllers/models/routes/services)
- `shared/` – Shared TypeScript code (types, enums, utilities) for both frontend and backend

## Troubleshooting

- Make sure you are using the correct Node.js and pnpm versions.
- If you encounter issues, try running `pnpm install` again.
- If the backend fails to connect to MongoDB, ensure MongoDB is running locally (default: mongodb://localhost:27017/todos) or update the `MONGO_URI` environment variable in the backend.

## License

MIT © [CodeRigged](https://github.com/CodeRigged)
