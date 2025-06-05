import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AppController', () => {
  let controller: AppController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    controller = module.get<AppController>(AppController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should log and redirect to "api/docs"', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(302)
      .expect('Location', 'api/docs');
  });

  afterAll(async () => {
    await app.close();
  });
});
