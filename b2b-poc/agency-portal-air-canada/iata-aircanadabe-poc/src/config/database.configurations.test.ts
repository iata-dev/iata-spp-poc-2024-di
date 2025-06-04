import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmTestConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'better-sqlite3',
      database: ':memory:',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../modules/db/migrations/*{.ts,.js}'],
      synchronize: true,
      parseBinaryUUIDAsString: false,
      parseArray: false,
      logging: ['error'],
      autoLoadEntities: true,
    } as TypeOrmModuleOptions;
  }
}
