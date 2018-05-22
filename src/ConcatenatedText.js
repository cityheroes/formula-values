import Helpers from './Helpers';
import CompiledExpression from './CompiledExpression';
import Variable from './Variable';

let rules = [
	{
		pattern: '\'',
		replacement: '\\\''
	}
];

let variableRegexp = new RegExp(Helpers.patterns.variable);

export default class ConcatenatedText extends CompiledExpression {

	constructor(expression = '') {
		super(rules, expression);
	}

	eval(data, metaData, context) {
		let result = '';
		try {
			var contextPath = Helpers.getPath(context);

			var parsedVariables = this._variables.map((variable) => {
				if (variable.hasStar()) {
					return '';
				} else {
					return Helpers.evalWithSafeEnvironment(variable.parseVariable(contextPath), data, metaData);
				}
			});

			result = this._parsedExpression.replace(/\[\*(\d*)\*\]/g, (match, number) => {
				return parsedVariables[parseInt(number)];
			});
		} catch (error) {
			console.warn(error);
		}
		return result;
	}

	getDependencies() {
		return this._variables.map((fieldPath) => fieldPath.split('::').shift());
	}

	static isConcatenatedText(expression) {
		return 'string' === typeof expression && variableRegexp.test(expression) > -1;
	}

}
