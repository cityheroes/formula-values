import _ from 'underscore';
import Helpers from './Helpers';

const INVALID_VARIABLE_REGEX = new RegExp(Helpers.patterns.invalidVariable);

export default class Variable {

	constructor(text) {

		this._hasContext = false;
		this._hasStar = false;
		this._hasAt = false;

		let tempPath = Helpers.getPath(text);

		let tempPathElement;
		for (let i = tempPath.length - 1; i >= 0; i--) {
			tempPathElement = tempPath[i];
			if (tempPathElement !== '@' && tempPathElement !== '*') {
				tempPath[i] = tempPathElement;
			} else {
				this._hasContext = true;
				if (tempPathElement === '*') {
					this._hasStar = true;
				} else if (tempPathElement === '@') {
					this._hasAt = true;
				}
			}
		}

		this._path = tempPath;

		if (text.indexOf('::') > -1) {
			this._environment = Helpers.metaDataVarName;
		} else {
			this._environment = Helpers.dataVarName;
		}

		if (text === '') {
			this._parsedVariable = 'null';
		} else if (!this._hasContext) {
			let parsedVariable = this._environment;
			for (let i = 0, len = tempPath.length; i < len; i++) {
				parsedVariable += '[\'' + tempPath[i] + '\']';
			}
			this._parsedVariable = parsedVariable;
		}
	}

	parseVariable(contextPath) {
		return (this._parsedVariable || this._parseWithEnvironment(contextPath));
	}

	_parseWithEnvironment(contextPath) {
		let index = 0,
			contextLength = contextPath.length,
			pathLength = this._path.length,
			fieldPath = this._path;

		for (; index<contextLength && index < pathLength; index++) {
			if (fieldPath[index] === '@' && _.isNumber(contextPath[index])) {
				fieldPath[index] = Number(contextPath[index]);
			} else if (fieldPath[index] !== contextPath[index] || fieldPath[index] === '*') {
				break;
			}
		}
		for (; index < pathLength; index++) {
			if (fieldPath[index] === '@') {
				throw new Error('Context could not fully resolve');
			} else if (fieldPath[index] === '*') {
				fieldPath[index] = '*';
			}
		}

		let pathElement,
			hasStarOperator = false,
			parsedVariable = this._environment;
		for (let i = 0, len = this._path.length; i < len; i++) {
			pathElement = this._path[i];
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

	hasStar() {
		return this._hasStar;
	}

	hasAt() {
		return this._hasAt;
	}

	static isValid(text) {
		return !INVALID_VARIABLE_REGEX.test(text);
	}

}
