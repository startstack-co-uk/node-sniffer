"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const service = require("../database.service");
const mockDb = require("./database.mock");
describe('database.sevice.ts', () => {
    describe('getTotal', () => {
        it('should return an array with the total number of requests tracked', () => __awaiter(this, void 0, void 0, function* () {
            const result = { result: [{ total: 10 }] };
            jest.spyOn(service, 'getTotal').mockImplementation(() => __awaiter(this, void 0, void 0, function* () { return yield mockDb.getTotal(); }));
            expect(yield service.getTotal()).toEqual(result);
        }));
    });
    describe('getTotalPerMethod', () => {
        it('should return an array with the total number of requests tracked grouped by method type', () => __awaiter(this, void 0, void 0, function* () {
            const result = { result: [{ method: 'GET', total: 10 }] };
            jest.spyOn(service, 'getTotalPerMethod').mockImplementation(() => __awaiter(this, void 0, void 0, function* () { return yield mockDb.getTotalPerMethod(); }));
            expect(yield service.getTotalPerMethod()).toEqual(result);
        }));
    });
    describe('getTotalPerPath', () => {
        it('should return an array with the total number of requests tracked grouped by request path', () => __awaiter(this, void 0, void 0, function* () {
            const result = { result: [{ path: '/', total: 10 }] };
            jest.spyOn(service, 'getTotalPerPath').mockImplementation(() => __awaiter(this, void 0, void 0, function* () { return yield mockDb.getTotalPerPath(); }));
            expect(yield service.getTotalPerPath()).toEqual(result);
        }));
    });
    describe('getTotalPerCombo', () => {
        it('should return an array with the total number of requests tracked for a specific endpoint', () => __awaiter(this, void 0, void 0, function* () {
            const result = { result: [{ path: '/', method: 'GET', total: 10 }] };
            jest.spyOn(service, 'getTotalPerCombo').mockImplementation(() => __awaiter(this, void 0, void 0, function* () { return yield mockDb.getTotalPerCombo('/', 'GET'); }));
            expect(yield service.getTotalPerCombo('/', 'GET')).toEqual(result);
        }));
    });
    describe('track', () => {
        it('should insert/update an entry in the db and return nothing', () => __awaiter(this, void 0, void 0, function* () {
            const toInsert = {
                path: '/',
                method: 'GET',
            };
            jest.spyOn(service, 'track').mockImplementation((toInsert) => { mockDb.track(toInsert); });
            expect(service.track(toInsert)).toBe(undefined);
        }));
    });
    describe('init', () => {
        it('should initiate the connection to the db', () => {
            const directory = 'sample';
            const paths = [
                { path: '/', methods: ['GET'] }
            ];
            jest.spyOn(service, 'init').mockImplementation((directory, paths) => __awaiter(this, void 0, void 0, function* () { yield mockDb.init(directory, paths); }));
            expect(service.init(directory, paths)).toEqual(new Promise((resolve, reject) => resolve({})));
        });
    });
});
//# sourceMappingURL=database.service.test.js.map