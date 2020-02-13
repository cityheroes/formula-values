import Variable from './Variable';
import Helpers from './Helpers';

const VARIABLE_REGEX = new RegExp(Helpers.patterns.variable, 'g');

export default class CompiledExpression {

	constructor(rules, expression) {
		this._variables = [];

		for (var i = 0, size = rules.length; i < size; i++) {
			var rule = rules[i];
			expression = expression.replace(new RegExp(rule.pattern, 'g'), rule.replacement);
		}

		const variablesCache = {};
		this._parsedExpression = expression.replace(VARIABLE_REGEX, (match, variableText) => {
			if (Variable.isValid(variableText)) {
				if (!variablesCache[variableText]) {
					variablesCache[variableText] = this._variables.length;
					this._variables.push(new Variable(variableText));
				}
				return '[*' + variablesCache[variableText] + '*]';
			} else {
				return '{{' + variableText + '}}';
			}
		});
	}

	eval() {
		throw new Error('Eval is not implemented');
	}

	getDependencies() {
		throw new Error('GetDependencies is not implemented');
	}

}
