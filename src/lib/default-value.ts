import { CompiledExpression } from './compiled-expression';

export class DefaultValue extends CompiledExpression {

	value: unknown;

	getDependencies(): string[] {
		return [];
	}

	constructor(expression: unknown) {
		super([], '');
		this.value = expression;
	}

	eval() {
		return this.value;
	}

}
