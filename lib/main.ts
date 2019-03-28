import { createParamDecorator} from '@nestjs/common';
import { track, RequestSchema, init, getTotal, getTotalPerMethod, getTotalPerPath, getTotalPerCombo } from './database.service';
import * as listEndpoints from 'express-list-endpoints';


export const tracker = createParamDecorator((data, req) => {
  // type any because otherwise you need to specify the whole structure of the route obj
  const incoming: any = req.route;  
  const dbEntry: RequestSchema = {
    path: incoming.path,
    method: incoming.stack[0].method.toUpperCase()
  }
  track(dbEntry);
})


export const initialize = ( app: any) => {
  init(listEndpoints(app));
}


export const getAllRequests = async(): Promise<{total: number}[]> => {
  return await getTotal();
}


export const getRequestsPerMethod = async(): Promise<{method: string, total: number}[]> => {
  return await getTotalPerMethod();
}


export const getRequestsPerPath = async(): Promise<{path: string, total: number}[]> => {
  return await getTotalPerPath();
}


export const getTotalPerPathMethodCombo = async(path: string, method: string): Promise<{path:string, method:string, total:number}[]> => {
  return await getTotalPerCombo(path, method);
}
