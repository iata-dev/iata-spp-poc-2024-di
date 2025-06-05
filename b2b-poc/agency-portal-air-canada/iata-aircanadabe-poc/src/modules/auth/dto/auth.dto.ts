import { ApiProperty } from '@nestjs/swagger';
import { IRPVerificationDisplayStatus } from '../../../common/enum';

class AuthResponseData {
  @ApiProperty({
    example: IRPVerificationDisplayStatus.SUCCESS,
    enum: IRPVerificationDisplayStatus,
    required: true,
  })
  state: IRPVerificationDisplayStatus;

  @ApiProperty({
    type: 'boolean',
    example: true,
    required: true,
  })
  verified: boolean;

  @ApiProperty({
    example: true,
    required: false,
  })
  rpValue?: object;

  @ApiProperty({
    example: true,
    required: false,
  })
  agencyRecord?: object;
}

export class AuthResponseDto {
  @ApiProperty({
    type: 'boolean',
    example: true,
    required: true,
  })
  success: boolean;

  @ApiProperty({
    type: 'string',
    example: 'Proof request status retrieved successfully.',
    required: true,
  })
  message: string;

  @ApiProperty({
    type: AuthResponseData,
    required: true,
  })
  data: AuthResponseData;
}
