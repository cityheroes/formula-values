import { CompiledExpression } from './compiled-expression';
export class DefaultValue extends CompiledExpression {
    constructor(expression) {
        super([], '');
        this.value = expression;
    }
    getDependencies() {
        return [];
    }
    eval() {
        return this.value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC12YWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZGVmYXVsdC12YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRCxNQUFNLE9BQU8sWUFBYSxTQUFRLGtCQUFrQjtJQVFuRCxZQUFZLFVBQW1CO1FBQzlCLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBUEQsZUFBZTtRQUNkLE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQU9ELElBQUk7UUFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztDQUVEIn0=