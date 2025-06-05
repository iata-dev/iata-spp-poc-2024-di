import { Module } from '@nestjs/common';
import { AuthUtils } from './utils/auth.utils';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '../shared/shared.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [SharedModule, DbModule],
  controllers: [AuthController],
  providers: [AuthUtils, AuthService],
})
export class AuthModule {}
