import Formula from './Formula';
import ConcatenatedText from './ConcatenatedText';
import DefaultValue from './DefaultValue';

export default class FormulaValue {

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

	static isFormulaValue(expression) {
		return Formula.isFormula(expression) || ConcatenatedText.isConcatenatedText(expression);
	}

}
