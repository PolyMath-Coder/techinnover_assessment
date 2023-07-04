import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { status: true, message: 'Welcome to techinnover server...' };
  }
}
