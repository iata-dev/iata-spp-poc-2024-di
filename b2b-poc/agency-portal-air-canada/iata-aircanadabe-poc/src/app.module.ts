import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/db/health/health.module';
import { DbModule } from './modules/db/db.module';
import { SharedModule } from './modules/shared/shared.module';
import { ProofRequestModule } from './modules/proof-request/proof-request.module';
import { AuthModule } from './modules/auth/auth.module';
import { IdpModule } from './modules/idp/idp.module';
import { AgencyModule } from './modules/agency/agency.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    HealthModule,
    DbModule,
    SharedModule,
    ProofRequestModule,
    AuthModule,
    IdpModule,
    AgencyModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
