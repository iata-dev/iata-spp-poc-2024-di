Agency Portal - Air Canada (IATA B2B POC)

1. OVERVIEW
-----------
This project is a Proof of Concept (POC) for an IATA B2B digital identity solution for Air Canada. It provides a web portal for travel agencies and their employees to register and manage their credentials using a decentralized identity approach (SD-JWT). The application consists of a React-based frontend (iata-aircanadafe-poc) and a NestJS-based backend (iata-aircanadabe-poc).

This project demonstrates a streamlined and secure way for travel agencies and their staff to interact with the Air Canada system, enhancing security and efficiency through digital, verifiable credentials.


2. FEATURES
-----------
* Digital Wallet Integration: Utilizes digital wallets for identity verification via QR code scanning.
* Agency & Employee Registration:
  - Agencies can register using a digital ID for instant verification or opt for a legacy registration process.
  - New employees can create profiles by verifying their credentials through the platform.
* Secure Authentication: Supports both traditional login and modern, QR-code-based authentication for secure access.
* Credential Management: The portal provides a clear view of agency and employee credentials.
* RESTful API: A comprehensive backend API manages all business logic, including proof requests, authentication, and data handling.


3. TECH STACK
-------------
The project is built with a modern technology stack, ensuring scalability and maintainability.

* Frontend: React, Vite, TypeScript, Tailwind CSS, Axios, React Router, Formik
* Backend: NestJS, TypeScript, TypeORM, PostgreSQL, Swagger
* DevOps: Docker
* Testing: Jest


4. PROJECT STRUCTURE
--------------------
The repository is organized as a monorepo with two main packages:

/
├── iata-aircanada-poc/
│   ├── iata-aircanadabe-poc/  # NestJS Backend Application
│   └── iata-aircanadafe-poc/  # React Frontend Application
└── README.md                  # This file

* iata-aircanadafe-poc/: Contains all the frontend code. The main application logic resides in the `src/` directory, with pages, components, and API interaction modules clearly separated.
* iata-aircanadabe-poc/: Contains the backend API. The `src/` directory is organized by modules such as `agency`, `auth`, `idp`, and `proof-request`.


5. GETTING STARTED
------------------
To get the project running locally, follow these steps.

**Prerequisites**
* Node.js (v18 or higher)
* Yarn or npm
* Docker and Docker Compose
* A running PostgreSQL instance

**Backend Setup (iata-aircanadabe-poc)**

1. Navigate to the backend directory:
   cd agency-portal-air-canada/iata-aircanadabe-poc

2. Create a `.env` file in this directory. You can use the `docker-compose.yml` and the database configuration files as a reference for the required environment variables. It should look something like this:

    # Application
    APPLICATION_PORT=5012
    APPLICATION_URL=http://localhost:5012

    # Database
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_USERNAME=postgres
    POSTGRES_PASSWORD=your_password
    POSTGRES_DATABASE=aircanada_poc

    # Enterprise Verifier API
    ENTERPRISE_VERIFIER_API_URL=https://your-verifier-api-url.com
    ENTERPRISE_VERIFIER_API_LOB_ID=your_lob_id
    ENTERPRISE_API_API_KEY=your_api_key
    ENTERPRISE_PROOF_REQUEST_ID=your_proof_request_id

    # IATA Trust Registry
    IATA_TR_BASE_URL=https://your-tr-base-url.com
    IATA_TR_API_KEY=your_tr_api_key

    # Air Canada IDP
    AIRCANADA_IDP_BASE_URL=https://your-idp-base-url.com
    AIRCANADA_REALM_ID=your_realm_id

3. Install dependencies:
   npm install

4. Run the development server:
   npm run start:dev
   
   The backend will be running on the port specified by `APPLICATION_PORT` (e.g., http://localhost:5012).

5. API Documentation:
   Once the server is running, you can access the Swagger API documentation at http://localhost:5012/api/docs.


**Frontend Setup (iata-aircanadafe-poc)**

1. Navigate to the frontend directory:
   cd agency-portal-air-canada/iata-aircanadafe-poc

2. Create a `.env` file in this directory to specify the backend API URL:
   VITE_API_URL=http://localhost:5012

3. Install dependencies:
   npm install

4. Run the development server:
   npm run dev

   The frontend application will be accessible at http://localhost:3004.


6. API ENDPOINTS
----------------
The backend provides several endpoints to support the application's functionality. Here are some of the key endpoints available:

* POST /api/proof-request
  - Description: Generates a QR code URL for credential proof requests.

* GET /api/auth/agencies/{cred_proof_id}
  - Description: Checks the status of an agency registration proof request.

* GET /api/auth/agencies/employee/{cred_proof_id}
  - Description: Checks the status of an employee registration proof request.

* POST /api/idp/register-profile
  - Description: Registers a new employee profile in the Identity Provider (IDP).

* DELETE /api/idp/reset
  - Description: Resets the demo data in the IDP and database.

* PATCH /agency
  - Description: Updates agency details, such as marking an agency as registered.

* GET /health
  - Description: Provides a health check for the backend application.