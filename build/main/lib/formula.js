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
    exports.Formula = void 0;
    var compiled_expression_1 = require("./compiled-expression");
    var helpers_1 = require("./helpers");
    var CLEANING_RULES = [
        {
            pattern: '^=',
            replacement: ''
        },
        {
            pattern: '\'',
            replacement: '\\\''
        }
    ];
    var Formula = /** @class */ (function (_super) {
        __extends(Formula, _super);
        function Formula(expression) {
            return _super.call(this, CLEANING_RULES, expression) || this;
        }
        Formula.prototype.eval = function (data, metaData, context) {
            var result = null;
            try {
                var contextPath_1 = helpers_1.processPath(context);
                var parsedVariables_1 = this._variables.map(function (variable) { return variable.parseVariable(contextPath_1); });
                var resolvedParsedExpression = this._parsedExpression.replace(/\[\*(\d*)\*\]/g, function (_match, number) {
                    return parsedVariables_1[parseInt(number)];
                });
                result = helpers_1.evalWithSafeEnvironment(resolvedParsedExpression, data, metaData);
            }
            catch (error) {
                console.warn(error);
            }
            return result;
        };
        Formula.prototype.getDependencies = function () {
            return this._variables.map(function (fieldPath) { return fieldPath.split('::').shift(); });
        };
        Formula.isFormula = function (expression) {
            return 'string' === typeof expression && expression.indexOf('=') === 0;
        };
        return Formula;
    }(compiled_expression_1.CompiledExpression));
    exports.Formula = Formula;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXVsYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZm9ybXVsYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNkRBQWlFO0lBQ2pFLHFDQUE0RTtJQUU1RSxJQUFNLGNBQWMsR0FBVztRQUM5QjtZQUNDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLEVBQUU7U0FDZjtRQUNEO1lBQ0MsT0FBTyxFQUFFLElBQUk7WUFDYixXQUFXLEVBQUUsTUFBTTtTQUNuQjtLQUNELENBQUM7SUFFRjtRQUE2QiwyQkFBa0I7UUFFOUMsaUJBQVksVUFBa0I7bUJBQzdCLGtCQUFNLGNBQWMsRUFBRSxVQUFVLENBQUM7UUFDbEMsQ0FBQztRQUVELHNCQUFJLEdBQUosVUFBSyxJQUE2QixFQUFFLFFBQWlDLEVBQUUsT0FBZTtZQUNyRixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSTtnQkFDSCxJQUFNLGFBQVcsR0FBYyxxQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwRCxJQUFNLGlCQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQVcsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7Z0JBQzdGLElBQU0sd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FDOUQsZ0JBQWdCLEVBQ2hCLFVBQUMsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxpQkFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDLENBQ0QsQ0FBQztnQkFDRixNQUFNLEdBQUcsaUNBQXVCLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzNFO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2YsQ0FBQztRQUVELGlDQUFlLEdBQWY7WUFDQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUMsU0FBUyxJQUFLLE9BQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFFTSxpQkFBUyxHQUFoQixVQUFpQixVQUFrQjtZQUNsQyxPQUFPLFFBQVEsS0FBSyxPQUFPLFVBQVUsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBRUYsY0FBQztJQUFELENBQUMsQUFoQ0QsQ0FBNkIsd0NBQWtCLEdBZ0M5QztJQWhDWSwwQkFBTyJ9