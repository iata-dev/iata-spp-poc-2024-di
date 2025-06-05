import { Controller, Post } from '@nestjs/common';
import { ProofRequestService } from './proof-request.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  InternalServerErrorResponse,
} from '../../common/error.response';
import { ProofRequestResponseDto } from './dto/proof-request.dto';

@Controller('api/proof-request')
@ApiTags('proof-request')
@ApiInternalServerErrorResponse({
  type: InternalServerErrorResponse,
  description:
    'The server encountered an unexpected condition that prevented it from fulfilling the request',
})
@ApiBadRequestResponse({
  type: BadRequestResponse,
  description: 'A required parameter was missing in the request',
})
export class ProofRequestController {
  constructor(private proofRequestService: ProofRequestService) {}

  @Post()
  @ApiOperation({
    summary:
      'This API will return Travel agency employee RP url for SD-JWT Credential',
  })
  @ApiOkResponse({
    type: ProofRequestResponseDto,
  })
  async requestTravelAgencyProofUrl(): Promise<ProofRequestResponseDto> {
    return await this.proofRequestService.requestTravelAgencyProofUrl();
  }
}
