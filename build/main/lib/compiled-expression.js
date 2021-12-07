(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./helpers", "./variable"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompiledExpression = void 0;
    var helpers_1 = require("./helpers");
    var variable_1 = require("./variable");
    var VARIABLE_REGEX = new RegExp(helpers_1.patterns.variable, 'g');
    var CompiledExpression = /** @class */ (function () {
        function CompiledExpression(rules, expression) {
            var _this = this;
            this._variables = [];
            rules.forEach(function (rule) {
                expression = expression.replace(new RegExp(rule.pattern, 'g'), rule.replacement);
            });
            var variablesCache = {};
            this._parsedExpression = expression.replace(VARIABLE_REGEX, function (_match, variableText) {
                variableText = variableText.trim();
                if (variable_1.Variable.isValid(variableText)) {
                    if (!variablesCache[variableText]) {
                        variablesCache[variableText] = _this._variables.length;
                        _this._variables.push(new variable_1.Variable(variableText));
                    }
                    return "[*" + variablesCache[variableText] + "*]";
                }
                else {
                    return "{{" + variableText + "}}";
                }
            });
        }
        return CompiledExpression;
    }());
    exports.CompiledExpression = CompiledExpression;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZWQtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcGlsZWQtZXhwcmVzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSxxQ0FFbUI7SUFDbkIsdUNBQXNDO0lBRXRDLElBQU0sY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLGtCQUFjLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBT2hFO1FBS0MsNEJBQVksS0FBYSxFQUFFLFVBQWtCO1lBQTdDLGlCQWtCQztZQXJCRCxlQUFVLEdBQUcsRUFBRSxDQUFDO1lBSWYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ2pCLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQXFCLENBQUMsQ0FBQztZQUM1RixDQUFDLENBQUMsQ0FBQztZQUVILElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBQyxNQUFNLEVBQUUsWUFBb0I7Z0JBQ3hGLFlBQVksR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ25DLElBQUksbUJBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7d0JBQ2xDLGNBQWMsQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzt3QkFDdEQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxtQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7cUJBQ2pEO29CQUNELE9BQU8sT0FBSyxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQUksQ0FBQztpQkFDN0M7cUJBQU07b0JBQ04sT0FBTyxPQUFLLFlBQVksT0FBSSxDQUFDO2lCQUM3QjtZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQU1GLHlCQUFDO0lBQUQsQ0FBQyxBQTdCRCxJQTZCQztJQTdCcUIsZ0RBQWtCIn0=