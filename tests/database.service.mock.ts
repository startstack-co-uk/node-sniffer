



export class MockDbProvider{

    constructor(){}

    init(directory: string, app: any): void{
        // it's suposed to initiate the db connection
    }

    async getTotal(): Promise<{result:{total: number}[]}>{
        const result = {result: [{total: 5}]};
        return result;
    }

    async getTotalPerMethod(): Promise<{result:{method: string, total: number}[]}>{
        return {result:[
            {method: "GET", total: 20},
            {method: "POST", total: 15},
            {method: "PATCH", total: 3},
            {method: "PUT", total: 1},
            {method: "DELETE", total: 15},
          ]};
    }

    async getTotalPerPath(): Promise<{result:{path: string, total: number}[]}>{
        return {result:[
            {path: "/", total: 20},
            {path: "/example1", total: 15},
            {path: "/example2", total: 3},
            {path: "/about", total: 1},
        ]};
    }

    async getTotalPerCombo(path:string, method: string): Promise<{result:{path:string, method:string, total:number}[]}>{
        return {result:[
            {path:'/', method:'GET', total:10},
          ]};
    }

    async getDatabaseAnalytics(): Promise<{result:{totalRows:number, tracked:number, tableSize:number, dbSize:number}}>{
        const result = {
            totalRows: 4,
            tracked : 1,
            tableSize: 10,
            dbSize: 10
        };
        return {result: result}
    }
}