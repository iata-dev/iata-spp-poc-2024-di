import { Injectable, Logger } from '@nestjs/common';
import { ProofRequestUtils } from './utils/proof-request.utils';
import { ProofRequestResponseDto } from './dto/proof-request.dto';

@Injectable()
export class ProofRequestService {
  private logger: Logger = new Logger(ProofRequestService.name);

  constructor(private readonly proofRequestUtils: ProofRequestUtils) {}

  async requestTravelAgencyProofUrl(): Promise<ProofRequestResponseDto> {
    try {
      return await this.proofRequestUtils.requestSDJWTRPUrl();
    } catch (e) {
      this.logger.error(
        `Error on creating a travel agency proof request URL: ${JSON.stringify(e)}`,
      );
      throw new Error(e);
    }
  }
}
