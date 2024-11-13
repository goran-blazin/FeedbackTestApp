import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  info(): string {
    return 'FeedbackAPI for Marker.io';
  }
}
