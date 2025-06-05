import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { DbTestingModule } from '../../db/db.test.module';
import { SharedModule } from '../shared.module';
import { SharedService } from '../shared.service';
import { SharedStubService } from './shared.stub.service';

const mockHttpService = {
  get: jest.fn(),
  post: jest.fn(),
};

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(async () => {
    // Mock SharedService
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DbTestingModule, SharedModule],
      providers: [
        { provide: SharedService, useClass: SharedStubService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<SharedService>(SharedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
