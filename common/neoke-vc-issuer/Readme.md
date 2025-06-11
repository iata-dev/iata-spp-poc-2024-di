# Node Server Project

A simple Node.js server application that serves HTML webpages.

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Insert valid apiKey and baseUrl

Replace [NEOKE-API-KEY] and [NEOKE-BASE-URL] with the values provided in both examples.

## Running the Application

To start the server, run:
```bash
npm start
```

The server will start running on the default port (typically 3000).

## Available Pages

The application provides two main pages:

### B2C VC Issuer (`/B2C-VC-Issuer.html`)
This page provides a user interface for issuing Verifiable Credentials (VCs) in a Business-to-Consumer (B2C) context. Users can:
- Fill out credential information through a user-friendly form
- Generate and view credential data
- Access deep linking functionality
- View and copy generated credentials

### B2B VC Issuer (`/B2B-VC-Issuer.html`)
This page provides a user interface for issuing Verifiable Credentials (VCs) in a Business-to-Business (B2B) context. Users can:
- Fill out business credential information
- Generate and view business credential data
- Access deep linking functionality
- View and copy generated business credentials

Both pages feature a modern, responsive design with:
- Form validation
- Error handling
- Loading indicators
- Copy-to-clipboard functionality
- Deep linking capabilities

## Project Structure

- `src/` - Contains the server source code
- `public/` - Contains static files and HTML pages
  - `B2C-VC-Issuer.html` - B2C credential issuance interface
  - `B2B-VC-Issuer.html` - B2B credential issuance interface
- `package.json` - Project configuration and dependencies

## Dependencies

- express: ^4.17.1 - Web framework for Node.js
- cors: ^2.8.5 - Cross-Origin Resource Sharing middleware

## License

ISC
