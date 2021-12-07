import { RoutePath } from './helpers';
export declare class Variable {
    _path: RoutePath;
    _hasStar: boolean;
    _hasAt: boolean;
    _hasContext: boolean;
    _environment: 'metaData' | 'data';
    _parsedVariable: string;
    constructor(text: string);
    parseVariable(contextPath: any): string;
    _parseWithContext(contextPath: any): string;
    hasStar(): boolean;
    hasAt(): boolean;
    static isValid(text: string): boolean;
    static _parse(path: unknown[], environment: string): string;
}
