import { Injectable, Logger } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { ConfigService } from '@nestjs/config';
import { DbService } from '../db/services/db.service';
import { AgencyEntity } from '../db/entities/agency.entity';

@Injectable()
export class IdpService {
  private logger: Logger = new Logger(IdpService.name);

  constructor(
    private readonly sharedService: SharedService,
    private readonly configService: ConfigService,
    private readonly dbService: DbService,
  ) {}

  async registerIDPEmployee(registerIDPEmployeeDto: any): Promise<boolean> {
    try {
      this.logger.log(
        `register employee in IDP: ${JSON.stringify(registerIDPEmployeeDto)}`,
      );
      console.log(registerIDPEmployeeDto.employeeID);
      const findAgencyRecord: AgencyEntity =
        await this.dbService.agency.findAgencyRecordWithIataCode(
          this.configService.get<string>('TRAVEL_AGENCY1_IATA_CODE'),
        );
      const apiURL: string = `${this.configService.get<string>(
        'AIRCANADA_IDP_BASE_URL',
      )}/${this.configService.get('AIRCANADA_REALM_ID')}/users`;
      const registerUserPayload = {
        username: registerIDPEmployeeDto.givenName,
        email: registerIDPEmployeeDto.email,
        type: 'internal',
        enabled: 'true',
        custom: {
          attributes: {
            ...registerIDPEmployeeDto,
          },
        },
      };
      await this.sharedService.postApiCall(apiURL, registerUserPayload);
      if (findAgencyRecord.agencyEmployeeIdpId.length > 0) {
        findAgencyRecord.agencyEmployeeIdpId.push(registerIDPEmployeeDto.email);
      } else {
        findAgencyRecord.agencyEmployeeIdpId = [registerIDPEmployeeDto.email];
      }
      console.log(`update db record ${JSON.stringify(findAgencyRecord)}`);
      await this.dbService.agency.updateAgency(
        findAgencyRecord.id,
        findAgencyRecord,
      );
      return true;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async resetDemo() {
    try {
      this.logger.log(`resetting air canada demo`);
      const findAgencyRecord: AgencyEntity =
        await this.dbService.agency.findAgencyRecordWithIataCode(
          this.configService.get<string>('TRAVEL_AGENCY1_IATA_CODE'),
        );
      const apiURL: string = `${this.configService.get<string>(
        'AIRCANADA_IDP_BASE_URL',
      )}/${this.configService.get('AIRCANADA_REALM_ID')}/users`;
      const registerAgencyEmployeeRecordInIDP: any =
        await this.sharedService.getApiCall(apiURL);
      if (registerAgencyEmployeeRecordInIDP.users.length) {
        await Promise.all(
          registerAgencyEmployeeRecordInIDP.users.map(
            async (registeredUser: any): Promise<void> => {
              await this.sharedService.deleteApiCall(
                `${apiURL}/${registeredUser.id}`,
              );
            },
          ),
        );
      }
      findAgencyRecord.agencyEmployeeIdpId = [];
      findAgencyRecord.isAgencyRegistered = false;
      console.log(`update db record ${JSON.stringify(findAgencyRecord)}`);
      await this.dbService.agency.updateAgency(
        findAgencyRecord.id,
        findAgencyRecord,
      );
      return true;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
