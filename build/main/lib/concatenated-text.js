var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./compiled-expression", "./helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConcatenatedText = void 0;
    var compiled_expression_1 = require("./compiled-expression");
    var helpers_1 = require("./helpers");
    var CLEANING_RULES = [
        {
            pattern: '\'',
            replacement: '\\\''
        }
    ];
    var VARIABLE_REGEX = new RegExp(helpers_1.patterns.variable);
    var PARSED_EXPRESSION_REGEX = new RegExp(helpers_1.patterns.parsedExpression, 'g');
    var ConcatenatedText = /** @class */ (function (_super) {
        __extends(ConcatenatedText, _super);
        function ConcatenatedText(expression) {
            if (expression === void 0) { expression = ''; }
            return _super.call(this, CLEANING_RULES, expression) || this;
        }
        ConcatenatedText.prototype.eval = function (data, metaData, context) {
            var result = '';
            try {
                var contextPath_1 = helpers_1.processPath(context);
                var parsedVariables_1 = this._variables.map(function (variable) {
                    if (variable.hasStar()) {
                        return '';
                    }
                    return helpers_1.evalWithSafeEnvironment(variable.parseVariable(contextPath_1), data, metaData);
                });
                result = this._parsedExpression.replace(PARSED_EXPRESSION_REGEX, function (_match, number) {
                    return parsedVariables_1[parseInt(number)];
                });
            }
            catch (error) {
                console.warn(error);
            }
            return result;
        };
        ConcatenatedText.prototype.getDependencies = function () {
            return this._variables.map(function (fieldPath) { return fieldPath.split('::').shift(); });
        };
        ConcatenatedText.isConcatenatedText = function (expression) {
            return 'string' === typeof expression && VARIABLE_REGEX.test(expression);
        };
        return ConcatenatedText;
    }(compiled_expression_1.CompiledExpression));
    exports.ConcatenatedText = ConcatenatedText;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY2F0ZW5hdGVkLXRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbmNhdGVuYXRlZC10ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSw2REFFK0I7SUFDL0IscUNBS21CO0lBRW5CLElBQU0sY0FBYyxHQUFHO1FBQ3RCO1lBQ0MsT0FBTyxFQUFFLElBQUk7WUFDYixXQUFXLEVBQUUsTUFBTTtTQUNuQjtLQUNELENBQUM7SUFDRixJQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxrQkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNELElBQU0sdUJBQXVCLEdBQUcsSUFBSSxNQUFNLENBQUMsa0JBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVqRjtRQUFzQyxvQ0FBa0I7UUFFdkQsMEJBQVksVUFBZTtZQUFmLDJCQUFBLEVBQUEsZUFBZTttQkFDMUIsa0JBQU0sY0FBYyxFQUFFLFVBQVUsQ0FBQztRQUNsQyxDQUFDO1FBRUQsK0JBQUksR0FBSixVQUFLLElBQTZCLEVBQUUsUUFBaUMsRUFBRSxPQUFlO1lBQ3JGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNoQixJQUFJO2dCQUNILElBQU0sYUFBVyxHQUFjLHFCQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRXBELElBQU0saUJBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQVE7b0JBQ3BELElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUN2QixPQUFPLEVBQUUsQ0FBQztxQkFDVjtvQkFDRCxPQUFPLGlDQUF1QixDQUM3QixRQUFRLENBQUMsYUFBYSxDQUFDLGFBQVcsQ0FBQyxFQUNuQyxJQUFJLEVBQ0osUUFBUSxDQUNSLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQ3RDLHVCQUF1QixFQUN2QixVQUFDLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8saUJBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEI7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNmLENBQUM7UUFFRCwwQ0FBZSxHQUFmO1lBQ0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFNBQVMsSUFBSyxPQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQTdCLENBQTZCLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRU0sbUNBQWtCLEdBQXpCLFVBQTBCLFVBQVU7WUFDbkMsT0FBTyxRQUFRLEtBQUssT0FBTyxVQUFVLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUYsdUJBQUM7SUFBRCxDQUFDLEFBekNELENBQXNDLHdDQUFrQixHQXlDdkQ7SUF6Q1ksNENBQWdCIn0=