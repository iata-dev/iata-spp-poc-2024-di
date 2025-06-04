import { Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AgencyController],
  providers: [AgencyService],
})
export class AgencyModule {}
