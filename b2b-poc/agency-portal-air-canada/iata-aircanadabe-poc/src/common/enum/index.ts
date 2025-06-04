export enum TRVerificationStatus {
  VERIFIED = 'verified',
  TRUSTED = 'trusted',
  TR_TRUSTED = 'verified_trusted',
  TR_UNTRUSTED = 'verified_untrusted',
}

export enum IRPVerificationDisplayStatus {
  GENERATED = 'generated',
  SCANNED = 'scanned',
  REQUEST_SENT = 'request-sent',
  PROOF_RECEIVED = 'proof-received',
  SUCCESS = 'success',
  REVOKED = 'revoked',
  VERIFICATION_FAILED = 'verification-failed',
}

export enum IRPStatusEnum {
  AGENCY_LOGIN = 'AGENCY_LOGIN',
  AGENCY_EMPLOYEE = 'AGENCY_EMPLOYEE',
}
