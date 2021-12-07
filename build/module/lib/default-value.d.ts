import { CompiledExpression } from './compiled-expression';
export declare class DefaultValue extends CompiledExpression {
    value: unknown;
    getDependencies(): string[];
    constructor(expression: unknown);
    eval(): unknown;
}
