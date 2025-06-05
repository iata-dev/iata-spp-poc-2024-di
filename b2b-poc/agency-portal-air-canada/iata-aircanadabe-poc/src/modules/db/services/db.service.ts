import { Injectable } from '@nestjs/common';
import { AgencyService } from './entity/agency.service';

@Injectable()
export class DbService {
  constructor(readonly agency: AgencyService) {}
}
