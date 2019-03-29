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
class MockDbProvider {
    constructor() { }
    init(directory, app) {
    }
    getTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = { result: [{ total: 5 }] };
            return result;
        });
    }
    getTotalPerMethod() {
        return __awaiter(this, void 0, void 0, function* () {
            return { result: [
                    { method: "GET", total: 20 },
                    { method: "POST", total: 15 },
                    { method: "PATCH", total: 3 },
                    { method: "PUT", total: 1 },
                    { method: "DELETE", total: 15 },
                ] };
        });
    }
    getTotalPerPath() {
        return __awaiter(this, void 0, void 0, function* () {
            return { result: [
                    { path: "/", total: 20 },
                    { path: "/example1", total: 15 },
                    { path: "/example2", total: 3 },
                    { path: "/about", total: 1 },
                ] };
        });
    }
    getTotalPerCombo(path, method) {
        return __awaiter(this, void 0, void 0, function* () {
            return { result: [
                    { path: '/', method: 'GET', total: 10 },
                ] };
        });
    }
}
exports.MockDbProvider = MockDbProvider;
//# sourceMappingURL=database.service.mock.js.map