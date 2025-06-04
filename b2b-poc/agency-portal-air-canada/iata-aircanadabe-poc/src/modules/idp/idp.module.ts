import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { IdpController } from './idp.controller';
import { IdpService } from './idp.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [DbModule, SharedModule],
  controllers: [IdpController],
  providers: [IdpService],
})
export class IdpModule {}
