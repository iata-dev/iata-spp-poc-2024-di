import { Controller, Get, Logger, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}
  private readonly logger = new Logger(AppController.name);
  @Get()
  @ApiExcludeEndpoint()
  @Redirect('api/docs')
  redirect() {
    this.logger.log('Api Docs Opend');
  }
}
