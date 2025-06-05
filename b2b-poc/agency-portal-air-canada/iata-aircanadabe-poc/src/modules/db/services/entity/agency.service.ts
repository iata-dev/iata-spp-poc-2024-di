import { Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgencyEntity } from '../../entities/agency.entity';
import { DeepPartial, Repository } from 'typeorm';

export class AgencyService implements OnModuleInit {
  private readonly logger: Logger = new Logger(AgencyService.name);

  constructor(
    @InjectRepository(AgencyEntity)
    private readonly agencyEntityRepository: Repository<AgencyEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    // register agency
    const agenciesRecords: AgencyEntity[] =
      await this.agencyEntityRepository.find();
    if (agenciesRecords.length === 0) {
      this.logger.debug(`Creating agency record...`);
      await this.registerAgencyRecord({
        agencyName: 'Travel Agency 1',
        agencyAddress: '123 Agency St, Suite 100',
        agencyCity: 'Los Angeles',
        agencyContactNo: '123-456-7890',
        agencyCountry: 'United States',
        agencyState: 'California',
        agencyIATACode: 'LAX',
        agencyPostalCode: '90001',
        agencyIATACodeCountry: 'Toronto',
      });
      this.logger.debug(`Agency record is created...`);
    } else {
      this.logger.log(`Agency record is already stored`);
    }
  }

  async registerAgencyRecord(
    agencyCreateRecord: DeepPartial<AgencyEntity>,
  ): Promise<AgencyEntity> {
    const createAgency: AgencyEntity =
      this.agencyEntityRepository.create(agencyCreateRecord);
    return this.agencyEntityRepository.save(createAgency);
  }

  async findAgencyRecordWithIataCode(
    agencyIATACode: string,
  ): Promise<AgencyEntity> {
    return await this.agencyEntityRepository.findOne({
      where: { agencyIATACode },
    });
  }

  async updateAgency(
    id: number,
    agencyRecordUpdateData: DeepPartial<AgencyEntity>,
  ): Promise<AgencyEntity> {
    await this.agencyEntityRepository
      .createQueryBuilder()
      .update(AgencyEntity)
      .set(agencyRecordUpdateData)
      .where('id = :id', { id })
      .execute();

    // Fetch and return the updated agency record
    return await this.agencyEntityRepository.findOne({
      where: { id },
    });
  }
}
