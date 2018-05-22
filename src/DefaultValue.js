import CompiledExpression from './CompiledExpression';

export default class DefaultValue extends CompiledExpression {

	constructor(expression) {
		super([], '');
		this.value = expression;
	}

	eval() {
		return this.value;
	}

}
