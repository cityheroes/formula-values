import CompiledExpression from './CompiledExpression';
import Helpers from './Helpers';
import moment from 'moment';

var dataVarName = 'data',
	metaDataVarName = 'metaData',
	fieldPathsVarName = '__fieldPaths',
	variablePattern = '{{([^}]+)}}';

var getDateTimeFormat = function(date) {
	if (!date || typeof date !== 'string') {
		return '';
	}
	switch (date.length) {
		case 10:
			return 'YYYY-MM-DD';
		case 19:
			return 'YYYY-MM-DD HH:mm:ss';
		case 8:
			return 'HH:mm:ss';
		default:
			return '';
	}
};

var validateOperation = function(date1format, date2format, unit) {
	switch (unit) {
		case 'years':
		case 'months':
		case 'weeks':
		case 'days':
			if (date1format === 'HH:mm:ss' || date2format === 'HH:mm:ss') {
				return false;
			}
			break;
		case 'hours':
		case 'minutes':
		case 'seconds':
			if ((date1format === 'HH:mm:ss' || date2format === 'HH:mm:ss') && date1format !== date2format) {
				return false;
			}
			break;
		default:
			break;
	}
	return true;
};

var evalWithSafeEnvironment = (function () {

	var __availableSpecs = {
		Y: 'years',
		M: 'months',
		W: 'weeks',
		D: 'days',
		h: 'hours',
		m: 'minutes',
		s: 'seconds',
		years: 'years',
		months: 'months',
		weeks: 'weeks',
		days: 'days',
		hours: 'hours',
		minutes: 'minutes',
		seconds: 'seconds'
	};
	var __defaultSpec = 'seconds';

	var __processStarOperator = function(array, path) {
		var result = [];
		if (array && _.isArray(array) && array.length) {
			for (var i = 0, len = array.length; i < len; i++) {
				var value;
				if (_.isArray(array[i])) {
					value = [];
					array[i].forEach(function(nestedElement) {
						value.push(eval('nestedElement' + path));
					});
				} else {
					value = null;
					try {
						value = eval('array[i]' + path);
					} catch (error) {
						console.warn(error);
					}
				}
				result.push(value);
			}
		}
		return result;
	};

	function dateDiff(date1, date2, spec) {
		date1format = getDateTimeFormat(date1);
		date2format = getDateTimeFormat(date2);
		spec = __availableSpecs[spec] || __defaultSpec;
		if (validateOperation(date1format, date2format, spec)) {
			date1 = moment(date1, date1format);
			date2 = moment(date2, date2format);
			return date1.diff(date2, spec);
		} else {
			console.warn('Invalid inputs at dateDiff.');
		}
	}

	function sum(array) {
		var total = 0;
		if (array && _.isArray(array) && array.length) {
			for (var i = 0, len = array.length; i < len; i++) {
				if (array[i]) {
					total += array[i];
				}
			}
		}
		return total;
	}

	function extract(text, separator, index) {
		text = 'string' === typeof text ? text : (text || '');
		separator = separator || ',';
		index = index || 0;

		var extractedValue = text.split(separator)[index],
			result = isNaN(extractedValue) ? extractedValue : Number(extractedValue);

		return result;
	}

	function flatten(array, shallow) {
		return _.flatten(array, shallow);
	}

	function groupConcat(array, separator) {
		separator = typeof separator === 'undefined' ? ', ' : separator;
		return array.join(separator);
	}

	function concat() {
		var elements = Array.prototype.slice.call(arguments);
		return elements.join('');
	}

	function count(array) {
		return array.length;
	}

	function avg(array) {
		var total = sum(array);
		if (array && _.isArray(array) && array.length>0) {
			total = total / array.length;
		}
		return total;
	}

	return function(formula, environment) {
		return eval(formula);
	};
}).call();

var rules = [
	{
		pattern: '^=',
		replacement: ''
	},
	{
		pattern: '\'',
		replacement: '\\\''
	},
	{
		pattern: variablePattern,
		requiresContext: true,
		replacement: function(matches, context) {
			variable = matches[1];
			var regex = /\[(?!(?:@|\*|\d+)\]|[\.$])|^[^\[]*\]|\][^\[]*\]|[\{\}]/;
			if (regex.test(variable)) {
				throw new Error();
			}
			var fieldPath = Helpers.getPath(variable);

			variable = 'environment';

			if (variable.indexOf('::') > -1) {
				variable += '[' + metaDataVarName + ']';
			} else {
				variable += '[' + dataVarName + ']';
			}

			var hasStarOperator = false;

			while(fieldPath.length > 0) {
				pathElement = fieldPath.shift();
				if (pathElement === '*') {
					if (hasStarOperator) {
						variable += '")';
					} else {
						hasStarOperator = true;
					}
					variable = '__processStarOperator(' + variable + ', "';
				} else {
					variable += '[' + pathElement + ']';
				}
			}

			if (hasStarOperator) {
				variable += '")';
			}
			return variable;
		}
	}
];

var resolveReferences = function(fieldPath, contextPath) {
	var resolveReferences = function(fieldPath, contextPath) {
	var index = 0;
	var contextLength = contextPath.length,
	    fieldLength = fieldPath.length;
	for (; index<contextLength && index < fieldLength; index++) {
		if (fieldPath[index] === '@' && _.isNumber(contextPath[index])) {
			fieldPath[index] = Number(contextPath[index]);
		} else if (fieldPath[index] !== contextPath[index] || fieldPath[index] === '*') {
			break;
		} else {
			fieldPath[index] = '\'' + fieldPath[index] + '\'';
		}
	}
	for (; index < fieldLength; index++) {
		if (fieldPath[index] === '@') {
			throw new Error('Context could not fully resolve');
		} else if (fieldPath[index] === '*') {
			fieldPath[index] = '*';
		} else if (typeof fieldPath[index] === 'string') {
			fieldPath[index] = '\'' + fieldPath[index] + '\'';
		}
	}
	return fieldPath;
};

};

export default class Formula extends CompiledExpression {

	constructor(expression) {
		super(expression);

		this._fieldPaths = [];

		const fieldPathsCache = {};

		for(var i = 0, size = rules.length; i < size; i++) {
			var rule = rules[i];
			if (typeof rule.replacement === 'function' && rule.requiresContext) {
				expression = expression.replace(new RegExp(rule.pattern, 'g'), function() {
					let parsedFieldPath = rule.replacement(arguments, context);
					if (!fieldPathsCache[parsedFieldPath]) {
						fieldPathsCache[parsedFieldPath] = this._fieldPaths.length;
						this._fieldPaths.push(parsedFieldPath);
					}
					return fieldPathsVarName + '[' + fieldPathsCache[parsedFieldPath] + ']';
				});
			} else {
				expression = expression.replace(new RegExp(rule.pattern, 'g'), rule.replacement);
			}
		}

		this._parsedExpression = expression;

	}

	static isFormula(expression) {
		return 'string' === typeof expression && expression.indexOf('=') === 0;
	}

	eval(data, metaData, context) {
		var contextPath = Helpers.getPath(context);
		var resolvedFieldPaths = this._fieldPaths.map((fieldPath) => resolveReferences(fieldPath, contextPath));

		let environment = {};
		environment[dataVarName] = data;
		environment[metaDataVarName] = metaData;
		environment[fieldPathsVarName] = resolvedFieldPaths;

		value = evalWithSafeEnvironment(this._parsedExpression, environment);
		return value;
	}

	getDependencies() {
		return this._fieldPaths.map((fieldPath) => fieldPath.split('::').shift());
	}

}
