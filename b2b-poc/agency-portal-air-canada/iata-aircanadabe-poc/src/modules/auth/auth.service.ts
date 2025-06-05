import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthUtils } from './utils/auth.utils';
import { IRPAuthRequestResponse, ITREntityRecord } from './model/auth.model';
import { IRPStatusEnum, TRVerificationStatus } from '../../common/enum';
import { DbService } from '../db/services/db.service';
import { AgencyEntity } from '../db/entities/agency.entity';
import { AuthResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly authUtils: AuthUtils,
    private readonly dbService: DbService,
  ) {}

  async authAgenciesRequestStatus(
    credProofId: string,
    statusType: IRPStatusEnum,
  ): Promise<AuthResponseDto> {
    try {
      this.logger.debug(
        `Retrieving proof request status for agency login with credProofId: ${credProofId} and API call for ${statusType}`,
      );

      const retrieveProofRequestStatus: IRPAuthRequestResponse =
        await this.authUtils.retrieveRPStatusWithEAPI(credProofId);
      if (retrieveProofRequestStatus.statusCode === 400) {
        throw new UnauthorizedException(
          'Access denied, Please contact your agency admin',
        );
      }
      const { message, data } = retrieveProofRequestStatus;

      if (data.status !== 'success') {
        return this.handleRequestStatusFailure(message, data);
      }

      // Check if RP is verified
      if (
        !data.data.verified ||
        data.data.proofStatus !== TRVerificationStatus.TR_TRUSTED
      ) {
        this.logger.error(
          'Proof request is not verified or trust status is not valid',
        );
        throw new UnauthorizedException(
          'Access denied, Please contact your agency admin',
        );
      }

      // Check if Agency is registered in TR
      const agencyEntity: ITREntityRecord =
        await this.checkAgencyRegistrationInTR(data.data.issuerDid[0]);
      if (!agencyEntity) {
        throw new UnauthorizedException(
          'Access denied, Please contact your agency admin',
        );
      }

      // Validate the IATA Code against Air Canada DB
      const agencyRecord: AgencyEntity =
        await this.validateAgencyWithAirCanadaDb(
          agencyEntity.aboutMember?.iataDetails?.iataCode,
        );
      if (!agencyRecord) {
        throw new UnauthorizedException(
          'Access denied, Please contact your agency admin',
        );
      }

      const formatedAttributes = this.restructureData(
        Object.values(data.proofAttributes)[0][0].attribute,
      );

      if (statusType === IRPStatusEnum.AGENCY_LOGIN) {
        const registerAgencyInIDP =
          await this.authUtils.registerAgencyInIDP(formatedAttributes);
        // stored employee as register in agency
        if (agencyRecord.agencyEmployeeIdpId.length > 0) {
          agencyRecord.agencyEmployeeIdpId.push(formatedAttributes.email);
        } else {
          agencyRecord.agencyEmployeeIdpId = [formatedAttributes.email];
        }
        await this.dbService.agency.updateAgency(agencyRecord.id, agencyRecord);
        this.logger.log(
          `Agency register in keycloak IDP: ${JSON.stringify(registerAgencyInIDP)}`,
        );
      } else {
        // validate check for employee login without register agency
        if (!agencyRecord.isAgencyRegistered) {
          throw new UnauthorizedException(
            'Access denied, Please contact your agency admin',
          );
        }
      }
      // Return success response
      return {
        success: true,
        message,
        data: {
          state: data.status,
          verified: data.data.verified,
          rpValue: formatedAttributes,
          agencyRecord: agencyRecord,
        },
      };
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException(
        'Access denied, Please contact your agency admin',
      );
    }
  }

  // Private method block
  private handleRequestStatusFailure(message: string, data: any) {
    this.logger.warn(`Proof request failed: ${message}`);
    return {
      success: true,
      message,
      data: {
        state: data.status,
        verified: data.data.verified,
      },
    };
  }

  private async checkAgencyRegistrationInTR(
    issuerDid: string,
  ): Promise<ITREntityRecord | null> {
    this.logger.debug(
      `Checking if agency is registered in TR with DID: ${issuerDid}`,
    );
    const isAgencyRegistered: ITREntityRecord =
      await this.authUtils.checkAgencyIsRegisterInTr(issuerDid);
    if (
      !isAgencyRegistered ||
      !isAgencyRegistered?.aboutMember?.iataDetails?.iataCode
    ) {
      this.logger.error('No entity record found for agency in TR');
      return null;
    }
    return isAgencyRegistered;
  }

  private async validateAgencyWithAirCanadaDb(
    iataCode: string,
  ): Promise<AgencyEntity | null> {
    if (!iataCode) {
      this.logger.error('IATA Code is missing');
      return null;
    }

    this.logger.debug(
      `Checking if agency exists in Air Canada DB with IATA Code: ${iataCode}`,
    );
    const agencyRecord: AgencyEntity =
      await this.dbService.agency.findAgencyRecordWithIataCode(iataCode);
    if (!agencyRecord) {
      this.logger.error(
        `Agency with IATA Code ${iataCode} not found in Air Canada DB`,
      );
      return null;
    }
    return agencyRecord;
  }

  private restructureData(input: { [key: string]: any }) {
    const output: any = {};
    input.forEach((element: any): void => {
      const key: string = Object.keys(element)[0];
      const value: any = element[key];
      const keys: string[] = key.split('.');
      let temp = output;
      keys.forEach((k: string, i: number): void => {
        if (i === keys.length - 1) {
          temp[k] = value;
          if (!temp[k]) {
            temp[k] = {};
          }
          temp = temp[k];
        }
      });
    });
    return output;
  }
}
