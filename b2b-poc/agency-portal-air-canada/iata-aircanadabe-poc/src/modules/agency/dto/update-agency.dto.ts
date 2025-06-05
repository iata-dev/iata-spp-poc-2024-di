import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateAgencyDto {
  @ApiProperty({
    type: 'boolean',
    default: false,
    required: true,
  })
  @IsBoolean()
  isAgencyRegistered: boolean;
}
