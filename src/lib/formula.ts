import { CompiledExpression, Rule } from './compiled-expression';
import { evalWithSafeEnvironment, processPath, RoutePath } from './helpers';

const CLEANING_RULES: Rule[] = [
	{
		pattern: '^=',
		replacement: ''
	},
	{
		pattern: '\'',
		replacement: '\\\''
	}
];

export class Formula extends CompiledExpression {

	constructor(expression: string) {
		super(CLEANING_RULES, expression);
	}

	eval(data: Record<string, unknown>, metaData: Record<string, unknown>, context: string) {
		let result = null;
		try {
			const contextPath: RoutePath = processPath(context);
			const parsedVariables = this._variables.map(variable => variable.parseVariable(contextPath));
			const resolvedParsedExpression = this._parsedExpression.replace(
				/\[\*(\d*)\*\]/g,
				(_match, number) => {
					return parsedVariables[parseInt(number)];
				}
			);
			result = evalWithSafeEnvironment(resolvedParsedExpression, data, metaData);
		} catch (error) {
			console.warn(error);
		}
		return result;
	}

	getDependencies() {
		return this._variables.map((fieldPath) => fieldPath.split('::').shift());
	}

	static isFormula(expression: string) {
		return 'string' === typeof expression && expression.indexOf('=') === 0;
	}

}
