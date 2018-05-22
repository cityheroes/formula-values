import _ from 'underscore';

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

export default {

	getPath: getPath,
	assignTo: assignTo,
	compact: compact,
	patterns: {
		variable: '{{([^}]+)}}'
	},
	dataVarName: 'data',
	metaDataVarName: 'metaData'

};
