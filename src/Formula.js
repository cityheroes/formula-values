import CompiledExpression from './CompiledExpression';
import Variable from './Variable';
import Helpers from './Helpers';
import _ from 'underscore';
import moment from 'moment';

var dataVarName = 'data',
	metaDataVarName = 'metaData';

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
		let date1format = getDateTimeFormat(date1),
			date2format = getDateTimeFormat(date2);
		spec = __availableSpecs[spec] || __defaultSpec;
		if (validateOperation(date1format, date2format, spec)) {
			date1 = moment(date1, date1format);
			date2 = moment(date2, date2format);
			return date1.diff(date2, spec);
		} else {
			console.warn('Invalid inputs at dateDiff.');
			return null;
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

	return function(formula, data, metaData) {
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
	}
];

export default class Formula extends CompiledExpression {

	constructor(expression) {
		super(expression);

		this._variables = [];

		const variablesCache = {};

		for(var i = 0, size = rules.length; i < size; i++) {
			var rule = rules[i];
			expression = expression.replace(new RegExp(rule.pattern, 'g'), rule.replacement);
		}


		this._parsedExpression = expression.replace(new RegExp(Helpers.patterns.variable, 'g'), (match, variableText) => {
			if (!variablesCache[variableText]) {
				variablesCache[variableText] = this._variables.length;
				this._variables.push(new Variable(variableText));
			}
			return '[*' + variablesCache[variableText] + '*]';
		});

	}

	static isFormula(expression) {
		return 'string' === typeof expression && expression.indexOf('=') === 0;
	}

	eval(data, metaData, context) {
		var contextPath = Helpers.getPath(context);
		var parsedVariables = this._variables.map((variable) => {
			return variable.parseVariable(contextPath);
		});

		let resolvedParsedExpression = this._parsedExpression.replace(/\[\*(\d*)\*\]/g, (match, number) => {
			return parsedVariables[parseInt(number)];
		});

		let value = evalWithSafeEnvironment(resolvedParsedExpression, data, metaData);
		return value;
	}

	getDependencies() {
		return this._variables.map((fieldPath) => fieldPath.split('::').shift());
	}

}
