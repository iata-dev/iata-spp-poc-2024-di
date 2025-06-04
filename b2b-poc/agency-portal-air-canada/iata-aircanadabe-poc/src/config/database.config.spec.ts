import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './database.configurations';

describe('TypeOrmConfigService', () => {
  let typeOrmConfigService: TypeOrmConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(), // Mock the get method of ConfigService
          },
        },
      ],
    }).compile();

    typeOrmConfigService =
      module.get<TypeOrmConfigService>(TypeOrmConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should return the correct TypeORM options when environment variables are set', async () => {
    // Mocking ConfigService to return values for each environment variable
    jest.spyOn(configService, 'get').mockImplementation((key: string) => {
      const config = {
        POSTGRES_HOST: 'localhost',
        POSTGRES_PORT: 5432,
        POSTGRES_USERNAME: 'postgres',
        POSTGRES_PASSWORD: 'postgres',
        POSTGRES_DATABASE: 'test_db',
      };
      return config[key];
    });

    // Calling the method to test
    const options = await typeOrmConfigService.createTypeOrmOptions();

    // Verifying the returned options
    expect(options).toMatchObject({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test_db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    });
  });

  it('should use default values when environment variables are not set', async () => {
    // Mocking ConfigService to return undefined (not set) for each environment variable
    jest.spyOn(configService, 'get').mockImplementation(() => undefined);

    // Calling the method to test
    const options = await typeOrmConfigService.createTypeOrmOptions();

    // Verifying that default values are used for missing environment variables
    expect(options).toMatchObject({
      type: 'postgres',
      host: 'localhost', // Default to 'localhost' if not set
      port: 5432, // Default to 5432 if not set
      username: 'postgres', // Default to 'postgres' if not set
      password: 'postgres', // Default to 'postgres' if not set
      database: undefined, // No default for POSTGRES_DATABASE
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    });
  });
});
