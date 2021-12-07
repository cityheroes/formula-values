export declare type RoutePath = (string | number)[];
export declare type DateType = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'HH:mm:ss';
export declare const processPath: (context?: string) => RoutePath;
export declare const assignTo: (variable: any, path: string, index: number, value: any) => void;
export declare const compact: (variable: any, path: any) => void;
export declare const evalWithSafeEnvironment: any;
export declare const patterns: {
    variable: string;
    parsedExpression: string;
    invalidVariable: string;
};
export declare const dataVarName = "data";
export declare const metaDataVarName = "metaData";
