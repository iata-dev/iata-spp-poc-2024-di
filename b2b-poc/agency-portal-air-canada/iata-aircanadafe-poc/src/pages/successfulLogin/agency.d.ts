// agency.d.ts

export interface RegisterAgencyDto {
  id: number; // Unique identifier for the agency
  fullName: string; // Full name of the agency representative (optional)
  contactNo: string; // Contact number of the agency
  email: string; // Email address of the agency
  notificationLanguage: string; // Preferred language for notifications
  agencyName: string; // The name of the agency
  agencyContactNo: string; // Contact number of the agency itself
  agencyAddress: string; // Physical address of the agency
  agencyCountry: string; // Country where the agency is located
  agencyState: string; // State where the agency is located
  agencyCity: string; // City where the agency is located
  agencyPostalCode: string; // Postal code of the agency location
  agencyIATACode: string; // IATA code for the agency
  agencyIATACodeCountry: string; // IATA code country
  agencyDid: string; // Decentralized Identifier (DID) associated with the agency
  trTrustURL: string; // Trust Registry URL
  trAPIKey: string; // Trust Registry API Key
  createdAt: string; // The creation timestamp of the property credential
  updatedAt: string; // The last update timestamp of the property credential
}

export const RegisterAgencyDtoSchema: RegisterAgencyDto = {
  id: 1,
  fullName: "John Doe",
  contactNo: "123-456-7890",
  email: "agency@example.com",
  notificationLanguage: "en",
  agencyName: "Explorer s Voyage",
  agencyContactNo: "987-654-3210",
  agencyAddress: "123 Agency St, Suite 100",
  agencyCountry: "United States",
  agencyState: "California",
  agencyCity: "Los Angeles",
  agencyPostalCode: "90001",
  agencyIATACode: "LAX",
  agencyIATACodeCountry: "Toronto",
  agencyDid: "did:web:johndoe.io",
  trTrustURL: "https://john.trustregistry.io",
  trAPIKey: "ghrdhfghn-sdhrdfh=dfghdfhdfhre",
  createdAt: "2024-12-03T11:05:02.540Z",
  updatedAt: "2024-12-03T11:05:02.540Z",
};
