import Formula from './Formula';
import ConcatenatedText from './ConcatenatedText';
import DefaultValue from './DefaultValue';

export default class FormulaValue {

	constructor(expression = '') {
		if (Formula.isFormula(expression)) {
			this.compiledExpression = new Formula(expression);
		} else if (ConcatenatedText.isConcatenatedText(expression)) {
			this.compiledExpression = new ConcatenatedText();
		} else {
			this.compiledExpression = new DefaultValue(expression);
		}
	}

	eval(data = {}, metaData = {}, context = '') {
		let result = null;
		try {
			result = this.compiledExpression.eval(data, metaData, context);
		} catch (error) {
			console.error(error);
		}
		return result;
	}

	static isFormulaValue(expression) {
		return Formula.isFormula(expression) || ConcatenatedText.isConcatenatedText(expression);
	}

}
