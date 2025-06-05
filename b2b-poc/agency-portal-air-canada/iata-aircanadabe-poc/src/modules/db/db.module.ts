import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { DbService } from './services/db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../config/database.configurations';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AgencyService } from './services/entity/agency.service';
import { AgencyEntity } from './entities/agency.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([AgencyEntity]),
  ],
  providers: [DbService, AgencyService],
  exports: [DbService, AgencyService],
})
export class DbModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  private readonly logger = new Logger(DbModule.name);

  async onModuleInit(): Promise<void> {
    try {
      await Promise.all([this.runMigration()]);
    } catch (error) {
      this.logger.error(
        `Error executing default data script: ${JSON.stringify(error)}`,
      );
    }
  }

  private async runMigration(): Promise<void> {
    try {
      if (this.configService.get<string>('ROLLBACK_DATABASE') === 'true') {
        this.logger.log('Reverting last migrations...');
        this.dataSource.undoLastMigration();
      } else {
        this.logger.log('Running Migrations...');
        await this.dataSource.runMigrations({
          transaction: 'each',
        });
      }
    } catch (error) {
      this.logger.error(
        `Error running migrations: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
