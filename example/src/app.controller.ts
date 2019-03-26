import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { tracker, getAllRequests, getRequestsPerMethod, getRequestsPerPath, getTotalPerPathMethodCombo } from 'simple-request-tracker';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@tracker() track): Promise<string> {
    return this.appService.getHello();
  }

  @Post()
  async isAbsolute(){
    return 1;
  }


  @Get('/totalTrack')
  async getTotal(){
    return await getAllRequests();
  }


  @Get('/perMethod')
  async getTotalPerMethod(){
    return await getRequestsPerMethod();
  }


  @Get('/perPath')
  async getTotalPerPath(){
    return await getRequestsPerPath();
  }


  @Get('/perPathMethodCombo')
  async getTotalPerPathMethodCombo(@Query('path') path: string, @Query('method') method: string){
    return await getTotalPerPathMethodCombo(path, method);
  }
}
