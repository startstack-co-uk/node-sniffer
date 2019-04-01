export interface RequestSchema {
    path: string;
    method: string;
}
export declare function init(directory: string, paths: any[]): Promise<void>;
export declare function track(entry: RequestSchema): void;
export declare function getTotal(): Promise<{
    result: {
        total: number;
    }[];
}>;
export declare function getTotalPerPath(): Promise<{
    result: {
        path: string;
        total: number;
    }[];
}>;
export declare function getTotalPerMethod(): Promise<{
    result: {
        method: string;
        total: number;
    }[];
}>;
export declare function getTotalPerCombo(path: string, method: string): Promise<{
    result: {
        path: string;
        method: string;
        total: number;
    }[];
}>;
export declare function getDatabaseAnalytics(): Promise<{
    result: {
        totalRows: number;
        tracked: number;
        tableSize: number;
        dbSize: number;
    };
}>;
