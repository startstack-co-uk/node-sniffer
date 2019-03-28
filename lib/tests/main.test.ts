import { _totalTracking, _totalPerMethod, _totalPerPath, _totalPerPathMethodCombo } from '../enums/queries.enum';
import * as Main from '../main';
import { MockDbProvider } from './database.service.mock'


describe('database.service', () => {
  
    const mockDb = new MockDbProvider();

    describe('getAllRequests', () => {
      it('should return an array with the total number of requests tracked', async() => {
        const result: {total: number}[] = [{total: 5}];
        jest.spyOn(Main, 'getAllRequests').mockImplementation(async() => {return await mockDb.getTotal()});
        expect(await Main.getAllRequests()).toEqual(result);
      }) 
    })

    
    describe('getRequestsPerMethod', () => {
      it('should return an array with the total number of requests tracked grouped by method type', async() => {
        const result: {method: string, total: number}[] = [
          {method: "GET", total: 20},
          {method: "POST", total: 15},
          {method: "PATCH", total: 3},
          {method: "PUT", total: 1},
          {method: "DELETE", total: 15},
        ];
        jest.spyOn(Main, 'getRequestsPerMethod').mockImplementation(async() => { return await mockDb.getTotalPerMethod()})
        expect(await Main.getRequestsPerMethod()).toEqual(result);
      })
    })


    describe('getRequestsPerPath', () => {
      it('should return an array with the total number of requests tracked grouped by request path', async() => {
        const result: {path: string, total: number}[] = [
          {path: "/", total: 20},
          {path: "/example1", total: 15},
          {path: "/example2", total: 3},
          {path: "/about", total: 1},
        ];
        jest.spyOn(Main, 'getRequestsPerPath').mockImplementation(async() => { return await mockDb.getTotalPerPath()});
        expect(await Main.getRequestsPerPath()).toEqual(result);
      })
    })


    describe('getTotalPerPathMethodCombo', () => {
      it('should return an array with the total number of requests tracked for a specific endpoint', async() => {
        const result: {path:string, method:string, total:number}[] = [
          {path:'/', method:'GET', total:10},
        ];
        jest.spyOn(Main, 'getTotalPerPathMethodCombo').mockImplementation(async(path:string, method: string) => { 
          return await mockDb.getTotalPerCombo(path, method);
        });
        expect(await Main.getTotalPerPathMethodCombo('/', 'GET')).toEqual(result);
      })
    })


})