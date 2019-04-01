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
const common_1 = require("@nestjs/common");
const database_service_1 = require("./database.service");
const listEndpoints = require("express-list-endpoints");
exports.tracker = common_1.createParamDecorator((data, req) => {
    const incoming = req.route;
    const dbEntry = {
        path: incoming.path,
        method: incoming.stack[0].method.toUpperCase()
    };
    database_service_1.track(dbEntry);
});
function initialize(directory, app) {
    return __awaiter(this, void 0, void 0, function* () {
        const paths = yield listEndpoints(app);
        database_service_1.init(directory, paths);
    });
}
exports.initialize = initialize;
function getAllRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_service_1.getTotal();
    });
}
exports.getAllRequests = getAllRequests;
function getRequestsPerMethod() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_service_1.getTotalPerMethod();
    });
}
exports.getRequestsPerMethod = getRequestsPerMethod;
function getRequestsPerPath() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_service_1.getTotalPerPath();
    });
}
exports.getRequestsPerPath = getRequestsPerPath;
function getTotalPerPathMethodCombo(path, method) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_service_1.getTotalPerCombo(path, method);
    });
}
exports.getTotalPerPathMethodCombo = getTotalPerPathMethodCombo;
function getDbAnalytics() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_service_1.getDatabaseAnalytics();
    });
}
exports.getDbAnalytics = getDbAnalytics;
//# sourceMappingURL=main.js.map