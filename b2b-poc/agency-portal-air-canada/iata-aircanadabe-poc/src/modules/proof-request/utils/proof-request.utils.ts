import { Injectable } from '@nestjs/common';
import { SharedService } from '../../shared/shared.service';
import { ConfigService } from '@nestjs/config';
import { IProofRequestPayload } from '../model/proof-request.model';
import { ProofRequestResponseDto } from '../dto/proof-request.dto';

@Injectable()
export class ProofRequestUtils {
  constructor(
    private readonly sharedService: SharedService,
    private readonly configService: ConfigService,
  ) {}

  // request proof url
  async requestSDJWTRPUrl(): Promise<ProofRequestResponseDto> {
    const apiURL: string = `${this.configService.get<string>(
      'ENTERPRISE_VERIFIER_API_URL',
    )}/api/lob/${this.configService.get<string>('ENTERPRISE_VERIFIER_API_LOB_ID')}/proof/url`;
    const apiKey: string = this.configService.get<string>(
      'ENTERPRISE_API_API_KEY',
    );
    const proofRequestPayload: IProofRequestPayload = {
      proofDefineId: +this.configService.get<string>(
        'ENTERPRISE_PROOF_REQUEST_ID',
      ),
      messageProtocol: 'OID4VC',
    };
    return await this.sharedService.postApiCall(apiURL, proofRequestPayload, {
      headers: {
        'api-key': apiKey,
      },
    });
  }
}
