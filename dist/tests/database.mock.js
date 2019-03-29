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
const BirdPromise = require("bluebird");
const _totalTracking = 'total';
const _totalPerMethod = 'method';
const _totalPerPath = 'path';
const _totalPerPathMethodCombo = 'combo';
const backupDb = {
    run: (query, args, fn) => {
        fn(undefined);
    },
    get: (query, args, fn) => {
        fn(undefined, { result: [{ path: '/', method: 'GET', total: 10 }] });
    },
    all: (query, args, fn) => {
        if (query === 'path') {
            fn(undefined, { result: [{ path: '/', total: 10 }] });
        }
        else if (query === 'method') {
            fn(undefined, { result: [{ method: 'GET', total: 10 }] });
        }
        else if (query === 'total') {
            fn(undefined, { result: [{ total: 10 }] });
        }
        else {
            fn(undefined, { result: [{ path: '/', method: 'GET', total: 10 }] });
        }
    },
    exec: (query, fn) => {
        fn(undefined);
    }
};
function init(directory, paths) {
}
exports.init = init;
function insertToTable(entry) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield backupDb.run(`
    insert into requests (path, method, count) 
    values ("${entry.path}", "${entry.method}", "${entry.count}")`, undefined, (err) => {
            if (err) {
                throw err;
            }
        });
    });
}
function updateTableEntry(entry) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield backupDb.run(`
  Update requests
  set count = ${entry.count} where path = "${entry.path}" and method = "${entry.method}"
  `, undefined, (err) => {
            if (err) {
                throw err;
            }
        });
    });
}
function track(entry) {
    const sql = `select * from requests where path="${entry.path}" and method="${entry.method}"`;
    backupDb.get(sql, undefined, (err, row) => {
        if (err) {
            throw err;
        }
        if (!row) {
            const newEntry = Object.assign({}, entry, { count: 0 });
            insertToTable(newEntry);
        }
        else {
            row.count++;
            updateTableEntry(row);
        }
    });
}
exports.track = track;
function getTotal() {
    return __awaiter(this, void 0, void 0, function* () {
        return new BirdPromise((resolve, reject) => {
            backupDb.all(_totalTracking, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
}
exports.getTotal = getTotal;
function getTotalPerMethod() {
    return __awaiter(this, void 0, void 0, function* () {
        return new BirdPromise((resolve, reject) => {
            backupDb.all(_totalPerMethod, [], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    });
}
exports.getTotalPerMethod = getTotalPerMethod;
function getTotalPerPath() {
    return __awaiter(this, void 0, void 0, function* () {
        return new BirdPromise((resolve, reject) => {
            backupDb.all(_totalPerPath, [], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    });
}
exports.getTotalPerPath = getTotalPerPath;
function getTotalPerCombo(path, method) {
    return __awaiter(this, void 0, void 0, function* () {
        let splitQuery = _totalPerPathMethodCombo.split('?');
        let modifiedQuery = splitQuery[0] + path + splitQuery[1] + method + splitQuery[2];
        return new BirdPromise((resolve, reject) => {
            backupDb.all(modifiedQuery, [], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    });
}
exports.getTotalPerCombo = getTotalPerCombo;
//# sourceMappingURL=database.mock.js.map