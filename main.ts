import { createParamDecorator } from '@nestjs/common';
import { track, RequestSchema, init, getTotal, getTotalPerPath, getTotalPerMethod, getTotalPerCombo, getDatabaseAnalytics } from './database.service';
import * as listEndpoints from 'express-list-endpoints';


export const tracker = createParamDecorator((data, req) => {
    const incoming: any = req.route;
    const dbEntry: RequestSchema = {
        path: incoming.path,
        method: incoming.stack[0].method.toUpperCase()
    };
    track(dbEntry);
})


export async function initialize(directory: string, app: any): Promise<void>{
    const paths = await listEndpoints(app);
    init(directory, paths);
}

export async function getAllRequests(): Promise<{result:{total:number}[]}>{
    return await getTotal();
}

export async function getRequestsPerMethod(): Promise<{result:{method: string, total: number}[]}>{
    return await getTotalPerMethod();
}

export async function getRequestsPerPath(): Promise<{result:{path: string, total: number}[]}>{
    return await getTotalPerPath();
}

export async function getTotalPerPathMethodCombo(path:string, method: string): Promise<{result:{path:string, method:string, total: number}[]}>{
    return await getTotalPerCombo(path, method);
}

export async function getDbAnalytics(): Promise<{result:{totalRows:number, tracked:number, tableSize:number, dbSize:number}}>{
    return await getDatabaseAnalytics();
}
