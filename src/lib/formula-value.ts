import { CompiledExpression } from './compiled-expression';
import { ConcatenatedText } from './concatenated-text';
import { DefaultValue } from './default-value';
import { Formula } from './formula';

export class FormulaValue {

	compiledExpression: CompiledExpression;

	constructor(expression = '') {
		if (Formula.isFormula(expression)) {
			this.compiledExpression = new Formula(expression);
		} else if (ConcatenatedText.isConcatenatedText(expression)) {
			this.compiledExpression = new ConcatenatedText(expression);
		} else {
			this.compiledExpression = new DefaultValue(expression);
		}
	}

	eval(data = {}, metaData = {}, context = '') {
		return this.compiledExpression.eval(data, metaData, context);
	}

	static isFormulaValue(expression: string) {
		return Formula.isFormula(expression) || ConcatenatedText.isConcatenatedText(expression);
	}

}
