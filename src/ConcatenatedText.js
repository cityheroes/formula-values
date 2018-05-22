import Helpers from './Helpers';
import CompiledExpression from './CompiledExpression';

export default class ConcatenatedText extends CompiledExpression {

	constructor(expression) {
		super();
	}

	static isConcatenatedText(expression) {
		return 'string' === typeof expression && expression.indexOf(Helpers.variablePattern) > -1;
	}

}
