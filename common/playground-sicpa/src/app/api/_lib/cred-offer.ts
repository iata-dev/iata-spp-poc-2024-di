
const credOffers = {
  "visa_vc": {
    claims: {
      vct: "visa_vc",
      visa: {
        // filled by UI FORM
      },
    },
    credentialFormat: "SD-JWT-VC",
    templateId: "01925795-f83d-7874-88be-6c07d279b2db",
  },
  "frequent_flyer_vc": {
    claims: {
      /// filled by UI FORM
    },

    credentialFormat: "SD-JWT-VC",
    templateId: "01920bb8-da8b-7337-ac57-fd5564f9e8ce",
  },
  "boarding_pass_vc": {
    claims: {
      // filled by UI FORM
    },

    credentialFormat: "SD-JWT-VC",
    templateId: "019224ba-49fc-7c8f-a287-c6da9af83d7f",
  },
  "epassport_copy_vc": {
    claims: {
      // filled by UI FORM
      // vct: "epassport_copy_vc",
      // electronicPassport: {
      //   dataGroup1: {
      //     birthdate: "780101", // Random date following the pattern
      //     docTypeCode: "PA", // Valid document type code
      //     expiryDate: "300501", // Random expiry date
      //     sexCode: "F", // Random sex code
      //     holdersName: "Sofia Johnson", // Random holder name
      //     issuerCode: "USA", // Random issuer code
      //     natlCode: "USA", // Random nationality code
      //     passportNumberIdentifier: "123456789" // Random passport number
      //   },
      //   dataGroup2EncodedFaceBiometrics: {
      
      //   },
      //   dataGroup15: {
      //     activeAuthentication: {
      //       publicKeyBinaryObject: "data:application/octet-stream;base64,MIIEvAIBADANBg..." // Random public key
      //     }
      //   },
      //   docSecurityObject: {
      //     digestHashAlgorithmIdentifier: "SHA-256", // Random algorithm identifier
      //     versionNumber: 2, // Random version number
      //     dataGroupHash: [
      //       {
      //         dataGroupNumber: 1,
      //         valueBinaryObject: "data:application/octet-stream;base64,ABCD1234..." // Random hash value
      //       },
      //       {
      //         dataGroupNumber: 2,
      //         valueBinaryObject: "data:application/octet-stream;base64,EFGH5678..." // Random hash value
      //       }
      //     ]
      //   }
      // }
    },

    credentialFormat: "SD-JWT-VC",
    templateId: "0192473a-08e9-7943-b2ea-8935609d9294",
  },
  "live_biometric_vc": {
    claims: {
      // filled by UI FORM
      // vct: "live_biometric_vc",
      // liveBiometric: {
      //   fullName: "John Doe", // Random full name
      //   liveBiometricFaceImage: "data:image/png;base64,
      //   birthdate: "851015", // Random birthdate
      //   // identityDocumentIdentifier: "A12345678" // Random identity document identifier
      // }
    },
    credentialFormat: "SD-JWT-VC",
    templateId: "019247c2-0eee-7ff6-b649-649a82020dec",
  },
  "corporate_vc": {
    claims: {
      // filled by UI FORM
      // vct: "corporate_vc",
      // employee: {
      //   givenName: "Alice", // Random given name
      //   numberIdentifier: "EMP123456", // Random employee number identifier
      //   orgIdentifier: "ACME123", // Random organization identifier
      //   orgName: "ACME Corporation", // Random organization name
      //   surname: "Johnson", // Random surname
      //   titleName: "Software Engineer" // Random job title
      // },
    },
    credentialFormat: "SD-JWT-VC",
    templateId: "019247db-04d6-7737-849f-36626d611891",
  },
  "order_id_vc": {
    claims: {
      // filled by UI FORM
      // vct: "order_id_vc",
      // order: {
      //   givenName: "John",
      //   orderIdentifier: "ORD1234567890",
      //   surname: "Doe",
      //   titleName: "Mr.",
      //   paxSegments: [
      //     {
      //       destStationIATALocationCode: "JFK",
      //       flightIdentifierDate: "2024-12-25",
      //       operatingCarrierAirlineDesigCode: "IB",
      //       operatingCarrierFlightNumber: "1234",
      //       originStationIATALocationCode: "LAX",
      //       bookingStatusCode: "Confirmed",
      //       scheduledArrivalTime: "2022-07-01T12:00:00Z",
      //       scheduledDepartureTime: "2022-07-01T10:00:00Z"
      //     },
      //     {
      //       destStationIATALocationCode: "LHR",
      //       flightIdentifierDate: "2024-12-30",
      //       operatingCarrierAirlineDesigCode: "IB",
      //       operatingCarrierFlightNumber: "1235",
      //       originStationIATALocationCode: "JFK",
      //       bookingStatusCode: "Confirmed",
      //       scheduledArrivalTime: "2022-07-01T14:00:00Z",
      //       scheduledDepartureTime: "2022-07-01T12:00:00Z"
      //     }

      //   ]
      // }
    },
    credentialFormat: "SD-JWT-VC",
    templateId: "01926d3a-11f5-7bf4-acb6-7ce1b9797032",
  }
};

export { credOffers };



