import _ from 'underscore';
import moment from 'moment';

const ARRAY_REFERENCE_REGEX = /(.*)\[(@|\*|\d+)]/g;

const processPath = (context) => {
	if (!context) {
		return [];
	}
	let toProcess = context.split(/\.|::/),
		processed = [],
		processArray = (completeField, field, arrayValue) => {
			processed.push(field);
			if (arrayValue !== '@' && arrayValue !== '*') {
				arrayValue = Number(arrayValue);
			}
			processed.push(arrayValue);
			return '';
		};

	// Use of .shift() was preferred over other iteration methods for performance reasons.
	// check this test: https://jsperf.com/shift-vs-traditional-loop
	let element;
	while(toProcess.length > 0) {
		element = toProcess.shift();
		element = element.replace(ARRAY_REFERENCE_REGEX, processArray);
		if (element) {
			processed.push(element);
		}
	}
	return processed;
};

const assignTo = (variable, path, index, value) => {
	let pathRoute = processPath(path);
	if ('undefined' !== typeof index) {
		pathRoute.push(index);
	}

	let pathElement;
	while (pathRoute.length) {
		pathElement = pathRoute.shift();
		if (pathRoute.length > 0) {
			if (!variable[pathElement]) {
				if ('number' === typeof pathRoute[0]) {
					variable[pathElement] = [];
				} else {
					variable[pathElement] = {};
				}
			}
			variable = variable[pathElement];
		} else {
			variable[pathElement] = value;
		}
	}
};

const compact = (variable, path) => {
	let pathRoute = processPath(path),
		pathElement;
	while (pathRoute.length) {
		pathElement = pathRoute.shift();
		if (pathRoute.length > 0) {
			if (!variable[pathElement]) {
				if ('number' === typeof pathRoute[0]) {
					variable[pathElement] = [];
				} else {
					variable[pathElement] = {};
				}
			}
			variable = variable[pathElement];
		} else {
			variable[pathElement] = _.compact(variable[pathElement]);
		}
	}
};

const getDateTimeFormat = (date) => {
	if (!date || 'string' !== typeof date) {
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

const validateOperation = (date1format, date2format, unit) => {
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

const evalWithSafeEnvironment = (function () {

	const __defaultSpec = 'seconds',
		__availableSpecs = {
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

	const __processStarOperator = (array, path) => {
		let result = [];
		if (array && _.isArray(array) && array.length) {
			let value,
				pushNestedElement = (nestedElement) => {
					value.push(eval('nestedElement' + path));
				};
			for (let i = 0, len = array.length; i < len; i++) {
				if (_.isArray(array[i])) {
					value = [];
					array[i].forEach(pushNestedElement);
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

	const dateDiff = (date1, date2, spec) => {
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
	};

	const sum = (array) => {
		let total = 0;
		if (array && _.isArray(array) && array.length) {
			for (let i = 0, len = array.length; i < len; i++) {
				if (array[i]) {
					total += array[i];
				}
			}
		}
		return total;
	};

	const extract = (text, separator, index) => {
		text = 'string' === typeof text ? text : (text || '');
		separator = separator || ',';
		index = index || 0;

		let extractedValue = text.split(separator)[index];

		return isNaN(extractedValue) ? extractedValue : Number(extractedValue);
	};

	const flatten = _.flatten;

	const groupConcat = (array, separator = ', ') => {
		return array.join(separator);
	};

	function concat() {
		var elements = Array.prototype.slice.call(arguments);
		return elements.join('');
	}
	function max(value) {
		if (Array.isArray(value) && value.length > 0) {
			return _.max(value);
		} else {
				console.warn('Invalid array');
				return null;
		};
	};
	function min(value) {
		if (Array.isArray(value) && value.length > 0) {
			return _.min(value)
		} else {
				console.warn('Invalid array');
				return null;
		};
	};
	const count = (array) => {
		return array.length;
	};

	const avg = (array) => {
		let total = sum(array);
		if (array && _.isArray(array) && array.length > 0) {
			total /= array.length;
		}
		return total;
	};

	const formatDate = (date, format, isUTC) => {
		if (isUTC) {
			return moment.utc(date).local().format(format);
		} else {
			return moment(date).format(format);
		}
	};

	return function(formula, data, metaData) {
		try {
			return eval(formula);
		} catch(e) {
			return '';
		}
	};
}).call();

export default {

	processPath: processPath,
	assignTo: assignTo,
	compact: compact,
	patterns: {
		variable: '{{([^}]+)}}',
		parsedExpression: '\\[\\*(\\d*)\\*\\]',
		invalidVariable: '\\[(?!(?:@|\\*|\\d+)\\]|[\\.$])|^[^\\[]*\\]|\\][^\\[]*\\]|[\\{\\}]|\\][]|\\][^\\.\\[]'
	},
	dataVarName: 'data',
	metaDataVarName: 'metaData',
	evalWithSafeEnvironment: evalWithSafeEnvironment

};
