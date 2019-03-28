



export class MockDbProvider{

    constructor(){}

    async getTotal(): Promise<{total: number}[]>{
        return [
            {total: 5}
        ]
    }

    async getTotalPerMethod(): Promise<{method: string, total: number}[]>{
        return [
            {method: "GET", total: 20},
            {method: "POST", total: 15},
            {method: "PATCH", total: 3},
            {method: "PUT", total: 1},
            {method: "DELETE", total: 15},
          ];
    }

    async getTotalPerPath(): Promise<{path: string, total: number}[]>{
        return [
            {path: "/", total: 20},
            {path: "/example1", total: 15},
            {path: "/example2", total: 3},
            {path: "/about", total: 1},
        ];
    }

    async getTotalPerCombo(path:string, method: string): Promise<{path:string, method:string, total:number}[]>{
        return [
            {path:'/', method:'GET', total:10},
          ];
    }
}