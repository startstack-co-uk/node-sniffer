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
const Main = require("../main");
const database_service_mock_1 = require("./database.service.mock");
describe('main.ts', () => {
    const mockDb = new database_service_mock_1.MockDbProvider();
    describe('initialize', () => {
        it('should initialize the connection to the db', () => {
            const param = 'custom';
            const app = {};
            jest.spyOn(Main, 'initialize').mockImplementation((param, app) => __awaiter(this, void 0, void 0, function* () { yield mockDb.init(param, app); }));
            expect(Main.initialize(param, app)).toEqual(new Promise((resolve, reject) => resolve({})));
        });
    });
    describe('getAllRequests', () => {
        it('should return an array with the total number of requests tracked', () => __awaiter(this, void 0, void 0, function* () {
            const result = { result: [{ total: 5 }] };
            jest.spyOn(Main, 'getAllRequests').mockImplementation(() => __awaiter(this, void 0, void 0, function* () { return yield mockDb.getTotal(); }));
            expect(yield Main.getAllRequests()).toEqual(result);
        }));
    });
    describe('getRequestsPerMethod', () => {
        it('should return an array with the total number of requests tracked grouped by method type', () => __awaiter(this, void 0, void 0, function* () {
            const result = { result: [
                    { method: "GET", total: 20 },
                    { method: "POST", total: 15 },
                    { method: "PATCH", total: 3 },
                    { method: "PUT", total: 1 },
                    { method: "DELETE", total: 15 },
                ] };
            jest.spyOn(Main, 'getRequestsPerMethod').mockImplementation(() => __awaiter(this, void 0, void 0, function* () { return yield mockDb.getTotalPerMethod(); }));
            expect(yield Main.getRequestsPerMethod()).toEqual(result);
        }));
    });
    describe('getRequestsPerPath', () => {
        it('should return an array with the total number of requests tracked grouped by request path', () => __awaiter(this, void 0, void 0, function* () {
            const result = { result: [
                    { path: "/", total: 20 },
                    { path: "/example1", total: 15 },
                    { path: "/example2", total: 3 },
                    { path: "/about", total: 1 },
                ] };
            jest.spyOn(Main, 'getRequestsPerPath').mockImplementation(() => __awaiter(this, void 0, void 0, function* () { return yield mockDb.getTotalPerPath(); }));
            expect(yield Main.getRequestsPerPath()).toEqual(result);
        }));
    });
    describe('getTotalPerPathMethodCombo', () => {
        it('should return an array with the total number of requests tracked for a specific endpoint', () => __awaiter(this, void 0, void 0, function* () {
            const result = { result: [
                    { path: '/', method: 'GET', total: 10 },
                ] };
            jest.spyOn(Main, 'getTotalPerPathMethodCombo').mockImplementation((path, method) => __awaiter(this, void 0, void 0, function* () {
                return yield mockDb.getTotalPerCombo(path, method);
            }));
            expect(yield Main.getTotalPerPathMethodCombo('/', 'GET')).toEqual(result);
        }));
    });
    describe('getDatabaseAnalytics', () => {
        it('should return an object with stats about the database', () => __awaiter(this, void 0, void 0, function* () {
            const result = { result: {
                    totalRows: 4,
                    tracked: 1,
                    tableSize: 10,
                    dbSize: 10
                } };
            jest.spyOn(Main, 'getDbAnalytics').mockImplementation(() => __awaiter(this, void 0, void 0, function* () { return yield mockDb.getDatabaseAnalytics(); }));
            expect(yield Main.getDbAnalytics()).toEqual(result);
        }));
    });
});
//# sourceMappingURL=main.test.js.map