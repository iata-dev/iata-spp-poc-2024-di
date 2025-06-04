import {
  IRPVerificationDisplayStatus,
  TRVerificationStatus,
} from '../../../common/enum';

interface IAuthRPVerifyDataResponse {
  status: IRPVerificationDisplayStatus;
  data: {
    credProofId: string;
    proofAutoVerify: boolean;
    updatedAt: string;
    createdAt: string;
    issuerDid: string[];
    proofStatus: TRVerificationStatus.TR_TRUSTED;
    verified: boolean;
  };
  proofAttributes: {
    [key: string]: {
      credentialName: string;
      attribute: Array<{
        [key: string]: string;
      }>;
    };
    [];
  };
}

export interface IRPAuthRequestResponse {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: IAuthRPVerifyDataResponse;
}

interface ParticipatingNamespace {
  identifier: string;
  canonicalString: string;
  egfURI: string | null;
  description: string;
}

interface EntityDataValidity {
  validFromDT: string;
  validUntilDT: string;
}

interface RegistrationStatus {
  status: string;
  detail: string;
}

interface Identifier {
  dids: string;
  website: string;
}

interface IataDetails {
  iataCode: string;
}

interface MemberDetails {
  logo: string;
  legalName: string;
  displayName: string;
}

interface AboutMember {
  identifier: Identifier;
  iataDetails: IataDetails;
  memberDetails: MemberDetails;
}

export interface ITREntityRecord {
  entityVID: string;
  entityName: string;
  governanceFrameworkVID: string;
  participatingNamespaces: ParticipatingNamespace[];
  entityDataValidity: EntityDataValidity;
  registrationStatus: RegistrationStatus;
  aboutMember: AboutMember;
}
