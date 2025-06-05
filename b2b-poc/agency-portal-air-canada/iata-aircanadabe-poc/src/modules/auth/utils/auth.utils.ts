import { Injectable, Logger } from '@nestjs/common';
import { SharedService } from '../../shared/shared.service';
import { ConfigService } from '@nestjs/config';
import { IRPAuthRequestResponse, ITREntityRecord } from '../model/auth.model';

@Injectable()
export class AuthUtils {
  private logger: Logger = new Logger(AuthUtils.name);

  constructor(
    private readonly sharedService: SharedService,
    private configService: ConfigService,
  ) {}

  async retrieveRPStatusWithEAPI(
    credProofId: string,
  ): Promise<IRPAuthRequestResponse> {
    try {
      const apiURL: string = `${this.configService.get<string>('ENTERPRISE_VERIFIER_API_URL')}/api/lob/${this.configService.get<string>('ENTERPRISE_VERIFIER_API_LOB_ID')}/proof-request/${credProofId}`;
      const apiKey: string = this.configService.get<string>(
        'ENTERPRISE_API_API_KEY',
      );
      return await this.sharedService.getApiCall(apiURL, {
        headers: {
          'api-key': apiKey,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async checkAgencyIsRegisterInTr(entityDid: string): Promise<ITREntityRecord> {
    const apiURL: string = `${this.configService.get('IATA_TR_BASE_URL')}/entities/${entityDid}`;
    const trAPIKey: string = this.configService.get<string>('IATA_TR_API_KEY');
    return await this.sharedService.getApiCall(apiURL, {
      headers: {
        'api-key': trAPIKey,
      },
    });
  }

  async registerAgencyInIDP(attributes: any): Promise<unknown> {
    this.logger.log(
      `registering the employee details in IDP: ${JSON.stringify(attributes)}`,
    );
    const registerUserPayload = {
      username: attributes.givenName,
      email: attributes.email,
      type: 'internal',
      enabled: 'true',
      custom: {
        attributes: {
          ...attributes,
        },
      },
    };
    const apiURL = `${this.configService.get<string>('AIRCANADA_IDP_BASE_URL')}/${this.configService.get('AIRCANADA_REALM_ID')}/users`;
    return this.sharedService.postApiCall(apiURL, registerUserPayload);
  }
}
