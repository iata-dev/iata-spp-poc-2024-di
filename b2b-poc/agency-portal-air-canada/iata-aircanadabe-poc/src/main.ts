import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/errors.filter';
import { ResponseTimeInterceptor } from './common/interceptors/response-time.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger('bootstrap');
  app.enableCors({
    origin: '*', // or specify the frontend's origin
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseTimeInterceptor());

  const applicationPort =
    +configService.get<string>('APPLICATION_PORT') || 5012;
  const config = new DocumentBuilder()
    .setTitle('AIRCANADA API')
    .setDescription('AIRCANADA PoC API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec-aircanada.json', JSON.stringify(document));
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });
  await app.listen(applicationPort);
  logger.debug(
    `AIRCANADA BE Application running on ${configService.get<string>('APPLICATION_URL')}`,
  );
}
bootstrap();
