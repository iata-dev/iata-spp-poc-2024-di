# TK Agency Portal - Authentication Flow

This document outlines the user authentication and onboarding flows for the Agency Portal, leveraging a digital identity wallet for verification.

The following diagram illustrates the two main user journeys: signing up as a new employee and logging in as an existing employee.

```mermaid
sequenceDiagram
    participant AA as Agency Admin
    participant AE as Agency Employee
    participant UI as AgencyPortal UI
    participant BE as AgencyPortal BE
    participant V as Verifier (SICPA)

    Note over AA, V: New Employee Sign-Up Flow
    AA->>AE: 1. Provide Employee ID
    AE->>UI: 2. Start Sign-Up
    UI->>BE: 3. Initiate Sign-Up
    BE->>V: 4. Request Verification
    V-->>BE: 5. Return Verification URI
    BE-->>UI: 6. Display QR Code with URI

    loop 7. Poll for Status
        UI->>V: Check verification status
        V-->>UI: Return pending/fail/success
    end

    alt 8a. Verification Fails
        UI-->>AE: Display Error Message
    else 8b. Verification Succeeds
        BE->>V: 9. Request Verified Data (VP)
        V-->>BE: 10. Return Employee Details
        BE->>BE: 11. Finish Onboarding & Create Account
        UI-->>AE: Show Success & Onboarding Complete
    end

    Note over AA, V: Existing Employee Login Flow
    AE->>UI: 1. Start Login
    UI->>BE: 2. Initiate Login
    BE->>V: 3. Request Verification
    V-->>BE: 4. Return Verification URI
    BE-->>UI: 5. Display QR Code with URI

    loop 6. Poll for Status
        UI->>V: Check verification status
        V-->>UI: Return pending/fail/success
    end

    alt 7a. Verification Fails
        UI-->>AE: Display "Verification Fails"
    else 7b. Verification Succeeds
        BE->>V: 8. Request Verified Data (VP)
        V-->>BE: 9. Return & Confirm Employee ID
        UI-->>AE: 10. Redirect to Main Page
    end
