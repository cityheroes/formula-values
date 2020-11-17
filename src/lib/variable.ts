import {
	isNumber as _isNumber
} from 'lodash-es';

import {
	dataVarName,
	patterns as helperPatterns,
	metaDataVarName,
	processPath,
	RoutePath
} from './helpers';

const INVALID_VARIABLE_REGEX = new RegExp(helperPatterns.invalidVariable);

export class Variable {

	_path: RoutePath;
	_hasStar: boolean;
	_hasAt: boolean;
	_hasContext: boolean;
	_environment: 'metaData' | 'data';
	_parsedVariable: string;

	constructor(text: string) {

		this._path = processPath(text);

		this._hasStar = this._path.indexOf('*') > -1;
		this._hasAt = this._path.indexOf('@') > -1;
		this._hasContext = this._hasAt;

		if (text.indexOf('::') > -1) {
			this._environment = metaDataVarName;
		} else {
			this._environment = dataVarName;
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
		let index = 0;
		const contextLength = contextPath.length;
		const pathLength = this._path.length;
		const fieldPath = this._path.slice();

		for (; index < contextLength && index < pathLength; index++) {
			if (fieldPath[index] === '@' && _isNumber(contextPath[index])) {
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

	static isValid(text: string) {
		return !INVALID_VARIABLE_REGEX.test(text);
	}

	static _parse(path: unknown[], environment: string) {
		let hasStarOperator = false;
		let parsedVariable = environment;
		path.forEach(pathElement => {
			if (pathElement === '*') {
				if (hasStarOperator) {
					parsedVariable += `")`;
				} else {
					hasStarOperator = true;
				}
				parsedVariable = `__processStarOperator(${parsedVariable},"`;
			} else {
				parsedVariable += `['${pathElement}']`;
			}
		});
		if (hasStarOperator) {
			parsedVariable += `")`;
		}
		return parsedVariable;
	}

}
