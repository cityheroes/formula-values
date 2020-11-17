import {
	CompiledExpression,
} from './compiled-expression';
import {
	evalWithSafeEnvironment,
	patterns as helperPatterns,
	processPath,
	RoutePath
} from './helpers';

const CLEANING_RULES = [
	{
		pattern: '\'',
		replacement: '\\\''
	}
];
const VARIABLE_REGEX = new RegExp(helperPatterns.variable);
const PARSED_EXPRESSION_REGEX = new RegExp(helperPatterns.parsedExpression, 'g');

export class ConcatenatedText extends CompiledExpression {

	constructor(expression = '') {
		super(CLEANING_RULES, expression);
	}

	eval(data: Record<string, unknown>, metaData: Record<string, unknown>, context: string) {
		let result = '';
		try {
			const contextPath: RoutePath = processPath(context);

			const parsedVariables = this._variables.map((variable) => {
				if (variable.hasStar()) {
					return '';
				}
				return evalWithSafeEnvironment(
					variable.parseVariable(contextPath),
					data,
					metaData
				);
			});

			result = this._parsedExpression.replace(
				PARSED_EXPRESSION_REGEX,
				(_match, number) => {
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
