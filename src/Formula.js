export default class Formula {

	static isFormula(expression) {
		return 'string' === typeof expression && expression.indexOf('=') === 0;
	}

}
