# IATA SPP PoC 2024 - Digital Identity

## Overview
This repository hosts the IATA SPP Digital Identity PoC 2024, which explores the use of Digital Identity in aviation through two Proofs of Concept (PoCs). These PoCs showcase how Verifiable Credentials (VCs) and Digital Wallets can enhance security, efficiency, and interoperability for airlines, agencies, and passengers.

The project is divided into two PoCs:
1. **Project 777 (B2B):** Focuses on travel agency onboarding and authentication using Verifiable Credentials.
2. **Project 321 (B2C):** Enhances the passenger experience by enabling secure and seamless entry to airline services using Verifiable Credentials for lounge and Wi-Fi access.

Both PoCs were presented at the IATA World Data Symposium (WDS) 2025, highlighting how Digital Identity—using verifiable credentials and wallets—improves security, increases operational efficiency, and enhances the experience for both service providers and travelers.

## Project 777: B2B Digital Identity PoC

### Overview
Project 777 is a Business-to-Business (B2B) PoC that tackles identity management and fraud prevention in the travel industry. By leveraging Digital Employee IDs, the solution provides both travel agents and airlines with a secure and efficient identity framework, reducing fraud and streamlining the onboarding process.

### Scope
This Proof of Concept (PoC) validates seven key workflows demonstrating how Digital Identity and Verifiable Credentials (VCs) can enhance travel agency employee authentication and onboarding across multiple airline B2B portals.

The PoC integrates:
- Credential issuance and revocation by travel agencies.
- Mobile and web wallets for storing and presenting credentials by travel agents.
- VC verification services from multiple independent technology providers integrated in Airline Agency portals.

| # | Workflow | Description |
|---|----------|-------------|
| 1 | Agent Digital Employee ID Issuance | Travel agency issues verifiable credentials for agents. |
| 2 | Agency Registration (not all airlines use it) | Application form is automatically generated from digital wallet attributes. |
| 3 | Agency Approval (not all airlines use it) | Automatic approval triggered if the agent's digital identity is linked to a registered partner agency. |
| 4 | User Self-Registration in Airline Portal | Upon first login, agent information is automatically presented to the airline, and an agent profile is created instantly. |
| 5 | Agent Authentication via Mobile App | Agent logs in to the airline portal using mobile-based authentication. |
| 6 | Agent Authentication via Desktop App | Agent logs in to the airline portal using desktop-based authentication. |
| 7 | Agent Digital ID Revocation | Travel agency revokes the agent's digital credential if needed. |

More details: See [Project 777: B2B Digital Identity PoC](./b2b-poc/README.md)

## Project 321: B2C Digital Identity PoC

### Overview
Project 321 is a Business-to-Customer (B2C) PoC that enhances the passenger experience by allowing secure and seamless access to airline lounges and onboard services using Verifiable Credentials (VCs) and Digital Wallets. The project explores how digital identity solutions can improve frequent flyer program interactions, reduce inefficiencies, and create a frictionless, privacy-preserving passenger journey.

### Scope
This PoC validates key workflows demonstrating how digital identity and verifiable credentials (VCs) can enhance passenger access to airline services, including:

- **Wi-Fi Authentication:** Enabling frictionless access using verified identity attributes.
- **Lounge Entry:** Automating entitlement verification based on loyalty status and ticket class.
- **Entitlement Management:** Ensuring precise, automated validation of passenger privileges across multiple airline partners and service providers.

#### Lounge Access Verification
| Step | Description |
|------|-------------|
| 1 | Passenger selects Lounge Access on the Wi-Fi welcome page. |
| 2 | System requests boarding pass & Frequent Flyer (FFP) credentials. |
| 3 | Passenger shares credentials from Digital Wallet. |
| 4 | System verifies eligibility (ticket class, frequent flyer tier, entitlements). |
| 5 | Access approved, system generates a QR code for lounge entry. |

#### Wi-Fi Access Onboard/In-Cabin
| Step | Description |
|------|-------------|
| 1 | Passenger selects Wi-Fi network onboard. |
| 2 | Wi-Fi captive portal opens, requesting passport & FFP details. |
| 3 | Passenger shares credentials from Digital Wallet (or enters manually). |
| 4 | System verifies identity & entitlements using a trust registry. |
| 5 | Wi-Fi access granted, passenger is redirected to the welcome page. |

More details: See [Project 321: B2C Digital Identity PoC](./b2c-poc/README.md)

## Common Governance Framework
Both PoCs rely on a governance framework that uses a trust registry to verify issuer legitimacy, ensure credential authorization, and enable airlines to implement validation policies as verifiers.

## Presented at WDS 2025
Both Project 777 (B2B) and Project 321 (B2C) were showcased at the IATA World Data Symposium (WDS) 2025, which brought the industry together to explore data, technology, and cybersecurity.

## Vendors and Airlines

### Participating Vendors

- **Dreamix**  
  ![Dreamix Logo](./assets/logos/dreamix.png)
- **SICPA**  
  ![SICPA Logo](./assets/logos/sicpa.png)
- **Facephi**  
  ![Facephi Logo](./assets/logos/facephi.png)
- **Neoke**  
  ![Neoke Logo](./assets/logos/neoke.png)
- **4 Sure Technologies**  
  ![4 Sure Technologies Logo](./assets/logos/4_sure_technologies.png)


### Participating Airlines

- **Qatar Airways**  
  ![Qatar Airways Logo](./assets/logos/qatar_airways.png)
- **Emirates**  
  ![Emirates Logo](./assets/logos/emirates.png)
- **Turkish Airlines**  
  ![Turkish Airlines Logo](./assets/logos/turkish_airlines.png)
- **Air Canada**  
  ![Air Canada Logo](./assets/logos/air_canada.png)

