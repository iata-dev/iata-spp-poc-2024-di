export interface IRequestQRResponse {
  success: true;
  message: string;
  data: {
    longUrl: string;
    shortUrl: string;
    proofDefineId: number;
    credProofId: string;
  };
}

export enum IRPVerificationDisplayStatus {
  GENERATED = "generated",
  SCANNED = "scanned",
  REQUEST_SENT = "request-sent",
  PROOF_RECEIVED = "proof-received",
  SUCCESS = "success",
  REVOKED = "revoked",
  VERIFICATION_FAILED = "verification-failed",
  SENT = "sent",
}

export interface IAgencyResponse {
  success: boolean;
  message: string;
  data: {
    state: IRPVerificationDisplayStatus;
    verified: boolean;
    rpValue?: any;
    agencyRecord?: any;
  };
}
