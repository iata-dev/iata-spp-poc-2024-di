import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  InternalServerErrorResponse,
  UnAuthorizedResponse,
} from '../../common/error.response';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth.dto';
import { IRPStatusEnum } from '../../common/enum';

@Controller('api/auth')
@ApiTags('rp-auth-status')
@ApiInternalServerErrorResponse({
  type: InternalServerErrorResponse,
  description:
    'The server encountered an unexpected condition that prevented it from fulfilling the request',
})
@ApiUnauthorizedResponse({
  type: UnAuthorizedResponse,
  description: 'A required parameter was missing in the request',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('agencies/:cred_proof_id')
  @ApiParam({
    type: 'string',
    example: '12434560-34534-235',
    name: 'cred_proof_id',
  })
  @ApiOperation({
    summary:
      'This API is used to retrieve the status of a proof-request validation for agency registration time.',
  })
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  async authAgenciesRequestStatus(
    @Param('cred_proof_id') credProofId: string,
  ): Promise<AuthResponseDto> {
    /**
     * Validate check need to apply as below
     *
     * Verify that the travel agency is registered as a member in the TR (Trust Registry).
     *
     * Check if the travel agency is registered in the AirCanada database using the issuer DID (Decentralized Identifier) Verify (Match IATA code).
     *
     * final step: register the travel agency in keycloak idp
     */
    return await this.authService.authAgenciesRequestStatus(
      credProofId,
      IRPStatusEnum.AGENCY_LOGIN,
    );
  }

  @Get('agencies/employee/:cred_proof_id')
  @ApiParam({
    type: 'string',
    example: '12434560-34534-235',
    name: 'cred_proof_id',
  })
  @ApiOperation({
    summary:
      'This API is used to retrieve the status of a proof-request validation for agency employee registration time.',
  })
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  async authAgenciesEmployeeRequestStatus(
    @Param('cred_proof_id') credProofId: string,
  ): Promise<AuthResponseDto> {
    /**
     * Validate check need to apply as below
     *
     * Verify that the travel agency is registered as a member in the TR (Trust Registry).
     *
     * Check if the travel agency is registered in the AirCanada database using the issuer DID (Decentralized Identifier) Verify (Match IATA code).
     *
     * final step: register the travel agency in keycloak idp
     */
    return await this.authService.authAgenciesRequestStatus(
      credProofId,
      IRPStatusEnum.AGENCY_EMPLOYEE,
    );
  }
}
