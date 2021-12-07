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
        define(["require", "exports", "./compiled-expression"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultValue = void 0;
    var compiled_expression_1 = require("./compiled-expression");
    var DefaultValue = /** @class */ (function (_super) {
        __extends(DefaultValue, _super);
        function DefaultValue(expression) {
            var _this = _super.call(this, [], '') || this;
            _this.value = expression;
            return _this;
        }
        DefaultValue.prototype.getDependencies = function () {
            return [];
        };
        DefaultValue.prototype.eval = function () {
            return this.value;
        };
        return DefaultValue;
    }(compiled_expression_1.CompiledExpression));
    exports.DefaultValue = DefaultValue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC12YWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZGVmYXVsdC12YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNkRBQTJEO0lBRTNEO1FBQWtDLGdDQUFrQjtRQVFuRCxzQkFBWSxVQUFtQjtZQUEvQixZQUNDLGtCQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FFYjtZQURBLEtBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDOztRQUN6QixDQUFDO1FBUEQsc0NBQWUsR0FBZjtZQUNDLE9BQU8sRUFBRSxDQUFDO1FBQ1gsQ0FBQztRQU9ELDJCQUFJLEdBQUo7WUFDQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkIsQ0FBQztRQUVGLG1CQUFDO0lBQUQsQ0FBQyxBQWpCRCxDQUFrQyx3Q0FBa0IsR0FpQm5EO0lBakJZLG9DQUFZIn0=