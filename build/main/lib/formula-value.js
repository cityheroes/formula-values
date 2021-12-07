(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./concatenated-text", "./default-value", "./formula"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FormulaValue = void 0;
    var concatenated_text_1 = require("./concatenated-text");
    var default_value_1 = require("./default-value");
    var formula_1 = require("./formula");
    var FormulaValue = /** @class */ (function () {
        function FormulaValue(expression) {
            if (expression === void 0) { expression = ''; }
            if (formula_1.Formula.isFormula(expression)) {
                this.compiledExpression = new formula_1.Formula(expression);
            }
            else if (concatenated_text_1.ConcatenatedText.isConcatenatedText(expression)) {
                this.compiledExpression = new concatenated_text_1.ConcatenatedText(expression);
            }
            else {
                this.compiledExpression = new default_value_1.DefaultValue(expression);
            }
        }
        FormulaValue.prototype.eval = function (data, metaData, context) {
            if (data === void 0) { data = {}; }
            if (metaData === void 0) { metaData = {}; }
            if (context === void 0) { context = ''; }
            return this.compiledExpression.eval(data, metaData, context);
        };
        FormulaValue.isFormulaValue = function (expression) {
            return formula_1.Formula.isFormula(expression) || concatenated_text_1.ConcatenatedText.isConcatenatedText(expression);
        };
        return FormulaValue;
    }());
    exports.FormulaValue = FormulaValue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXVsYS12YWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZm9ybXVsYS12YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFDQSx5REFBdUQ7SUFDdkQsaURBQStDO0lBQy9DLHFDQUFvQztJQUVwQztRQUlDLHNCQUFZLFVBQWU7WUFBZiwyQkFBQSxFQUFBLGVBQWU7WUFDMUIsSUFBSSxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksaUJBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNsRDtpQkFBTSxJQUFJLG9DQUFnQixDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMzRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxvQ0FBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMzRDtpQkFBTTtnQkFDTixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSw0QkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0YsQ0FBQztRQUVELDJCQUFJLEdBQUosVUFBSyxJQUFTLEVBQUUsUUFBYSxFQUFFLE9BQVk7WUFBdEMscUJBQUEsRUFBQSxTQUFTO1lBQUUseUJBQUEsRUFBQSxhQUFhO1lBQUUsd0JBQUEsRUFBQSxZQUFZO1lBQzFDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFTSwyQkFBYyxHQUFyQixVQUFzQixVQUFrQjtZQUN2QyxPQUFPLGlCQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLG9DQUFnQixDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFFRixtQkFBQztJQUFELENBQUMsQUF0QkQsSUFzQkM7SUF0Qlksb0NBQVkifQ==