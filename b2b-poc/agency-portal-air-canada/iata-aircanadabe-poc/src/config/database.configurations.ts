import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get<string>('POSTGRES_HOST') || 'localhost',
      port: this.configService.get<string>('POSTGRES_PORT') || 5432,
      username:
        this.configService.get<string>('POSTGRES_USERNAME') || 'postgres',
      password:
        this.configService.get<string>('POSTGRES_PASSWORD') || 'postgres',
      database: this.configService.get<string>('POSTGRES_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../modules/db/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: false,
    } as TypeOrmModuleOptions;
  }
}
