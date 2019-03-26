import { createParamDecorator} from '@nestjs/common';
import { track, RequestSchema, init, getTotal, getTotalPerMethod, getTotalPerPath, getTotalPerCombo } from './database.service';
import * as listEndpoints from 'express-list-endpoints';


export const tracker = createParamDecorator((data, req) => {
  const incoming = req.route;
  const dbEntry: RequestSchema = {
    path: incoming.path,
    method: incoming.stack[0].method.toUpperCase()
  }
  track(dbEntry);
})


export const initialize = (dbpath: string, app: any) => {
  const paths: any[] = listEndpoints(app.getHttpAdapter().getInstance());
  init(dbpath, paths);
}


export const getAllRequests = async() => {
  return await getTotal();
}


export const getRequestsPerMethod = async() => {
  return await getTotalPerMethod();
}


export const getRequestsPerPath = async() => {
  return await getTotalPerPath();
}


export const getTotalPerPathMethodCombo = async(path: string, method: string) => {
  return await getTotalPerCombo(path, method);
}
