import * as sqlite3 from 'sqlite3';
import * as BirdPromise from 'bluebird';
import { _totalTracking, _totalPerMethod, _totalPerPath, _totalPerPathMethodCombo, _dbAnalytics } from './enums/queries.enum';
import  * as fs from 'fs';

let backupDb;
let backupTable;
let dbPath: string;

export interface RequestSchema{
    path: string;
    method: string;
}

interface DbEntrySchema{
    path: string;
    method: string;
    count: number;
}



export async function init (directory: string, paths: any[]){
    dbPath = directory;
    backupDb = new sqlite3.Database(directory, (err) => {
        if(err){
            throw err;
        }
        backupTable = backupDb.run(`
        create table if not exists requests(
            id integer primary key autoincrement,
            path varchar(100) not null,
            method varchar(10) not null,
            count integer default 0
        )
        `,undefined, async(err) => {
            if(err){
                throw err;
            }
            let query: string = "begin transaction;";
            paths = await paths.map((data) => {
                 const toInsert: string = `
                    insert into requests(path, method, count)
                    select "${data.path}", "${data.methods[0]}", 0
                    where not exists (select 1 from requests where path = "${data.path}" and method = "${data.methods[0]}");
                `;
                return toInsert;
            });
            query = query + paths.join("") + "commit;"
            backupDb.exec(query, (err) => {
                if(err){
                    throw err;
                }
            });
        });
    });
}


async function insertToTable(entry: DbEntrySchema): Promise<void>{
    const result = new BirdPromise((resolve, reject) => {
        backupDb.run(`
        insert into requests (path, method, count) 
        values ("${entry.path}", "${entry.method}", "${entry.count}")`,undefined, (err) => {
            if(err){
                throw err;
            }
        })
    })
  }


async function updateTableEntry(entry: DbEntrySchema): Promise<void>{
    let result = new BirdPromise((resolve,reject) => {
        backupDb.run(`
        Update requests
        set count = ${entry.count}
        where path = "${entry.path}" and method = "${entry.method}"
        `, undefined, (err) => {
            if(err){
                reject(err);
            }
            resolve();
        })
    })
}


export function track (entry: RequestSchema): void{
    const sql: string = `select * from requests where path = "${entry.path}" and method ="${entry.method}"`;
    backupDb.get(sql, undefined, (err, row) => {
        if(err){
            throw err;
        }
        if(!row){
            const newEntry: DbEntrySchema = { ...entry, count:1};
            insertToTable(newEntry);
        }else{
            row.count++;
            updateTableEntry(row);
        }
    })
}



export async function getTotal(): Promise<{result:{total: number}[]}>{
    return new BirdPromise((resolve, reject) => {
        backupDb.all(_totalTracking, [], (err, rows) => {
            if(err){
                reject(err);
            }
            resolve({result:rows});
        });
    });
}


export async function getTotalPerPath(): Promise<{result:{path:string, total:number}[]}>{
    return new BirdPromise((resolve, reject) => {
        backupDb.all(_totalPerPath, [], (err, rows) => {
            if(err){
                reject(err);
            }
            resolve({result:rows});
        });
    });
}


export async function getTotalPerMethod(): Promise<{result:{method: string, total: number}[]}>{
    return new BirdPromise((resolve, reject) => {
        backupDb.all(_totalPerMethod, [], (err, rows) => {
            if(err){
                reject(err);
            }
            resolve({result: rows});
        });
    });
}


export async function getTotalPerCombo(path: string, method: string): Promise<{result:{path: string, method: string, total: number}[]}>{
    const splitQuery: string[] = _totalPerPathMethodCombo.split('?');
    const modifiedQuery: string = splitQuery[0] + path + splitQuery[1] + method + splitQuery[2];
    return new BirdPromise((resolve, reject) => {
        backupDb.all(modifiedQuery, [], (err, rows) => {
            if(err){
                reject(err);
            }
            resolve({result:rows});
        })
    })
}


export async function getDatabaseAnalytics(): Promise<{result:{totalRows:number, tracked:number, tableSize:number, dbSize:number}}>{
    return new BirdPromise((resolve, reject) => {
        backupDb.get(_dbAnalytics, undefined, (err, row) => {
            if(err){
                reject(err);
            }
            const tableSize: number = (4 + 102 + 12 + 4) * (row.totalRoutes || 0);
            const tableSizeMB: number = tableSize / 1000000.0;  //size in megabytes
            const stats = fs.statSync(dbPath);
            const dbSizeMB: number = stats.size / 1000000.0;    //size in megabytes
            const result = {
                totalRows: row.totalRoutes,
                tracked : row.trackedRoutes,
                tableSize: tableSizeMB,
                dbSize: dbSizeMB
            };
            resolve({result: result});
        })
    })
}
