import _ from 'underscore';
import moment from 'moment';

let getPath = (context) => {
	if (!context) {
		return [];
	}
	var toProcess = context.split(/\.|::/);
	var path;
	var processed = [];

	// Use of .shift() was preferred over other iteration methods for performance reasons.
	// check this test: https://jsperf.com/shift-vs-traditional-loop

	while(toProcess.length > 0) {
		var element = toProcess.shift();
		element = element.replace(/(.*)\[(@|\*|\d+)]/g, function(completeField, field, arrayValue) {
			processed.push(field);
			if (arrayValue !== '@' && arrayValue !== '*') {
				arrayValue = Number(arrayValue);
			}
			processed.push(arrayValue);
			return '';
		});
		if (element) {
			processed.push(element);
		}
	}
	return processed;
};

let assignTo = (variable, path, index, value) => {
	var pathRoute = getPath(path);
	if ('undefined' !== typeof index) {
		pathRoute.push(index);
	}
	while (pathRoute.length) {
		var pathElement = pathRoute.shift();
		if (pathRoute.length > 0) {
			if (!variable[pathElement]) {
				var nextPathElement = pathRoute[0];
				if ('number' === typeof nextPathElement) {
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

let compact = (variable, path) => {
	var pathRoute = getPath(path);
	while (pathRoute.length) {
		var pathElement = pathRoute.shift();
		if (pathRoute.length > 0) {
			if (!variable[pathElement]) {
				var nextPathElement = pathRoute[0];
				if ('number' === typeof nextPathElement) {
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

let getDateTimeFormat = function(date) {
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

let validateOperation = function(date1format, date2format, unit) {
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

let evalWithSafeEnvironment = (function () {

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

export default {

	getPath: getPath,
	assignTo: assignTo,
	compact: compact,
	patterns: {
		variable: '{{([^}]+)}}'
	},
	dataVarName: 'data',
	metaDataVarName: 'metaData',
	evalWithSafeEnvironment: evalWithSafeEnvironment

};
