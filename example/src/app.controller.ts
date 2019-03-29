import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { tracker, getAllRequests } from 'simple-request-tracker';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@tracker() trackReq): string {
    return this.appService.getHello();
  }


  @Get('/allRequest')
  async getAllRequestsTracked(): Promise<any>{
    return await getAllRequests();
  }
}
