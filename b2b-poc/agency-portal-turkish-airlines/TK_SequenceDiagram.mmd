sequenceDiagram

    participant AA as Agency Admin

    participant AE as Agency Employee

    participant UI as AgencyPortal UI

    participant BE as AgencyPortal BE

    participant V as Verifier (SICPA)

    AA->>AE: Provide Employee ID

    UI->>BE: Generate User ID for the user

    
    
    


    UI->>BE: Sign Up

    BE->>V: Initiate Verification

    V-->>BE: Return URI

    BE->>UI: Generate and Display QR containing URI

    loop 

        UI->>V: Request Status

        V-->>UI: Return Fail/Success

    end

    alt if fail

        UI-->>AE: Error Message

    else if success

        BE->>V: Request VP

        V-->>BE: Return Name, Surname, Employee Email, Employee ID, Issuer ID

        BE->>BE: Finish Onboarding and Create LDAP

    end

    AE->>UI: Start Login Flow

    UI->>BE: Login

    BE->>V: Initiate Verification

    V-->>BE: Return URI

    BE->>UI: Generate and Display QR containing URI

    loop 

        UI->>V: Request Status

        V-->>UI: Return Fail/Success

    end

    alt if fail

        UI-->>AE: Verification Fails

    else if success

        BE->>V: Request VP providing Employee ID

        V-->>BE: Return Employee ID

        UI-->>AE: Redirect Main Page

    end 