# Kronos Airlines Captive Portal

This repository contains the source code for the Kronos Airlines Captive Portal, a proof-of-concept project demonstrating how verifiable credentials can be used to grant access to airline services like airport Wi-Fi and lounge access.

The project is divided into two main components:
1.  **Frontend**: A React-based single-page application built with Vite that serves as the user interface.
2.  **Backend**: A Node.js and Express-based server that handles verification logic and communication with digital wallet services.

## 🛠️ Tech Stack

### Frontend

-   **Framework**: React
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS with `tailwindcss-animate` for animations.
-   **UI Components**: Radix UI (for primitives like Checkbox, Select, etc.) and `lucide-react` for icons.
-   **Routing**: React Router
-   **Linting**: ESLint with plugins for React, hooks, and import sorting.
-   **API Mocking**: Mock Service Worker (MSW).

### Backend

-   **Framework**: Express.js
-   **Language**: Node.js
-   **API Client**: Axios
-   **Security & Authentication**: `jwt-decode` for handling JSON Web Tokens.
-   **Environment Management**: `dotenv`.
-   **Development**: `nodemon` for automatic server restarts.

## 📂 Project Structure

The repository is organized into two main directories:

```
.
├── captive-portal-backend-iata/  # The Node.js Express backend
│   ├── src/
│   │   ├── verifiers/              # Logic for different VC verifiers (SICPA, NEOKE)
│   │   ├── appError.js             # Custom error handler
│   │   ├── config.js               # Environment configuration
│   │   ├── constants.js            # Application constants (flows, issuers)
│   │   ├── server.js               # Express server setup and API routes
│   │   └── sessionStore.js         # In-memory session management
│   ├── .env.example                # Example environment file
│   └── package.json
│
└── captive-portal-frontend/      # The React Vite frontend
    ├── src/
    │   ├── api/                    # API client for communicating with the backend
    │   ├── assets/                 # Icons and images
    │   ├── components/             # Reusable UI components
    │   ├── hooks/                  # Custom React hooks (useToast, useVerification)
    │   ├── layout/                 # Page layout components
    │   ├── lib/                    # Utility functions
    │   ├── mocks/                  # MSW handlers and browser setup
    │   └── pages/                  # Route-specific page components
    ├── public/                     # Static assets
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18.0.0 or higher recommended, as per backend `package.json`)
-   npm or yarn

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd captive-portal-backend-iata
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the `captive-portal-backend-iata` directory. Use the `src/config.js` file as a reference to add the necessary variables for API keys, secrets, and URLs.

4.  **Run the development server:**
    The backend server will start on `http://localhost:3000`.
    ```bash
    npm run start:dev
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd captive-portal-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    The frontend application will be available at `http://localhost:3001`. It is configured to proxy API requests to the backend at `http://localhost:3000`.
    ```bash
    npm run start:dev
    ```

## ⚙️ Scripts

### Frontend (`captive-portal-frontend/package.json`)

-   `npm run start:dev`: Starts the Vite development server.
-   `npm run build`: Builds the application for production.
-   `npm run lint`: Lints the project files using ESLint.
-   `npm run preview`: Serves the production build locally.

### Backend (`captive-portal-backend-iata/package.json`)

-   `npm run start`: Starts the server in production mode.
-   `npm run start:dev`: Starts the server in development mode with `nodemon`, which automatically restarts on file changes.
