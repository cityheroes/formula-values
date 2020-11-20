import {
	patterns as helperPatterns
} from './helpers';
import { Variable } from './variable';

const VARIABLE_REGEX = new RegExp(helperPatterns.variable, 'g');

export interface Rule {
	pattern: string;
	replacement: string | ((matchValue: string, ...partialMatches: string[]) => string);
}

export abstract class CompiledExpression {

	_variables = [];
	_parsedExpression: string;

	constructor(rules: Rule[], expression: string) {
		rules.forEach(rule => {
			expression = expression.replace(new RegExp(rule.pattern, 'g'), rule.replacement as string);
		});

		const variablesCache = {};
		this._parsedExpression = expression.replace(VARIABLE_REGEX, (_match, variableText: string) => {
			variableText = variableText.trim();
			if (Variable.isValid(variableText)) {
				if (!variablesCache[variableText]) {
					variablesCache[variableText] = this._variables.length;
					this._variables.push(new Variable(variableText));
				}
				return `[*${variablesCache[variableText]}*]`;
			} else {
				return `{{${variableText}}}`;
			}
		});
	}

	abstract eval(...params: unknown[]): unknown;

	abstract getDependencies(): string[];

}
