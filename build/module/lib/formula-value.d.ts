import { CompiledExpression } from './compiled-expression';
export declare class FormulaValue {
    compiledExpression: CompiledExpression;
    constructor(expression?: string);
    eval(data?: {}, metaData?: {}, context?: string): unknown;
    static isFormulaValue(expression: string): boolean;
}
