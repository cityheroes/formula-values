import _ from 'underscore';
import Helpers from './Helpers';

const INVALID_VARIABLE_REGEX = new RegExp(Helpers.patterns.invalidVariable);

export default class Variable {

	constructor(text) {

		this._path = Helpers.processPath(text);

		this._hasStar = this._path.indexOf('*') > -1;
		this._hasAt = this._path.indexOf('@') > -1;
		this._hasContext = this._hasAt;

		if (text.indexOf('::') > -1) {
			this._environment = Helpers.metaDataVarName;
		} else {
			this._environment = Helpers.dataVarName;
		}

		if (text === '') {
			this._parsedVariable = 'null';
		} else if (!this._hasContext) {
			this._parsedVariable = Variable._parse(this._path, this._environment);
		}
	}

	parseVariable(contextPath) {
		return (this._parsedVariable || this._parseWithContext(contextPath));
	}

	_parseWithContext(contextPath) {
		let index = 0,
			contextLength = contextPath.length,
			pathLength = this._path.length,
			fieldPath = this._path.slice();

		for (; index < contextLength && index < pathLength; index++) {
			if (fieldPath[index] === '@' && _.isNumber(contextPath[index])) {
				fieldPath[index] = Number(contextPath[index]);
			} else if (fieldPath[index] !== contextPath[index] || fieldPath[index] === '*') {
				break;
			}
		}
		for (; index < pathLength; index++) {
			if (fieldPath[index] === '@') {
				throw new Error('Context could not fully resolve');
			}
		}

		return Variable._parse(fieldPath, this._environment);
	}

	hasStar() {
		return this._hasStar;
	}

	hasAt() {
		return this._hasAt;
	}

	static isValid(text) {
		return !INVALID_VARIABLE_REGEX.test(text);
	}

	static _parse(path, environment) {
 		let pathElement,
			hasStarOperator = false,
			parsedVariable = environment;
		for (let i = 0, len = path.length; i < len; i++) {
			pathElement = path[i];
			if (pathElement === '*') {
				if (hasStarOperator) {
					parsedVariable += '")';
				} else {
					hasStarOperator = true;
				}
				parsedVariable = '__processStarOperator(' + parsedVariable + ',"';
			} else {
				parsedVariable += '[\'' + pathElement + '\']';
			}
		}
		if (hasStarOperator) {
			parsedVariable += '")';
		}
		return parsedVariable;
	}

}
