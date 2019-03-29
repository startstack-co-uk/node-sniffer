import * as BirdPromise from 'bluebird';
import * as sqlite3 from 'sqlite3';

const _totalTracking = 'total';
const _totalPerMethod = 'method';
const _totalPerPath = 'path';
const _totalPerPathMethodCombo = 'combo';

export interface RequestSchema {
  path: string;
  method: string;
}

export interface DbEntrySchema {
  path: string;
  method: string;
  count: number;
}

const backupDb = {

    run : (query: string, args: any[], fn) => {
        fn(undefined);
    },

    get : (query: string, args: any[], fn) => {
        fn(undefined,{result: [{path: '/', method: 'GET', total: 10}]});
    },

    all : (query: string, args: any[], fn) => {
        if(query === 'path'){
            fn(undefined, {result:[{path:'/', total: 10}]})
        }else if(query === 'method'){
            fn(undefined, {result:[{method: 'GET', total: 10}]})
        }else if(query === 'total'){
            fn(undefined, {result:[{total: 10}]})
        }else{
            fn(undefined, {result:[{path: '/', method: 'GET', total: 10}]})
        }  
    },

    exec : (query, fn) => {
        fn(undefined);
    }

}


export function init(directory:string, paths: any[]): void {
  
}


async function insertToTable(entry: DbEntrySchema): Promise<void>{
  const result = await backupDb.run(`
    insert into requests (path, method, count) 
    values ("${entry.path}", "${entry.method}", "${entry.count}")`,undefined, (err) => {
      if(err){
        throw err;
      }
    })
}


async function updateTableEntry(entry: DbEntrySchema): Promise<void>{
  let result = await backupDb.run(`
  Update requests
  set count = ${entry.count} where path = "${entry.path}" and method = "${entry.method}"
  `, undefined, (err) => {
      if (err) {
        throw err;
      }
    })
}


export function track(entry: RequestSchema): void {
  const sql: string = `select * from requests where path="${entry.path}" and method="${entry.method}"`;
  backupDb.get(sql,undefined, (err, row) => {
    if(err){
      throw err;
    }
    if(!row){
      const newEntry: DbEntrySchema = { ...entry, count:0};
      insertToTable(newEntry);
    }else{
      row.count++;
      updateTableEntry(row);
    }
  })
}


export async function getTotal(): Promise< {result:{total: number}[]}>{
    return new BirdPromise((resolve, reject) => {
      backupDb.all(_totalTracking, [], (err, rows) => {
        if(err){
          reject(err);
        }
        resolve(rows);
      });
    })
  }
  
  
  export async function getTotalPerMethod(): Promise<{result:{method:string, total:number}[]}>{
    return new BirdPromise((resolve, reject) => {
      backupDb.all(_totalPerMethod, [], (err, result) => {
        if(err){
          reject(err);
        }
        resolve(result);
      })
    })
  }
  
  
  export async function getTotalPerPath(): Promise<{result:{path:string, total:number}[]}>{
    return new BirdPromise((resolve, reject) => {
      backupDb.all(_totalPerPath, [], (err, result) => {
        if(err){
          reject(err);
        }
        resolve(result);
      })
    })
  }
  
  
  export async function getTotalPerCombo(path: string, method: string): Promise<{result:{path: string, method: string, total: number}[]}>{
    let splitQuery: string[] = _totalPerPathMethodCombo.split('?');
    let modifiedQuery: string = splitQuery[0] + path + splitQuery[1] + method + splitQuery[2];
    return new BirdPromise((resolve, reject) => {
      backupDb.all(modifiedQuery, [], (err, result) => {
        if(err){
          reject(err);
        }
        resolve(result);
      })
    })
  }