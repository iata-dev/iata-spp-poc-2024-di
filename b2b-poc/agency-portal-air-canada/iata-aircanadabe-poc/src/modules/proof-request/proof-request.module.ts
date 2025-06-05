import { Module } from '@nestjs/common';
import { ProofRequestController } from './proof-request.controller';
import { ProofRequestService } from './proof-request.service';
import { ProofRequestUtils } from './utils/proof-request.utils';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ProofRequestController],
  providers: [ProofRequestService, ProofRequestUtils],
})
export class ProofRequestModule {}
