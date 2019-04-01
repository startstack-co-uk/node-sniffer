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
const sqlite3 = require("sqlite3");
const BirdPromise = require("bluebird");
const queries_enum_1 = require("./enums/queries.enum");
const fs = require("fs");
let backupDb;
let backupTable;
let dbPath;
function init(directory, paths) {
    return __awaiter(this, void 0, void 0, function* () {
        dbPath = directory;
        backupDb = new sqlite3.Database(directory, (err) => {
            if (err) {
                throw err;
            }
            backupTable = backupDb.run(`
        create table if not exists requests(
            id integer primary key autoincrement,
            path varchar(100) not null,
            method varchar(10) not null,
            count integer default 0
        )
        `, undefined, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    throw err;
                }
                let query = "begin transaction;";
                paths = yield paths.map((data) => {
                    const toInsert = `
                    insert into requests(path, method, count)
                    select "${data.path}", "${data.methods[0]}", 0
                    where not exists (select 1 from requests where path = "${data.path}" and method = "${data.methods[0]}");
                `;
                    return toInsert;
                });
                query = query + paths.join("") + "commit;";
                backupDb.exec(query, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }));
        });
    });
}
exports.init = init;
function insertToTable(entry) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new BirdPromise((resolve, reject) => {
            backupDb.run(`
        insert into requests (path, method, count) 
        values ("${entry.path}", "${entry.method}", "${entry.count}")`, undefined, (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    });
}
function updateTableEntry(entry) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = new BirdPromise((resolve, reject) => {
            backupDb.run(`
        Update requests
        set count = ${entry.count}
        where path = "${entry.path}" and method = "${entry.method}"
        `, undefined, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    });
}
function track(entry) {
    const sql = `select * from requests where path = "${entry.path}" and method ="${entry.method}"`;
    backupDb.get(sql, undefined, (err, row) => {
        if (err) {
            throw err;
        }
        if (!row) {
            const newEntry = Object.assign({}, entry, { count: 1 });
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
            backupDb.all(queries_enum_1._totalTracking, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve({ result: rows });
            });
        });
    });
}
exports.getTotal = getTotal;
function getTotalPerPath() {
    return __awaiter(this, void 0, void 0, function* () {
        return new BirdPromise((resolve, reject) => {
            backupDb.all(queries_enum_1._totalPerPath, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve({ result: rows });
            });
        });
    });
}
exports.getTotalPerPath = getTotalPerPath;
function getTotalPerMethod() {
    return __awaiter(this, void 0, void 0, function* () {
        return new BirdPromise((resolve, reject) => {
            backupDb.all(queries_enum_1._totalPerMethod, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve({ result: rows });
            });
        });
    });
}
exports.getTotalPerMethod = getTotalPerMethod;
function getTotalPerCombo(path, method) {
    return __awaiter(this, void 0, void 0, function* () {
        const splitQuery = queries_enum_1._totalPerPathMethodCombo.split('?');
        const modifiedQuery = splitQuery[0] + path + splitQuery[1] + method + splitQuery[2];
        return new BirdPromise((resolve, reject) => {
            backupDb.all(modifiedQuery, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve({ result: rows });
            });
        });
    });
}
exports.getTotalPerCombo = getTotalPerCombo;
function getDatabaseAnalytics() {
    return __awaiter(this, void 0, void 0, function* () {
        return new BirdPromise((resolve, reject) => {
            backupDb.get(queries_enum_1._dbAnalytics, undefined, (err, row) => {
                if (err) {
                    reject(err);
                }
                const tableSize = (4 + 102 + 12 + 4) * (row.totalRoutes || 0);
                const tableSizeMB = tableSize / 1000000.0;
                const stats = fs.statSync(dbPath);
                const dbSizeMB = stats.size / 1000000.0;
                const result = {
                    totalRows: row.totalRoutes,
                    tracked: row.trackedRoutes,
                    tableSize: tableSizeMB,
                    dbSize: dbSizeMB
                };
                resolve({ result: result });
            });
        });
    });
}
exports.getDatabaseAnalytics = getDatabaseAnalytics;
//# sourceMappingURL=database.service.js.map