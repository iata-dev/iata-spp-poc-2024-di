import { Body, Controller, Delete, Post } from '@nestjs/common';
import { IdpService } from './idp.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/idp')
export class IdpController {
  constructor(private idpService: IdpService) {}

  @Post('register-profile')
  @ApiOperation({
    summary: 'register profile in air-canada IDP',
  })
  async registerIDPEmployee(
    @Body() registerIDPEmployeeDto: any,
  ): Promise<boolean> {
    return await this.idpService.registerIDPEmployee(registerIDPEmployeeDto);
  }

  @Delete('reset')
  @ApiOperation({
    summary: 'Reset air-canada demo',
  })
  async resetDemo() {
    return await this.idpService.resetDemo();
  }
}
