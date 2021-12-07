var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "dayjs", "dayjs/plugin/advancedFormat", "dayjs/plugin/utc", "lodash"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.metaDataVarName = exports.dataVarName = exports.patterns = exports.evalWithSafeEnvironment = exports.compact = exports.assignTo = exports.processPath = void 0;
    var dayjs_1 = __importDefault(require("dayjs"));
    var advancedFormat_1 = __importDefault(require("dayjs/plugin/advancedFormat"));
    var utc_1 = __importDefault(require("dayjs/plugin/utc"));
    var lodash_1 = __importDefault(require("lodash"));
    dayjs_1.default.extend(advancedFormat_1.default);
    dayjs_1.default.extend(utc_1.default);
    var ARRAY_REFERENCE_REGEX = /(.*)\[(@|\*|\d+)]/g;
    exports.processPath = function (context) {
        if (!context) {
            return [];
        }
        var toProcess = context.split(/\.|::/);
        var processed = [];
        var processArray = function (_completeField, field, arrayValue) {
            processed.push(field);
            if (arrayValue !== '@' && arrayValue !== '*') {
                processed.push(Number(arrayValue));
            }
            else {
                processed.push(arrayValue);
            }
            return '';
        };
        toProcess.forEach(function (element) {
            element = element.replace(ARRAY_REFERENCE_REGEX, processArray);
            if (element) {
                processed.push(element);
            }
        });
        return processed;
    };
    exports.assignTo = function (variable, path, index, value) {
        var pathRoute = exports.processPath(path);
        if ('undefined' !== typeof index) {
            pathRoute.push(index);
        }
        pathRoute.forEach(function (pathElement) {
            if (pathRoute.length > 0) {
                if (!variable[pathElement]) {
                    if ('number' === typeof pathRoute[0]) {
                        variable[pathElement] = [];
                    }
                    else {
                        variable[pathElement] = {};
                    }
                }
                variable = variable[pathElement];
            }
            else {
                variable[pathElement] = value;
            }
        });
    };
    exports.compact = function (variable, path) {
        var pathRoute = exports.processPath(path);
        pathRoute.forEach(function (pathElement) {
            if (pathRoute.length > 0) {
                if (!variable[pathElement]) {
                    if ('number' === typeof pathRoute[0]) {
                        variable[pathElement] = [];
                    }
                    else {
                        variable[pathElement] = {};
                    }
                }
                variable = variable[pathElement];
            }
            else {
                variable[pathElement] = lodash_1.default.compact(variable[pathElement]);
            }
        });
    };
    var getDateTimeFormat = function (date) {
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
    var validateOperation = function (date1format, date2format, unit) {
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
    exports.evalWithSafeEnvironment = (function () {
        var __defaultSpec = 'second';
        var __availableSpecs = {
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
        var __processStarOperator = function (array, path) {
            var result = [];
            if (array && lodash_1.default.isArray(array) && array.length) {
                array.forEach(function (item) {
                    var value;
                    if (lodash_1.default.isArray(item)) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        value = item.map(function (nestedElement) { return eval("nestedElement" + path); });
                    }
                    else {
                        value = null;
                        try {
                            value = eval("item" + path);
                        }
                        catch (error) {
                            console.warn(error);
                        }
                    }
                    result.push(value);
                });
            }
            return result;
        };
        var __createObjectDate = function (date, dateFormat) {
            if (dateFormat === 'HH:mm:ss') {
                var splitDateFormat = date.split(':');
                var parsedDateFormat = dayjs_1.default()
                    .hour(Number(splitDateFormat[0]))
                    .minute(Number(splitDateFormat[1]))
                    .second(Number(splitDateFormat[2]));
                return parsedDateFormat;
            }
            else {
                return dayjs_1.default(date, dateFormat);
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var dateDiff = function (date1, date2, spec) {
            var date1format = getDateTimeFormat(date1);
            var date2format = getDateTimeFormat(date2);
            var unit = __availableSpecs[spec] || __defaultSpec;
            if (validateOperation(date1format, date2format, unit)) {
                var parsedDate1 = __createObjectDate(date1, date1format);
                var parsedDate2 = __createObjectDate(date2, date2format);
                var diff = parsedDate1.diff(parsedDate2, unit);
                return isNaN(diff) ? null : diff;
            }
            else {
                console.warn('Invalid inputs at dateDiff.');
                return null;
            }
        };
        var datetimeFromNowDeltas = [
            'year',
            'month',
            'day',
            'hour',
            'minute',
            'second'
        ];
        var datetimeFromNow = function () {
            var deltas = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                deltas[_i] = arguments[_i];
            }
            var result = datetimeFromNowDeltas.reduce(function (currentDatetime, delta, index) {
                var deltaValue = deltas[index];
                if (!deltaValue) {
                    return currentDatetime;
                }
                if (deltaValue > 0) {
                    return currentDatetime.add(deltaValue, delta);
                }
                else {
                    return currentDatetime.subtract(-deltaValue, delta);
                }
            }, dayjs_1.default().set('millisecond', 0));
            return result.toISOString();
        };
        var sum = function (array) {
            if (array && lodash_1.default.isArray(array) && array.length) {
                return array.reduce(function (accumulated, item) { return accumulated + item; }, 0);
            }
            else {
                return 0;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var extract = function (text, separator, index) {
            if (separator === void 0) { separator = ','; }
            if (index === void 0) { index = 0; }
            text = ('string' === typeof text)
                ? text
                : text || '';
            separator = separator || ',';
            index = index || 0;
            var extractedValue = text.split(separator)[index];
            var numberParsedValue = Number(extractedValue);
            return isNaN(numberParsedValue) ? extractedValue : numberParsedValue;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var flatten = function (array, depth) {
            if (depth === void 0) { depth = false; }
            if (depth === true || depth === 1) {
                return lodash_1.default.flatten(array);
            }
            else if (depth === false) {
                return lodash_1.default.flattenDeep(array);
            }
            else {
                return lodash_1.default.flattenDepth(array, depth);
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var groupConcat = function (array, separator) {
            if (separator === void 0) { separator = ', '; }
            return array.join(separator);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var concat = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.join('');
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var max = function (value) {
            if (lodash_1.default.isArray(value) && value.length > 0) {
                return lodash_1.default.max(value);
            }
            else {
                console.warn('Invalid array');
                return null;
            }
            ;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function min(value) {
            if (lodash_1.default.isArray(value) && value.length > 0) {
                return lodash_1.default.min(value);
            }
            else {
                console.warn('Invalid array');
                return null;
            }
            ;
        }
        ;
        var count = function (array) {
            if (array === void 0) { array = []; }
            if (array && lodash_1.default.isArray(array) && array.length > 0) {
                return array.length;
            }
            return 0;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var avg = function (array) {
            var total = sum(array);
            var elementCount = count(array);
            if (total && elementCount) {
                return total / elementCount;
            }
            return total;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var formatDate = function (date, format, isUTC) {
            format = format.replace('LT', 'hh:mm A');
            if (isUTC) {
                return dayjs_1.default.utc(date).local().format(format);
            }
            else {
                return dayjs_1.default(date).format(format);
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return function (formula, data, metaData) {
            try {
                return eval(formula);
            }
            catch (e) {
                return null;
            }
        };
    }).call(null);
    exports.patterns = {
        variable: '{{\\s?([^}]+)\\s?}}',
        parsedExpression: '\\[\\*(\\d*)\\*\\]',
        invalidVariable: '\\[(?!(?:@|\\*|\\d+)\\]|[\\.$])|^[^\\[]*\\]|\\][^\\[]*\\]|[\\{\\}]|\\][]|\\][^\\.\\[]'
    };
    exports.dataVarName = 'data';
    exports.metaDataVarName = 'metaData';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFBQSxnREFBcUM7SUFFckMsK0VBQXlEO0lBQ3pELHlEQUFtQztJQUNuQyxrREFBNEI7SUFFNUIsZUFBSyxDQUFDLE1BQU0sQ0FBQyx3QkFBYyxDQUFDLENBQUM7SUFDN0IsZUFBSyxDQUFDLE1BQU0sQ0FBQyxhQUFHLENBQUMsQ0FBQztJQUtsQixJQUFNLHFCQUFxQixHQUFHLG9CQUFvQixDQUFDO0lBRXRDLFFBQUEsV0FBVyxHQUFHLFVBQUMsT0FBZ0I7UUFDM0MsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNiLE9BQU8sRUFBRSxDQUFDO1NBQ1Y7UUFDRCxJQUFNLFNBQVMsR0FBYSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELElBQU0sU0FBUyxHQUFjLEVBQUUsQ0FBQztRQUNoQyxJQUFNLFlBQVksR0FBRyxVQUFDLGNBQXNCLEVBQUUsS0FBYSxFQUFFLFVBQWtCO1lBQzlFLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsSUFBSSxVQUFVLEtBQUssR0FBRyxJQUFJLFVBQVUsS0FBSyxHQUFHLEVBQUU7Z0JBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDbkM7aUJBQU07Z0JBQ04sU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMzQjtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDO1FBRUYsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDL0QsSUFBSSxPQUFPLEVBQUU7Z0JBQ1osU0FBUyxDQUFDLElB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