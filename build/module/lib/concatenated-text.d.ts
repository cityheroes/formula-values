import { CompiledExpression } from './compiled-expression';
export declare class ConcatenatedText extends CompiledExpression {
    constructor(expression?: string);
    eval(data: Record<string, unknown>, metaData: Record<string, unknown>, context: string): string;
    getDependencies(): any[];
    static isConcatenatedText(expression: any): boolean;
}
