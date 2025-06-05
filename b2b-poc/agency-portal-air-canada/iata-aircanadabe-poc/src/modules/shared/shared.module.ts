import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
