export declare class MockDbProvider {
    constructor();
    init(directory: string, app: any): void;
    getTotal(): Promise<{
        result: {
            total: number;
        }[];
    }>;
    getTotalPerMethod(): Promise<{
        result: {
            method: string;
            total: number;
        }[];
    }>;
    getTotalPerPath(): Promise<{
        result: {
            path: string;
            total: number;
        }[];
    }>;
    getTotalPerCombo(path: string, method: string): Promise<{
        result: {
            path: string;
            method: string;
            total: number;
        }[];
    }>;
    getDatabaseAnalytics(): Promise<{
        result: {
            totalRows: number;
            tracked: number;
            tableSize: number;
            dbSize: number;
        };
    }>;
}
