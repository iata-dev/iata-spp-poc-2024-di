
export const visaVcSchema = {
  "type": "object",
  "required": ["visa"],
  "properties": {
    "visa": {
      "display": [{ "name": "Visa", "locale": "en-US" }],
      "title": "Visa",
      "description": "An official entry in a Passport or other Travel Document made by an official of a government to indicate that the bearer has been granted authority to enter or re-enter the country or region concerned.",
      "type": "object",
      "required": ["birthdate", "docNumberIdentifier", "holdersName", "issuerCode", "natlCode", "sexCode", "typeCode", "validUntilDate"],
      "selectiveDisclosures": ["birthdate", "docNumberIdentifier", "holdersName", "issuerCode", "natlCode", "sexCode", "typeCode", "validUntilDate"],
      "properties": {
        "birthdate": {
          "display": [{ "name": "Birthdate", "locale": "en-US" }],
          "title": "Birthdate",
          "description": "Date of birth of the holder of the visa in the format YYMMDD, e.g., 850101 for January 1, 1985.",
          "type": "string",
          "pattern": "^[0-9<]{2}([0<][1-9<]|[1<][0-2<])([0<][1-9<]|[12<][0-9<]|[3<][01<])$"
        },
        "capturedVisaPicture": {
          "display": [{ "name": "Picture", "locale": "en-US" }],
          "title": "Captured Visa Picture",
          "description": "Image of the holder of the Visa. Example: data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQ ...",
          "type": "string",
          "format": "textarea"
        },
        "docNumberIdentifier": {
          "display": [{ "name": "Number", "locale": "en-US" }],
          "title": "Document Number Identifier",
          "description": "An identifier given by the issuing State or organization to uniquely identify the document from all other official travel documents issued by the State or organization. Example: 123456789.",
          "type": "string",
          "maxLength": 9
        },
        "holdersName": {
          "display": [{ "name": "Name", "locale": "en-US" }],
          "title": "Holder's Full Name",
          "description": "Family name and given name(s) of the visa holder. Example: John Doe.",
          "type": "string",
          "minLength": 1,
          "maxLength": 39
        },
        "issuerCode": {
          "display": [{ "name": "Issuer Code", "locale": "en-US" }],
          "title": "Issuer Code",
          "description": "Code of the State or Organization responsible for the issuance of the Visa. Example: USA.",
          "type": "string",
          "minLength": 3,
          "maxLength": 3
        },
        "natlCode": {
          "display": [{ "name": "Nationality Code", "locale": "en-US" }],
          "title": "Nationality Code",
          "description": "The code for the nationality of the holder of the visa. Example: USA.",
          "type": "string",
          "minLength": 3,
          "maxLength": 3
        },
        "optionalDataElementsText": {
          "title": "Optional Data Elements",
          "description": "A structured field for proprietary use by the state issuer of the Visa. Example: Optional12345678.",
          "type": "string",
          "minLength": 16,
          "maxLength": 16
        },
        "sexCode": {
          "display": [{ "name": "Sex", "locale": "en-US" }],
          "title": "Sex Code",
          "description": "Sex of the visa holder; typically, F for Female, M for Male, or < for non-specified. Example: F.",
          "type": "string",
          "enum": ["F", "M", "<"]
        },
        "typeCode": {
          "display": [{ "name": "Document Type", "locale": "en-US" }],
          "title": "Document Type",
          "description": "The type of document where the first character is a capital letter V which designates a machine-readable visa. Example: V1.",
          "type": "string",
          "pattern": "^V.$"
        },
        "validUntilDate": {
          "display": [{ "name": "Valid Until", "locale": "en-US" }],
          "title": "Valid Until Date",
          "description": "The last day on which the Visa can be used in the format YYMMDD. Example: 251231 for December 31, 2025.",
          "type": "string",
          "pattern": "^[0-9]{2}([0][1-9]|[1][0-2])([0][1-9]|[12][0-9]|[3][01])$"
        },
        "visibleDigitalSealBinaryObject": {
          "title": "Visible Digital Seal",
          "description": "Visible Digital Seal for non-electronic documents. Example: data:application/octet-stream;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD",
          "type": "string",
          "format": "textarea"
        }
      }
    }
  }
};

export const electronicPassportSchema = {
  "type": "object",
  "required": ["electronicPassport"],
  "properties": {
    "electronicPassport": {
      "display": [{ "name": "Electronic Passport", "locale": "en-US" }],
      "title": "Electronic Passport",
      "description": "A passport that has an embedded electronic microprocessor chip, which contains biometric information that can be used to authenticate the identity of the passport holder. Example: Biometric Passport.",
      "type": "object",
      "required": ["dataGroup1", "dataGroup2EncodedFaceBiometrics", "docSecurityObject"],
      "selectiveDisclosures": ["dataGroup1", "dataGroup2EncodedFaceBiometrics", "docSecurityObject"],
      "properties": {
        "dataGroup1": {
          "display": [{ "name": "Data Group 1", "locale": "en-US" }],
          "title": "Data Group 1",
          "description": "Data Group 1 (DG1) of the machine readable zone (MRZ). Example: MRZ data includes name, birthdate, etc.",
          "type": "object",
          "required": ["birthdate", "docTypeCode", "expiryDate", "sexCode", "holdersName", "issuerCode", "natlCode", "passportNumberIdentifier"],
          "selectiveDisclosures": ["birthdate", "docTypeCode", "expiryDate", "sexCode", "holdersName", "issuerCode", "natlCode", "passportNumberIdentifier"],
          "properties": {
            "birthdate": {
              "display": [{ "name": "Birthdate", "locale": "en-US" }],
              "title": "Data Group 1 Birthdate",
              "description": "Date of birth of the passport holder as recorded by the issuing State or organization. Example: 850101 (January 1, 1985).",
              "type": "string",
              "pattern": "^[0-9<]{2}([0<][1-9<]|[1<][0-2<])([0<][1-9<]|[12<][0-9<]|[3<][01<])$"
            },
            "docTypeCode": {
              "display": [{ "name": "Document Type Code", "locale": "en-US" }],
              "title": "Data Group 1 Document Type Code",
              "description": "Capital letter P to designate an ePassport. One additional capital letter may be used, in the character position after the letter P and at the discretion of the issuing State or organization, to designate other types of passports such as MRP issued to diplomatic staff. Capital letter P to designate an ePassport. Example: PA",
              "type": "string",
              "pattern": "^P.$"
            },
            "expiryDate": {
              "display": [{ "name": "Expiry Date", "locale": "en-US" }],
              "title": "Data Group 1 Expiry Date",
              "description": "Date of expiry of the ePassport in the format YYMMDD. Example: 300101 for January 1, 2030.",
              "type": "string",
              "pattern": "^[0-9]{2}([0][1-9]|[1][0-2])([0][1-9]|[12][0-9]|[3][01])$"
            },
            "sexCode": {
              "display": [{ "name": "Sex", "locale": "en-US" }],
              "title": "Sex Code",
              "description": "Sex of the passport holder. Example: F for Female, M for Male, < for non-specified.",
              "type": "string",
              "enum": ["F", "M", "<"]
            },
            "holdersName": {
              "display": [{ "name": "Holders Name", "locale": "en-US" }],
              "title": "Data Group 1 Holders Name",
              "description": "Full name of the holder. Example: Jane Smith.",
              "type": "string",
              "minLength": 1,
              "maxLength": 39
            },
            "issuerCode": {
              "display": [{ "name": "Issuer Code", "locale": "en-US" }],
              "title": "Data Group 1 Issuer Code",
              "description": "Code of the State or Organization responsible for the issuance of the ePassport. Example: USA.",
              "type": "string",
              "maxLength": 13
            },
            "natlCode": {
              "display": [{ "name": "Nationality", "locale": "en-US" }],
              "title": "Data Group 1 Nationality",
              "description": "Nationality of the passport holder. Example: USA.",
              "type": "string",
              "minLength": 3,
              "maxLength": 3
            },
            "passportNumberIdentifier": {
              "display": [{ "name": "Passport Number", "locale": "en-US" }],
              "title": "Data Group 1 Passport Number Identifier",
              "description": "Passport number, uniquely identifying the passport. Example: 987654321.",
              "type": "string",
              "maxLength": 9
            }
          }
        },
        "dataGroup2EncodedFaceBiometrics": {
          "title": "Data Group 2 Encoded Face Biometrics",
          "description": "Face biometric image. Example: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD",
          "type": "object",
          "required": ["faceBiometricDataEncodedPicture"],
          "selectiveDisclosures": ["faceBiometricDataEncodedPicture"],
          "properties": {
            "faceBiometricDataEncodedPicture": {
              "title": "Encoded Face Biometrics Picture",
              "description": "Face biometric image in base64. Example: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD",
              "type": "string",
              "format": "textarea"
            }
          }
        },
        "docSecurityObject": {
          "title": "Document Security Object",
          "description": "Document Security Object containing hashed ePassport data. Example: data:application/octet-stream;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD",
          "type": "object",
          "required": ["dataGroupHash", "digestHashAlgorithmIdentifier", "versionNumber"],
          "properties": {
            "digestHashAlgorithmIdentifier": {
              "title": "Digest Hash Algorithm Identifier",
              "description": "Algorithm Identifier used to perform hashing on the data groups. Example: SHA-256.",
              "type": "string",
              "maxLength": 35
            },
            "versionNumber": {
              "title": "Version Number",
              "description": "Version of the Document Security Object. Example: 1.",
              "type": "number"
            },
            "dataGroupHash": {
              "title": "Data Group Hash",
              "description": "Hash value for corresponding data group. Example: data:application/octet-stream;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD",
              "type": "array",
              "items": {
                "type": "object",
                "required": ["dataGroupNumber", "valueBinaryObject"],
                "properties": {
                  "dataGroupNumber": {
                    "title": "Data Group Number",
                    "description": "Number of the data group. Example: 1.",
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 16
                  },
                  "valueBinaryObject": {
                    "title": "Hash Value",
                    "description": "Hash value for the corresponding data group. Example: data:application/octet-stream;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD",
                    "type": "string",
                    "format": "textarea"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const loyaltyScheme =  {
  "type": "object",
  "required": ["loyaltyProgramAccount"],
  "properties": {
    "loyaltyProgramAccount": {
      "display": [
        {
          "name": "Loyalty Program Account",
          "locale": "en-US"
        }
      ],
      "title": "Loyalty Program Account",
      "description": "An account set up for a customer within a rewards program. Example: 'Loyalty Program Account: Gold Member, ID: 12345678'.",
      "type": "object",
      "required": [
        "givenName",
        "loyaltyProgramAccountIdentifier",
        "loyaltyProgramAccountTierLevelCode",
        "loyaltyProgramCode",
        "loyaltyProgramName",
        "providerName",
        "surname",
        "titleName"
      ],
      "properties": {
        "givenName": {
          "display": [
            {
              "name": "Given Name",
              "locale": "en-US"
            }
          ],
          "title": "Given Name",
          "description": "First name of the loyalty program account holder. Example: 'John'.",
          "type": "string",
          "minLength": 1,
          "maxLength": 64
        },
        "loyaltyProgramAccountIdentifier": {
          "display": [
            {
              "name": "Identifier",
              "locale": "en-US"
            }
          ],
          "title": "Loyalty Program Account Identifier",
          "description": "Unique identifier for the loyalty program account. Example: '123456789'.",
          "type": "string",
          "maxLength": 35
        },
        "loyaltyProgramAccountTierLevelCode": {
          "display": [
            {
              "name": "Tier Level",
              "locale": "en-US"
            }
          ],
          "title": "Loyalty Program Account Tier Level Code",
          "description": "Tier level of the loyalty account holder. Example: 'Gold'.",
          "type": "string",
          "maxLength": 35
        },
        "loyaltyProgramCode": {
          "display": [
            {
              "name": "Program Code",
              "locale": "en-US"
            }
          ],
          "title": "Loyalty Program Code",
          "description": "Code identifying the loyalty program. Example: 'CATHAY123'.",
          "type": "string",
          "maxLength": 35
        },
        "loyaltyProgramName": {
          "display": [
            {
              "name": "Program Name",
              "locale": "en-US"
            }
          ],
          "title": "Loyalty Program Name",
          "description": "Name of the loyalty program. Example: 'Cathay Pacific Asia Miles'.",
          "type": "string",
          "minLength": 1,
          "maxLength": 64
        },
        "providerName": {
          "display": [
            {
              "name": "Provider Name",
              "locale": "en-US"
            }
          ],
          "title": "Provider Name",
          "description": "Name of the loyalty program provider. Example: 'Cathay Pacific'.",
          "type": "string",
          "minLength": 1,
          "maxLength": 64
        },
        "surname": {
          "display": [
            {
              "name": "Surname",
              "locale": "en-US"
            }
          ],
          "title": "Surname",
          "description": "Last name of the loyalty program account holder. Example: 'Doe'.",
          "type": "string",
          "minLength": 1,
          "maxLength": 64
        },
        "titleName": {
          "display": [
            {
              "name": "Title",
              "locale": "en-US"
            }
          ],
          "title": "Title",
          "description": "Title of the loyalty program account holder. Example: 'Mr.'.",
          "type": "string",
          "minLength": 2,
          "maxLength": 88
        }
      }
    }
  }
};

export const boardingPassSchema = {
  "type": "object",
  "required": ["boardingPass"],
  "properties": {
    "boardingPass": {
      "display": [
        {
          "name": "Boarding Pass",
          "locale": "en-US"
        }
      ],
      "title": "Boarding Pass",
      "description": "A document that authorizes a passenger to board aircraft for specific flights. Example: 'Flight BA123, Seat 12A, Gate 15'.",
      "type": "object",
      "required": [
        "barcodeString",
        "paxName",
        "paxSegments",
        "segmentCount",
        "ticketLessOrElectronicTicketInd"
      ],
      "properties": {
        "barcodeString": {
          "display": [
            {
              "name": "Barcode String",
              "locale": "en-US"
            }
          ],
          "title": "Barcode String",
          "description": "Encoded string containing the boarding pass barcode. Example: 'ABC123456789'.",
          "type": "string"
        },
        "paxName": {
          "display": [
            {
              "name": "Passenger Name",
              "locale": "en-US"
            }
          ],
          "title": "Passenger Name",
          "description": "Full name of the passenger. Example: 'Doe/John'.",
          "type": "string",
          "minLength": 1,
          "maxLength": 20
        },
        "segmentCount": {
          "display": [
            {
              "name": "Segment Count",
              "locale": "en-US"
            }
          ],
          "title": "Segment Count",
          "description": "Number of segments on the boarding pass. Example: '1'.",
          "type": "integer",
          "minimum": 1,
          "maximum": 4
        },
        "ticketLessOrElectronicTicketInd": {
          "display": [
            {
              "name": "Ticket Indicator",
              "locale": "en-US"
            }
          ],
          "title": "Ticketless or Electronic Ticket Indicator",
          "description": "'E' for electronic ticket, 'L' for ticketless. Example: 'E'.",
          "type": "string",
          "maxLength": 1,
          "enum": ["E", "L"]
        },
        "paxSegments": {
          "display": [
            {
              "name": "Passenger Segments",
              "locale": "en-US"
            }
          ],
          "title": "Passenger Segments",
          "description": "Flight segments for the passenger. Example: 'BA123, London to Paris'.",
          "type": "array",
          "minItems": 1,
          "maxItems": 4,
          "items": {
            "type": "object",
            "required": [
              "bookingRefID",
              "checkInOrdinal",
              "compartmentTypeCode",
              "destStationIATALocationCode",
              "flightIdentifierDate",
              "operatingCarrierAirlineDesigCode",
              "operatingCarrierFlightNumber",
              "originStationIATALocationCode",
              "paxRelatedStatusCode",
              "seatAssignmentStatusOrSeatNumberCode"
            ],
            "properties": {
              "bookingRefID": {
                "title": "Booking Reference Identifier",
                "description": "Booking reference for the passenger. Example: 'ABCDEF'.",
                "type": "string",
                "maxLength": 7
              },
              "checkInOrdinal": {
                "title": "Check-In Sequence Number",
                "description": "Passenger check-in sequence. Example: '001'.",
                "type": "string",
                "maxLength": 5
              },
              "compartmentTypeCode": {
                "title": "Compartment Type Code",
                "description": "Class of travel. Example: 'Y' (economy).",
                "type": "string",
                "maxLength": 1
              },
              "destStationIATALocationCode": {
                "title": "Destination Station IATA Location Code",
                "description": "IATA code for the destination station. Example: 'CDG' (Paris).",
                "type": "string",
                "minLength": 3,
                "maxLength": 3
              },
              "flightIdentifierDate": {
                "title": "Flight Identifier Date",
                "description": "Flight date in Julian format. Example: '123'.",
                "type": "string",
                "pattern": "^[0-9]{3}$"
              },
              "operatingCarrierAirlineDesigCode": {
                "title": "Operating Carrier Airline Designator Code",
                "description": "Airline code. Example: 'BA'.",
                "type": "string",
                "pattern": "^[A-Z]{2,3}$"
              },
              "operatingCarrierFlightNumber": {
                "title": "Operating Carrier Flight Number",
                "description": "Flight number. Example: '123'.",
                "type": "string",
                "pattern": "^[0-9]{1,4}$"
              },
              "originStationIATALocationCode": {
                "title": "Origin Station IATA Location Code",
                "description": "IATA code for the departure station. Example: 'LHR' (London Heathrow).",
                "type": "string",
                "minLength": 3,
                "maxLength": 3
              },
              "paxRelatedStatusCode": {
                "title": "Passenger Related Status Code",
                "description": "Status of the passenger. Example: 'O'.",
                "type": "string",
                "pattern": "^[0-9A-Z]$"
              },
              "seatAssignmentStatusOrSeatNumberCode": {
                "title": "Seat Assignment Status or Seat Number Code",
                "description": "Assigned seat number or 'GATE' if not allocated. Example: '12A'.",
                "type": "string",
                "maxLength": 4
              }
            }
          }
        }
      }
    }
  }
};

export const liveBiometricsSchema = {
  "display": [
    {
      "name": "Live Biometric",
      "locale": "en-US"
    }
  ],
  "type": "object",
  "required": ["liveBiometric"],
  "properties": {
    "liveBiometric": {
      "display": [
        {
          "name": "Live Biometric",
          "locale": "en-US"
        }
      ],
      "title": "Live Biometric",
      "description": "A biometric captured at the time of credential issuance. Example: 'Face biometric captured on 2023-01-01'.",
      "type": "object",
      "required": ["fullName", "liveBiometricFaceImage"],
      "properties": {
        "fullName": {
          "display": [
            {
              "name": "Full Name",
              "locale": "en-US"
            }
          ],
          "title": "Full Name",
          "description": "Full name of the individual. Example: 'John Doe'.",
          "type": "string",
          "minLength": 1,
          "maxLength": 39
        },
        "liveBiometricFaceImage": {
          "display": [
            {
              "name": "Live Biometric",
              "locale": "en-US"
            }
          ],
          "title": "Live Biometric Face Image",
          "description": "Face image captured at the time of issuance. Example: base64 encoded image data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD",
          "type": "string",
          "format": "textarea"
        },
        "birthdate": {
          "display": [
            {
              "name": "Birthdate",
              "locale": "en-US"
            }
          ],
          "title": "Birthdate",
          "description": "Date of birth of the individual. Example: '1990-01-01'.",
          "type": "string",
          "minLength": 6,
          "maxLength": 18
        }
      }
    }
  }
};

export const corporateSchema = {
  "display": [
    {
      "name": "ACME",
      "locale": "en-US"
    }
  ],
  "type": "object",
  "required": ["employee"],
  "properties": {
    "employee": {
      "display": [
        {
          "name": "Employee",
          "locale": "en-US"
        }
      ],
      "title": "Employee",
      "description": "Details of an individual employed by an organization. Example: 'John Doe, ID: 12345, Company: ACME Corp'.",
      "type": "object",
      "required": [
        "givenName",
        "numberIdentifier",
        "orgIdentifier",
        "orgName",
        "surname",
        "titleName"
      ],
      "properties": {
        "givenName": {
          "display": [
            {
              "name": "Given Name",
              "locale": "en-US"
            }
          ],
          "title": "Given Name",
          "description": "First name of the employee. Example: 'John'.",
          "type": "string",
          "minLength": 1,
          "maxLength": 64
        },
        "numberIdentifier": {
          "display": [
            {
              "name": "ID",
              "locale": "en-US"
            }
          ],
          "title": "Employee ID",
          "description": "Unique employee identifier. Example: 'EMP12345'.",
          "type": "string",
          "maxLength": 35
        },
        "orgIdentifier": {
          "display": [
            {
              "name": "Organization Identifier",
              "locale": "en-US"
            }
          ],
          "title": "Organization ID",
          "description": "Identifier of the organization. Example: 'ACME123'.",
          "type": "string",
          "maxLength": 35
        },
        "orgName": {
          "display": [
            {
              "name": "Organization Name",
              "locale": "en-US"
            }
          ],
          "title": "Organization Name",
          "description": "Name of the employing organization. Example: 'ACME Corp'.",
          "type": "string"
        },
        "surname": {
          "display": [
            {
              "name": "Surname",
              "locale": "en-US"
            }
          ],
          "title": "Surname",
          "description": "Last name of the employee. Example: 'Doe'.",
          "type": "string",
          "minLength": 1,
          "maxLength": 64
        },
        "titleName": {
          "display": [
            {
              "name": "Title",
              "locale": "en-US"
            }
          ],
          "title": "Job Title",
          "description": "Employee's job title. Example: 'Software Engineer'.",
          "type": "string",
          "minLength": 2,
          "maxLength": 88
        }
      }
    }
  }
};

export const orderSchema = {
  "type":"object",
  "required":[
     "order"
  ],
  "properties":{
     "order":{
        "title":"Order",
        "description":"An agreement between two parties regarding services or products. Example: 'Order ID: ORD12345, Name: John Doe'.",
        "type":"object",
        "required":[
           "givenName",
           "orderIdentifier",
           "surname",
           "titleName"
        ],
        "properties":{
           "givenName":{
              "title":"Given Name",
              "description":"First name of the customer. Example: 'John'.",
              "type":"string",
              "minLength":1,
              "maxLength":64
           },
           "orderIdentifier":{
              "title":"Order Identifier",
              "description":"Unique identifier for the order. Example: 'ORD12345'.",
              "type":"string",
              "maxLength":14
           },
           "surname":{
              "title":"Surname",
              "description":"Last name of the customer. Example: 'Doe'.",
              "type":"string",
              "minLength":1,
              "maxLength":64
           },
           "titleName":{
              "title":"Title Name",
              "description":"Title of the customer. Example: 'Mr.'.",
              "type":"string",
              "minLength":2,
              "maxLength":88
           },
           "paxSegments":{
              "title":"Passenger Segments",
              "description":"Segments of a travel order. Example: 'Flight BA123, Seat 12A'.",
              "type":"array",
              "minItems":1,
              "items":{
                 "type":"object",
                 "required":[
                    "destStationIATALocationCode",
                    "flightIdentifierDate",
                    "operatingCarrierAirlineDesigCode",
                    "operatingCarrierFlightNumber",
                    "originStationIATALocationCode",
                    "bookingStatusCode",
                    "scheduledArrivalTime",
                    "scheduledDepartureTime"
                 ],
                 "properties":{
                    "destStationIATALocationCode":{
                       "title":"Destination Station IATA Location Code",
                       "description":"IATA code for the destination station. Example: 'CDG'.",
                       "type":"string",
                       "minLength":3,
                       "maxLength":3
                    },
                    "flightIdentifierDate":{
                       "title":"Flight Identifier Date",
                       "description":"Scheduled departure date. Example: '17.10.2024'.",
                       "type":"string",
                       "format":"date"
                    },
                    "operatingCarrierAirlineDesigCode":{
                       "title":"Operating Carrier Airline Designator Code",
                       "description":"Code for the operating airline. Example: 'BA'.",
                       "type":"string",
                       "pattern":"^[A-Z]{2,3}$"
                    },
                    "operatingCarrierFlightNumber":{
                       "title":"Operating Carrier Flight Number",
                       "description":"Flight number. Example: '123'.",
                       "type":"string",
                       "pattern":"^[0-9]{1,4}$"
                    },
                    "originStationIATALocationCode":{
                       "title":"Origin Station IATA Location Code",
                       "description":"IATA code for the origin station. Example: 'LHR'.",
                       "type":"string",
                       "minLength":3,
                       "maxLength":3
                    },
                    "bookingStatusCode":{
                       "title":"Booking Status Code",
                       "description":"Status of the booking. Example: 'Confirmed'.",
                       "type":"string",
                       "pattern":"^[A-Z][a-z]*(?:-[A-Z][a-z]*)*$"
                    },
                    "scheduledArrivalTime":{
                       "title":"Scheduled Arrival Time",
                       "description":"Time of arrival. Example: '10:30:00'.",
                       "type":"string"
                    },
                    "scheduledDepartureTime":{
                       "title":"Scheduled Departure Time",
                       "description":"Time of departure. Example: '08:00:00'.",
                       "type":"string"
                    }
                 }
              }
           }
        }
     }
  }
};

export const credentialSchemaSample = {
  title: "Credential Form 2",
  type: "object",
  properties: {
    clientId: { type: "string", title: "Client ID" },
    clientSecret: { type: "string", title: "Client Secret" }
  }
};

