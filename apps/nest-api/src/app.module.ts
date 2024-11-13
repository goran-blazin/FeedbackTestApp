import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FeedbackModule } from './feedback/feedback.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule, FeedbackModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
