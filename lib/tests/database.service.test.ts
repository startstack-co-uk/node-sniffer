import * as service from '../database.service';
import * as mockDb from './database.mock';


describe('database.sevice.ts', () => {

    describe('getTotal', () => {
        it('should return an array with the total number of requests tracked', async() => {
            const result: {total: number}[] = [{total: 10}];
            jest.spyOn(service, 'getTotal').mockImplementation(async() => {return await mockDb.getTotal()});
            expect(await service.getTotal()).toEqual(result);
        })
    })


    describe('getTotalPerMethod', () => {
        it('should return an array with the total number of requests tracked grouped by method type', async() => {
            const result: {method: string, total: number}[] = [{method: 'GET', total: 10}];
            jest.spyOn(service, 'getTotalPerMethod').mockImplementation(async() => {return await mockDb.getTotalPerMethod()});
            expect( await service.getTotalPerMethod()).toEqual(result);
        })
    })


    describe('getTotalPerPath', () => {
        it('should return an array with the total number of requests tracked grouped by request path', async() => {
            const result: {path: string, total: number}[] = [{path:'/', total: 10}];
            jest.spyOn(service, 'getTotalPerPath').mockImplementation(async() => {return await mockDb.getTotalPerPath()});
            expect(await service.getTotalPerPath()).toEqual(result);
        })
    })


    describe('getTotalPerCombo', () => {
        it('should return an array with the total number of requests tracked for a specific endpoint', async() => {
            const result: {path:string, method:string, total:number}[] = [{path: '/', method: 'GET', total: 10}];
            jest.spyOn(service, 'getTotalPerCombo').mockImplementation(async() => {return await mockDb.getTotalPerCombo('/','GET')});
            expect(await service.getTotalPerCombo('/', 'GET')).toEqual(result);
        })
    });


    describe('track', () => {
        it('should insert/update an entry in the db and return nothing', async() => {
            const toInsert: mockDb.RequestSchema = {
                path: '/',
                method: 'GET',
            };
            jest.spyOn(service,'track').mockImplementation((toInsert) => {mockDb.track(toInsert)});
            expect(service.track(toInsert)).toBe(undefined);
        })
    })


    describe('init', () => {
        it('should initiate the connection to the db', () => {
            const paths = [
                {path: '/', method: 'GET'}
            ];
            jest.spyOn(service, 'init').mockImplementation((paths) => {mockDb.init(paths)});
            expect(service.init(paths)).toBe(undefined);
        })
    })
})