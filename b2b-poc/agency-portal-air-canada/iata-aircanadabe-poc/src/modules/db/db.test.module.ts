import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { DbService } from './services/db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmTestConfigService } from '../../config/database.configurations.test';
import { AgencyEntity } from './entities/agency.entity';
import { AgencyService } from './services/entity/agency.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmTestConfigService,
    }),
    TypeOrmModule.forFeature([AgencyEntity]),
  ],
  providers: [DbService, AgencyService],
  exports: [DbService],
})
export class DbTestingModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  private readonly logger = new Logger(DbTestingModule.name);

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
