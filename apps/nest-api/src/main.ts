import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(
    `Started listening FeedbackAPI Nest app on port ${port}`,
    'MainBootstrapFunction',
  );
}
bootstrap();
