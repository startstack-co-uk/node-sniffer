import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { tracker, getAllRequests, getDbAnalytics } from 'simple-request-tracker';

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


  @Get('/dbStats')
  async getDatabaseStats(): Promise<{result:{totalRows: number, tracked: number, tableSize: number, dbSize: number}}>{
    return await getDbAnalytics();
  }

}
