import { CompiledExpression } from './compiled-expression';
export declare class Formula extends CompiledExpression {
    constructor(expression: string);
    eval(data: Record<string, unknown>, metaData: Record<string, unknown>, context: string): any;
    getDependencies(): any[];
    static isFormula(expression: string): boolean;
}
