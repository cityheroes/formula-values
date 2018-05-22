import Helpers from './Helpers';
import CompiledExpression from './CompiledExpression';
import Variable from './Variable';

let rules = [
	{
		pattern: '\'',
		replacement: '\\\''
	}
];

export default class ConcatenatedText extends CompiledExpression {

	constructor(expression) {
		super(rules, expression);
	}

	eval(data, metaData, context) {
		var contextPath = Helpers.getPath(context);

		var parsedVariables = this._variables.map((variable) => {
			return Helpers.evalWithSafeEnvironment(variable.parseVariable(contextPath), data, metaData);
		});

		let resolvedParsedExpression = this._parsedExpression.replace(/\[\*(\d*)\*\]/g, (match, number) => {
			return parsedVariables[parseInt(number)];
		});

		return resolvedParsedExpression;
	}

	getDependencies() {
		return this._variables.map((fieldPath) => fieldPath.split('::').shift());
	}

	static isConcatenatedText(expression) {
		return 'string' === typeof expression && expression.indexOf(Helpers.variablePattern) > -1;
	}

}
