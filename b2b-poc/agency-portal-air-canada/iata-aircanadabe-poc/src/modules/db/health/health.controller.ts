import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'this api check application running health' })
  @HealthCheck()
  selfCheck() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'iata',
          this.configService.get<string>('APPLICATION_URL'),
        ),
    ]);
  }
}
