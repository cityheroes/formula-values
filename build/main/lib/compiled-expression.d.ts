export interface Rule {
    pattern: string;
    replacement: string | ((matchValue: string, ...partialMatches: string[]) => string);
}
export declare abstract class CompiledExpression {
    _variables: any[];
    _parsedExpression: string;
    constructor(rules: Rule[], expression: string);
    abstract eval(...params: unknown[]): unknown;
    abstract getDependencies(): string[];
}
