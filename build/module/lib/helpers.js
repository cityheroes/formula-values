import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import lodash from 'lodash';
dayjs.extend(advancedFormat);
dayjs.extend(utc);
const ARRAY_REFERENCE_REGEX = /(.*)\[(@|\*|\d+)]/g;
export const processPath = (context) => {
    if (!context) {
        return [];
    }
    const toProcess = context.split(/\.|::/);
    const processed = [];
    const processArray = (_completeField, field, arrayValue) => {
        processed.push(field);
        if (arrayValue !== '@' && arrayValue !== '*') {
            processed.push(Number(arrayValue));
        }
        else {
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
export const assignTo = (variable, path, index, value) => {
    const pathRoute = processPath(path);
    if ('undefined' !== typeof index) {
        pathRoute.push(index);
    }
    pathRoute.forEach(pathElement => {
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
export const compact = (variable, path) => {
    const pathRoute = processPath(path);
    pathRoute.forEach(pathElement => {
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
            variable[pathElement] = lodash.compact(variable[pathElement]);
        }
    });
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
    const __defaultSpec = 'second';
    const __availableSpecs = {
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
    const __processStarOperator = (array, path) => {
        const result = [];
        if (array && lodash.isArray(array) && array.length) {
            array.forEach(item => {
                let value;
                if (lodash.isArray(item)) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    value = item.map(nestedElement => eval(`nestedElement${path}`));
                }
                else {
                    value = null;
                    try {
                        value = eval(`item${path}`);
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
    const __createObjectDate = (date, dateFormat) => {
        if (dateFormat === 'HH:mm:ss') {
            const splitDateFormat = date.split(':');
            const parsedDateFormat = dayjs()
                .hour(Number(splitDateFormat[0]))
                .minute(Number(splitDateFormat[1]))
                .second(Number(splitDateFormat[2]));
            return parsedDateFormat;
        }
        else {
            return dayjs(date, dateFormat);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dateDiff = (date1, date2, spec) => {
        const date1format = getDateTimeFormat(date1);
        const date2format = getDateTimeFormat(date2);
        const unit = __availableSpecs[spec] || __defaultSpec;
        if (validateOperation(date1format, date2format, unit)) {
            const parsedDate1 = __createObjectDate(date1, date1format);
            const parsedDate2 = __createObjectDate(date2, date2format);
            const diff = parsedDate1.diff(parsedDate2, unit);
            return isNaN(diff) ? null : diff;
        }
        else {
            console.warn('Invalid inputs at dateDiff.');
            return null;
        }
    };
    const datetimeFromNowDeltas = [
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second'
    ];
    const datetimeFromNow = (...deltas) => {
        const result = datetimeFromNowDeltas.reduce((currentDatetime, delta, index) => {
            const deltaValue = deltas[index];
            if (!deltaValue) {
                return currentDatetime;
            }
            if (deltaValue > 0) {
                return currentDatetime.add(deltaValue, delta);
            }
            else {
                return currentDatetime.subtract(-deltaValue, delta);
            }
        }, dayjs().set('millisecond', 0));
        return result.toISOString();
    };
    const sum = (array) => {
        if (array && lodash.isArray(array) && array.length) {
            return array.reduce((accumulated, item) => accumulated + item, 0);
        }
        else {
            return 0;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const extract = (text, separator = ',', index = 0) => {
        text = ('string' === typeof text)
            ? text
            : text || '';
        separator = separator || ',';
        index = index || 0;
        const extractedValue = text.split(separator)[index];
        const numberParsedValue = Number(extractedValue);
        return isNaN(numberParsedValue) ? extractedValue : numberParsedValue;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const flatten = (array, depth = false) => {
        if (depth === true || depth === 1) {
            return lodash.flatten(array);
        }
        else if (depth === false) {
            return lodash.flattenDeep(array);
        }
        else {
            return lodash.flattenDepth(array, depth);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const groupConcat = (array, separator = ', ') => {
        return array.join(separator);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const concat = (...args) => {
        return args.join('');
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const max = (value) => {
        if (lodash.isArray(value) && value.length > 0) {
            return lodash.max(value);
        }
        else {
            console.warn('Invalid array');
            return null;
        }
        ;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function min(value) {
        if (lodash.isArray(value) && value.length > 0) {
            return lodash.min(value);
        }
        else {
            console.warn('Invalid array');
            return null;
        }
        ;
    }
    ;
    const count = (array = []) => {
        if (array && lodash.isArray(array) && array.length > 0) {
            return array.length;
        }
        return 0;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const avg = (array) => {
        const total = sum(array);
        const elementCount = count(array);
        if (total && elementCount) {
            return total / elementCount;
        }
        return total;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formatDate = (date, format, isUTC) => {
        format = format.replace('LT', 'hh:mm A');
        if (isUTC) {
            return dayjs.utc(date).local().format(format);
        }
        else {
            return dayjs(date).format(format);
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
export const patterns = {
    variable: '{{\\s?([^}]+)\\s?}}',
    parsedExpression: '\\[\\*(\\d*)\\*\\]',
    invalidVariable: '\\[(?!(?:@|\\*|\\d+)\\]|[\\.$])|^[^\\[]*\\]|\\][^\\[]*\\]|[\\{\\}]|\\][]|\\][^\\.\\[]'
};
export const dataVarName = 'data';
export const metaDataVarName = 'metaData';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQWdCLE1BQU0sT0FBTyxDQUFDO0FBRXJDLE9BQU8sY0FBYyxNQUFNLDZCQUE2QixDQUFDO0FBQ3pELE9BQU8sR0FBRyxNQUFNLGtCQUFrQixDQUFDO0FBQ25DLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUU1QixLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzdCLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFLbEIsTUFBTSxxQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQztBQUVuRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFnQixFQUFhLEVBQUU7SUFDMUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNiLE9BQU8sRUFBRSxDQUFDO0tBQ1Y7SUFDRCxNQUFNLFNBQVMsR0FBYSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELE1BQU0sU0FBUyxHQUFjLEVBQUUsQ0FBQztJQUNoQyxNQUFNLFlBQVksR0FBRyxDQUFDLGNBQXNCLEVBQUUsS0FBYSxFQUFFLFVBQWtCLEVBQUUsRUFBRTtRQUNsRixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLElBQUksVUFBVSxLQUFLLEdBQUcsSUFBSSxVQUFVLEtBQUssR0FBRyxFQUFFO1lBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNOLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDM0I7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQztJQUVGLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDM0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDL0QsSUFBSSxPQUFPLEVBQUU7WUFDWixTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hCO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFNBQVMsQ0FBQztBQUNsQixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUN4RSxNQUFNLFNBQVMsR0FBYyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsSUFBSSxXQUFXLEtBQUssT0FBTyxLQUFLLEVBQUU7UUFDakMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN0QjtJQUVELFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDL0IsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLFFBQVEsS0FBSyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDckMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDM0I7cUJBQU07b0JBQ04sUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDM0I7YUFDRDtZQUNELFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNOLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDOUI7SUFDRixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUN6QyxNQUFNLFNBQVMsR0FBYyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFL0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUMvQixJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksUUFBUSxLQUFLLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNyQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUMzQjtxQkFBTTtvQkFDTixRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUMzQjthQUNEO1lBQ0QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNqQzthQUFNO1lBQ04sUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7SUFDRixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxJQUFZLEVBQWlCLEVBQUU7SUFDekQsSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJLEVBQUU7UUFDdEMsT0FBTyxFQUFFLENBQUM7S0FDVjtJQUNELFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNwQixLQUFLLEVBQUU7WUFDTixPQUFPLFlBQVksQ0FBQztRQUNyQixLQUFLLEVBQUU7WUFDTixPQUFPLHFCQUFxQixDQUFDO1FBQzlCLEtBQUssQ0FBQztZQUNMLE9BQU8sVUFBVSxDQUFDO1FBQ25CO1lBQ0MsT0FBTyxFQUFFLENBQUM7S0FDWDtBQUNGLENBQUMsQ0FBQztBQUVGLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxXQUFtQixFQUFFLFdBQW1CLEVBQUUsSUFBWSxFQUFFLEVBQUU7SUFDcEYsUUFBUSxJQUFJLEVBQUU7UUFDYixLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssT0FBTyxDQUFDO1FBQ2IsS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLEtBQUs7WUFDVCxJQUFJLFdBQVcsS0FBSyxVQUFVLElBQUksV0FBVyxLQUFLLFVBQVUsRUFBRTtnQkFDN0QsT0FBTyxLQUFLLENBQUM7YUFDYjtZQUNELE1BQU07UUFDUCxLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxRQUFRO1lBQ1osT0FBTyxXQUFXLEtBQUssV0FBVyxJQUFJLENBQUMsV0FBVyxLQUFLLFVBQVUsSUFBSSxXQUFXLEtBQUssVUFBVSxDQUFDLENBQUM7UUFDbEc7WUFDQyxNQUFNO0tBQ1A7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLENBQUM7SUFFdkMsTUFBTSxhQUFhLEdBQWUsUUFBUSxDQUFDO0lBQzNDLE1BQU0sZ0JBQWdCLEdBQTJDO1FBQ2hFLENBQUMsRUFBRSxNQUFNO1FBQ1QsQ0FBQyxFQUFFLE9BQU87UUFDVixDQUFDLEVBQUUsTUFBTTtRQUNULENBQUMsRUFBRSxLQUFLO1FBQ1IsQ0FBQyxFQUFFLE1BQU07UUFDVCxDQUFDLEVBQUUsUUFBUTtRQUNYLENBQUMsRUFBRSxRQUFRO1FBQ1gsS0FBSyxFQUFFLE1BQU07UUFDYixNQUFNLEVBQUUsT0FBTztRQUNmLEtBQUssRUFBRSxNQUFNO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxLQUFLLEVBQUUsTUFBTTtRQUNiLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxRQUFRO0tBQ2pCLENBQUM7SUFFRiw2REFBNkQ7SUFDN0QsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtRQUNyRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ25ELEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksS0FBSyxDQUFDO2dCQUNWLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDekIsNkRBQTZEO29CQUM3RCxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDTixLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNiLElBQUk7d0JBQ0gsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7cUJBQzVCO29CQUFDLE9BQU8sS0FBSyxFQUFFO3dCQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3BCO2lCQUNEO2dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7U0FDSDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0lBRUYsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLElBQVksRUFBRSxVQUF5QixFQUFTLEVBQUU7UUFDN0UsSUFBSSxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQzlCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUU7aUJBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxPQUFPLGdCQUFnQixDQUFDO1NBQ3hCO2FBQU07WUFDTixPQUFPLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDL0I7SUFDRixDQUFDLENBQUM7SUFFRiw2REFBNkQ7SUFDN0QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFhLEVBQUUsS0FBYSxFQUFFLElBQVksRUFBRSxFQUFFO1FBRS9ELE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdDLE1BQU0sSUFBSSxHQUEyQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUM7UUFDN0UsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3RELE1BQU0sV0FBVyxHQUFHLGtCQUFrQixDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztZQUMzRCxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDM0QsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ2pDO2FBQU07WUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDNUMsT0FBTyxJQUFJLENBQUM7U0FDWjtJQUNGLENBQUMsQ0FBQztJQUVGLE1BQU0scUJBQXFCLEdBQWlCO1FBQzNDLE1BQU07UUFDTixPQUFPO1FBQ1AsS0FBSztRQUNMLE1BQU07UUFDTixRQUFRO1FBQ1IsUUFBUTtLQUNSLENBQUM7SUFFRixNQUFNLGVBQWUsR0FBRyxDQUN2QixHQUFHLE1BQWlCLEVBQ25CLEVBQUU7UUFDSCxNQUFNLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzdFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNoQixPQUFPLGVBQWUsQ0FBQzthQUN2QjtZQUNELElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtnQkFDbkIsT0FBTyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM5QztpQkFBTTtnQkFDTixPQUFPLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDcEQ7UUFDRixDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ25ELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEU7YUFBTTtZQUNOLE9BQU8sQ0FBQyxDQUFDO1NBQ1Q7SUFDRixDQUFDLENBQUM7SUFFRiw2REFBNkQ7SUFDN0QsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBUyxHQUFHLEdBQUcsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUU7UUFDNUQsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxJQUFJO1lBQ04sQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDZCxTQUFTLEdBQUcsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUM3QixLQUFLLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUVuQixNQUFNLGNBQWMsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWpELE9BQU8sS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7SUFDdEUsQ0FBQyxDQUFDO0lBRUYsNkRBQTZEO0lBQzdELE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQTBCLEtBQUssRUFBRSxFQUFFO1FBQzFELElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjthQUFNLElBQUksS0FBSyxLQUFLLEtBQUssRUFBRTtZQUMzQixPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNOLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekM7SUFDRixDQUFDLENBQUM7SUFFRiw2REFBNkQ7SUFDN0QsTUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFnQixFQUFFLFNBQVMsR0FBRyxJQUFJLEVBQUUsRUFBRTtRQUMxRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsNkRBQTZEO0lBQzdELE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFlLEVBQUUsRUFBRTtRQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFBO0lBRUQsNkRBQTZEO0lBQzdELE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjthQUFNO1lBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM5QixPQUFPLElBQUksQ0FBQztTQUNaO1FBQUEsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLDZEQUE2RDtJQUM3RCxTQUFTLEdBQUcsQ0FBQyxLQUFlO1FBQzNCLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDeEI7YUFBTTtZQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUFBLENBQUM7SUFDSCxDQUFDO0lBQUEsQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLENBQUMsUUFBbUIsRUFBRSxFQUFFLEVBQUU7UUFDdkMsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2RCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDcEI7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQztJQUVGLDZEQUE2RDtJQUM3RCxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFO1FBQy9CLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxLQUFLLElBQUksWUFBWSxFQUFFO1lBQzFCLE9BQU8sS0FBSyxHQUFHLFlBQVksQ0FBQztTQUM1QjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0lBRUYsNkRBQTZEO0lBQzdELE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLE1BQWMsRUFBRSxLQUFjLEVBQUUsRUFBRTtRQUNuRSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDekMsSUFBSSxLQUFLLEVBQUU7WUFDVixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlDO2FBQU07WUFDTixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEM7SUFDRixDQUFDLENBQUM7SUFFRiw2REFBNkQ7SUFDN0QsT0FBTyxVQUFVLE9BQWUsRUFBRSxJQUE2QixFQUFFLFFBQWlDO1FBQ2pHLElBQUk7WUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUM7U0FDWjtJQUNGLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVkLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRztJQUN2QixRQUFRLEVBQUUscUJBQXFCO0lBQy9CLGdCQUFnQixFQUFFLG9CQUFvQjtJQUN0QyxlQUFlLEVBQUUsdUZBQXVGO0NBQ3hHLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMifQ==