import CompiledExpression from './CompiledExpression';
import Variable from './Variable';
import Helpers from './Helpers';

var dataVarName = 'data',
	metaDataVarName = 'metaData';

var rules = [
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
		super(rules, expression);
	}

	static isFormula(expression) {
		return 'string' === typeof expression && expression.indexOf('=') === 0;
	}

	eval(data, metaData, context) {
		var contextPath = Helpers.getPath(context);
		var parsedVariables = this._variables.map((variable) => {
			return variable.parseVariable(contextPath);
		});

		let resolvedParsedExpression = this._parsedExpression.replace(/\[\*(\d*)\*\]/g, (match, number) => {
			return parsedVariables[parseInt(number)];
		});

		let value = Helpers.evalWithSafeEnvironment(resolvedParsedExpression, data, metaData);
		return value;
	}

	getDependencies() {
		return this._variables.map((fieldPath) => fieldPath.split('::').shift());
	}

}
