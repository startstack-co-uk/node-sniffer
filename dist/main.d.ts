export declare const tracker: (...dataOrPipes: any[]) => ParameterDecorator;
export declare function initialize(directory: string, app: any): Promise<void>;
export declare function getAllRequests(): Promise<{
    result: {
        total: number;
    }[];
}>;
export declare function getRequestsPerMethod(): Promise<{
    result: {
        method: string;
        total: number;
    }[];
}>;
export declare function getRequestsPerPath(): Promise<{
    result: {
        path: string;
        total: number;
    }[];
}>;
export declare function getTotalPerPathMethodCombo(path: string, method: string): Promise<{
    result: {
        path: string;
        method: string;
        total: number;
    }[];
}>;
