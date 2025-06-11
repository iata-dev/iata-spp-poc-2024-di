# Agency Portal - Air Canada (IATA B2B POC)

This repository contains the source code for the Air Canada Agency Portal, a proof-of-concept project for an IATA B2B digital identity solution. It demonstrates how travel agencies and their employees can use verifiable credentials to register and manage their access.

The project is divided into two main components:
1.  **Frontend**: A React-based single-page application built with Vite that serves as the user interface for the portal.
2.  **Backend**: A NestJS-based server that handles all business logic, credential verification, and API services.

## 🛠️ Tech Stack

### Frontend

-   **Framework**: React
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: Formik (for forms)
-   **Routing**: React Router
-   **API Client**: Axios
-   **Linting**: ESLint

### Backend

-   **Framework**: NestJS
-   **Language**: TypeScript
-   **ORM**: TypeORM
-   **Database**: PostgreSQL (with SQLite for testing)
-   **API Documentation**: Swagger
-   **Testing**: Jest

## 📂 Project Structure

The repository is organized into two main directories:

```
.
├── iata-aircanadabe-poc/       # The NestJS Backend Application
│   ├── src/
│   │   ├── modules/            # Feature modules (agency, auth, idp, etc.)
│   │   ├── config/             # Database and environment configuration
│   │   ├── main.ts             # Application entry point
│   │   └── app.module.ts       # Root application module
│   ├── swagger-spec-aircanada.json # OpenAPI specification
│   └── package.json
│
└── iata-aircanadafe-poc/       # The React Vite Frontend
├── src/
│   ├── api/                # API client for the backend
│   ├── assets/             # Static assets (removed for brevity)
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route-specific page components
│   ├── helper/             # Utility functions
│   ├── main.tsx            # React application entry point
│   └── App.tsx             # Main application component
└── package.json
```

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   Docker and Docker Compose

### Backend Setup (`iata-aircanadabe-poc`)

1.  **Navigate to the backend directory:**
    ```bash
    cd iata-aircanadabe-poc
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the `iata-aircanadabe-poc` directory. Use the `docker-compose.yml` and `src/config/database.configurations.ts` files as a reference to add the necessary variables.

    Example `.env` file:
    ```env
    # Application
    APPLICATION_PORT=5012
    APPLICATION_URL=http://localhost:5012

    # Database
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_USERNAME=postgres
    POSTGRES_PASSWORD=your_password
    POSTGRES_DATABASE=aircanada_poc

    # Add other required API keys and URLs
    ```

4.  **Run the development server:**
    The backend server will start on `http://localhost:5012`.
    ```bash
    npm run start:dev
    ```

### Frontend Setup (`iata-aircanadafe-poc`)

1.  **Navigate to the frontend directory:**
    ```bash
    cd iata-aircanadafe-poc
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the `iata-aircanadafe-poc` directory to point to your running backend.
    ```env
    VITE_API_URL=http://localhost:5012
    ```

4.  **Run the development server:**
    The frontend application will be available at `http://localhost:3004`.
    ```bash
    npm run dev
    ```

## API Endpoints

The backend provides several endpoints to support the application's functionality. The full API is documented via Swagger, available at `/api/docs` on the running backend.

| Method | Endpoint                                  | Description                                            |
| :----- | :---------------------------------------- | :----------------------------------------------------- |
| `POST` | `/api/proof-request`                      | Generates a QR code for a credential proof request.    |
| `GET`  | `/api/auth/agencies/{id}`                 | Checks the status of an agency registration.           |
| `GET`  | `/api/auth/agencies/employee/{id}`        | Checks the status of an employee registration.         |
| `POST` | `/api/idp/register-profile`               | Registers a new employee profile in the IDP.           |
| `PATCH`| `/agency`                                 | Updates agency details (e.g., marks as registered).    |
| `GET`  | `/health`                                 | Health check for the backend application.              |

