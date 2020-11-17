import dayjs, { Dayjs } from 'dayjs';
import { OpUnitType, QUnitType } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import {
	compact as _compact,
	flatten as _flatten,
	flattenDeep as _flattenDeep,
	flattenDepth as _flattenDepth,
	isArray as _isArray,
	max as _max,
	min as _min
} from 'lodash-es';

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export type RoutePath = (string | number)[];
export type DateType = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'HH:mm:ss';

const ARRAY_REFERENCE_REGEX = /(.*)\[(@|\*|\d+)]/g;

export const processPath = (context?: string): RoutePath => {
	if (!context) {
		return [];
	}
	const toProcess: string[] = context.split(/\.|::/);
	const processed: RoutePath = [];
	const processArray = (_completeField: string, field: string, arrayValue: string) => {
		processed.push(field);
		if (arrayValue !== '@' && arrayValue !== '*') {
			processed.push(Number(arrayValue));
		} else {
			processed.push(arrayValue);
		}
		return '';
	};

	toProcess.forEach(element => {
		element = element.replace(ARRAY_REFERENCE_REGEX, processArray);
		if (element) {
			processed.push(element);
		}
	});
	return processed;
};

export const assignTo = (variable, path: string, index: number, value) => {
	const pathRoute: RoutePath = processPath(path);
	if ('undefined' !== typeof index) {
		pathRoute.push(index);
	}

	pathRoute.forEach(pathElement => {
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
	});
};

export const compact = (variable, path) => {
	const pathRoute: RoutePath = processPath(path);

	pathRoute.forEach(pathElement => {
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
			variable[pathElement] = _compact(variable[pathElement]);
		}
	});
};

const getDateTimeFormat = (date: string): DateType | '' => {
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

const validateOperation = (date1format: string, date2format: string, unit: string) => {
	switch (unit) {
		case 'year':
		case 'month':
		case 'week':
		case 'day':
			if (date1format === 'HH:mm:ss' || date2format === 'HH:mm:ss') {
				return false;
			}
			break;
		case 'hour':
		case 'minute':
		case 'second':
			return date1format === date2format || (date1format !== 'HH:mm:ss' && date2format !== 'HH:mm:ss');
		default:
			break;
	}
	return true;
};

export const evalWithSafeEnvironment = (function () {

	const __defaultSpec: OpUnitType = 'second';
	const __availableSpecs: Record<string, OpUnitType | QUnitType> = {
		Y: 'year',
		M: 'month',
		W: 'week',
		D: 'day',
		h: 'hour',
		m: 'minute',
		s: 'second',
		years: 'year',
		months: 'month',
		weeks: 'week',
		days: 'day',
		hours: 'hour',
		minutes: 'minute',
		seconds: 'second'
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const __processStarOperator = (array, path: string) => {
		const result = [];
		if (array && _isArray(array) && array.length) {
			array.forEach(item => {
				let value;
				if (_isArray(item)) {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					value = item.map(nestedElement => eval(`nestedElement${path}`));
				} else {
					value = null;
					try {
						value = eval(`item${path}`);
					} catch (error) {
						console.warn(error);
					}
				}
				result.push(value);
			});
		}
		return result;
	};

	const __createObjectDate = (date: string, dateFormat: DateType | ''): Dayjs => {
		if (dateFormat === 'HH:mm:ss') {
			const splitDateFormat = date.split(':');
			const parsedDateFormat = dayjs()
				.hour(Number(splitDateFormat[0]))
				.minute(Number(splitDateFormat[1]))
				.second(Number(splitDateFormat[2]));
			return parsedDateFormat;
		} else {
			return dayjs(date, dateFormat);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const dateDiff = (date1: string, date2: string, spec: string) => {

		const date1format = getDateTimeFormat(date1);
		const date2format = getDateTimeFormat(date2);

		const unit: QUnitType | OpUnitType = __availableSpecs[spec] || __defaultSpec;
		if (validateOperation(date1format, date2format, unit)) {
			const parsedDate1 = __createObjectDate(date1, date1format);
			const parsedDate2 = __createObjectDate(date2, date2format);
			const diff = parsedDate1.diff(parsedDate2, unit);
			return isNaN(diff) ? null : diff;
		} else {
			console.warn('Invalid inputs at dateDiff.');
			return null;
		}
	};

	const sum = (array: number[]) => {
		if (array && _isArray(array) && array.length) {
			return array.reduce((accumulated, item) => accumulated + item, 0);
		} else {
			return 0;
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const extract = (text: string, separator = ',', index = 0) => {
		text = ('string' === typeof text)
			? text
			: text || '';
		separator = separator || ',';
		index = index || 0;

		const extractedValue: string = text.split(separator)[index];
		const numberParsedValue = Number(extractedValue);

		return isNaN(numberParsedValue) ? extractedValue : numberParsedValue;
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const flatten = (array, depth: number | boolean = false) => {
		if (depth === true || depth === 1) {
			return _flatten(array);
		} else if (depth === false) {
			return _flattenDeep(array);
		} else {
			return _flattenDepth(array, depth);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const groupConcat = (array: unknown[], separator = ', ') => {
		return array.join(separator);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const concat = (...args: unknown[]) => {
		return args.join('');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const max = (value: number[]) => {
		if (_isArray(value) && value.length > 0) {
			return _max(value);
		} else {
			console.warn('Invalid array');
			return null;
		};
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function min(value: number[]) {
		if (_isArray(value) && value.length > 0) {
			return _min(value)
		} else {
			console.warn('Invalid array');
			return null;
		};
	};

	const count = (array: unknown[] = []) => {
		if (array && _isArray(array) && array.length > 0) {
			return array.length;
		}
		return 0;
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const avg = (array: number[]) => {
		const total = sum(array);
		const elementCount = count(array);
		if (total && elementCount) {
			return total / elementCount;
		}
		return total;
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const formatDate = (date: string, format: string, isUTC: boolean) => {
		format = format.replace('LT', 'hh:mm A');
		if (isUTC) {
			return dayjs.utc(date).local().format(format);
		} else {
			return dayjs(date).format(format);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return function (formula: string, data: Record<string, unknown>, metaData: Record<string, unknown>) {
		try {
			return eval(formula);
		} catch (e) {
			return null;
		}
	};
}).call(null);

export const patterns = {
	variable: '{{\\s?([^}]+)\\s?}}',
	parsedExpression: '\\[\\*(\\d*)\\*\\]',
	invalidVariable: '\\[(?!(?:@|\\*|\\d+)\\]|[\\.$])|^[^\\[]*\\]|\\][^\\[]*\\]|[\\{\\}]|\\][]|\\][^\\.\\[]'
};

export const dataVarName = 'data';
export const metaDataVarName = 'metaData';
