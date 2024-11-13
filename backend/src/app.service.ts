import { Injectable, Get } from '@nestjs/common';

export class AppService {
  @Get()
  getHello(): string {
    return "api"
  }
}
