import { ApiProperty } from '@nestjs/swagger';

class ProofRequestResponse {
  @ApiProperty({
    example:
      'openid4vp://?request_uri=https%3A%2F%2Faircanada.iata-poc.nborbit.ca%2Fsiop%2Fdefinitions%2Fagency_employee_vc_uri%2Fauth-requests%2Fa1be5f6e-d88a-4540-8c19-2804e27bd9',
    required: true,
    type: 'string',
  })
  longUrl: string;

  @ApiProperty({
    example:
      'https://ac637oba22.execute-api.ca-central-1.amazonaws.com/dev/verifier/url/a1be5f6e-d88a-4540-8c19-2804e27bd9be',
    required: true,
    type: 'string',
  })
  shortUrl: string;

  @ApiProperty({
    example: 1,
    required: true,
    type: 'number',
  })
  proofDefineId: number;

  @ApiProperty({
    example: '06004169-62da-44e8-8c6d-97159ff15c07',
    required: true,
    type: 'string',
  })
  credProofId: string;
}

export class ProofRequestResponseDto {
  @ApiProperty({
    example: true,
    required: true,
    type: 'boolean',
  })
  success: true;
  @ApiProperty({
    example: 'prepare qr proof request proceed successfully.',
    required: true,
    type: 'string',
  })
  message: string;

  @ApiProperty({
    type: ProofRequestResponse,
    required: true,
  })
  data: ProofRequestResponse;
}
