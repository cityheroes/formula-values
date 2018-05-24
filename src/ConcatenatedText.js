import Helpers from './Helpers';
import CompiledExpression from './CompiledExpression';
import Variable from './Variable';

const CLEANING_RULES = [{
		pattern: '\'',
		replacement: '\\\''
	}],
	VARIABLE_REGEX = new RegExp(Helpers.patterns.variable),
	PARSED_EXPRESSION_REGEX = new RegExp(Helpers.patterns.parsedExpression,'g');

export default class ConcatenatedText extends CompiledExpression {

	constructor(expression = '') {
		super(CLEANING_RULES, expression);
	}

	eval(data, metaData, context) {
		let result = '';
		try {
			let contextPath = Helpers.processPath(context);

			let parsedVariables = this._variables.map((variable) => {
				if (variable.hasStar()) {
					return '';
				}
				return Helpers.evalWithSafeEnvironment(
					variable.parseVariable(contextPath),
					data,
					metaData
				);
			});

			result = this._parsedExpression.replace(
				PARSED_EXPRESSION_REGEX,
				(match, number) => {
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
		return 'string' === typeof expression && VARIABLE_REGEX.test(expression);
	}

}
