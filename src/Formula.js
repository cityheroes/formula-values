import CompiledExpression from './CompiledExpression';
import Variable from './Variable';
import Helpers from './Helpers';

var CLEANING_RULES = [
	{
		pattern: '^=',
		replacement: ''
	},
	{
		pattern: '\'',
		replacement: '\\\''
	}
];

export default class Formula extends CompiledExpression {

	constructor(expression) {
		super(CLEANING_RULES, expression);
	}

	eval(data, metaData, context) {
		let result = null;
		try {
			let contextPath = Helpers.getPath(context);
			let parsedVariables = this._variables.map((variable) => {
				return variable.parseVariable(contextPath);
			});
			let resolvedParsedExpression = this._parsedExpression.replace(/\[\*(\d*)\*\]/g, (match, number) => {
				return parsedVariables[parseInt(number)];
			});
			result = Helpers.evalWithSafeEnvironment(resolvedParsedExpression, data, metaData);
		} catch (error) {
			console.warn(error);
		}
		return result;
	}

	getDependencies() {
		return this._variables.map((fieldPath) => fieldPath.split('::').shift());
	}

	static isFormula(expression) {
		return 'string' === typeof expression && expression.indexOf('=') === 0;
	}

}
