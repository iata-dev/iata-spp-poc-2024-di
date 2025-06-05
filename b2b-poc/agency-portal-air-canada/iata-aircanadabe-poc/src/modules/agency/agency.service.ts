import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/services/db.service';
import { ConfigService } from '@nestjs/config';
import { AgencyEntity } from '../db/entities/agency.entity';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Injectable()
export class AgencyService {
  private logger: Logger = new Logger(AgencyService.name);
  private iataCode: string = this.configService.get<string>(
    'TRAVEL_AGENCY1_IATA_CODE',
  );

  constructor(
    private readonly dbService: DbService,
    private readonly configService: ConfigService,
  ) {}

  async findOne(): Promise<boolean> {
    const getAgencyRecord: AgencyEntity = await this.getAgencyDetails();
    return getAgencyRecord.isAgencyRegistered;
  }

  async update(agencyDto: UpdateAgencyDto): Promise<boolean> {
    const getAgencyRecord: AgencyEntity = await this.getAgencyDetails();
    const updateAgency: AgencyEntity = await this.dbService.agency.updateAgency(
      getAgencyRecord.id,
      {
        isAgencyRegistered: agencyDto.isAgencyRegistered,
      },
    );
    return updateAgency.isAgencyRegistered;
  }

  private async getAgencyDetails(): Promise<AgencyEntity> {
    const getAgencyRecord: AgencyEntity =
      await this.dbService.agency.findAgencyRecordWithIataCode(this.iataCode);
    if (!getAgencyRecord) {
      this.logger.error(`agency not found: ${this.iataCode}`);
      throw new NotFoundException('agency not found');
    }
    return getAgencyRecord;
  }
}
