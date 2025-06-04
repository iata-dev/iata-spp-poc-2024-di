export interface AgencyEntity {
  id: number; // Unique identifier for the agency
  fullName: string; // Full name of the agency representative
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
  status: string; // Status of the agency
  trAPIKey: string; // Trust Registry API Key
  createdAt: string; // Creation timestamp of the property credential
  updatedAt: string; // Last update timestamp of the property credential
}
