var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "lodash", "./helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Variable = void 0;
    var lodash_1 = __importDefault(require("lodash"));
    var helpers_1 = require("./helpers");
    var INVALID_VARIABLE_REGEX = new RegExp(helpers_1.patterns.invalidVariable);
    var Variable = /** @class */ (function () {
        function Variable(text) {
            this._path = helpers_1.processPath(text);
            this._hasStar = this._path.indexOf('*') > -1;
            this._hasAt = this._path.indexOf('@') > -1;
            this._hasContext = this._hasAt;
            if (text.indexOf('::') > -1) {
                this._environment = helpers_1.metaDataVarName;
            }
            else {
                this._environment = helpers_1.dataVarName;
            }
            if (text === '') {
                this._parsedVariable = 'null';
            }
            else if (!this._hasContext) {
                this._parsedVariable = Variable._parse(this._path, this._environment);
            }
        }
        Variable.prototype.parseVariable = function (contextPath) {
            return (this._parsedVariable || this._parseWithContext(contextPath));
        };
        Variable.prototype._parseWithContext = function (contextPath) {
            var index = 0;
            var contextLength = contextPath.length;
            var pathLength = this._path.length;
            var fieldPath = this._path.slice();
            for (; index < contextLength && index < pathLength; index++) {
                if (fieldPath[index] === '@' && lodash_1.default.isNumber(contextPath[index])) {
                    fieldPath[index] = Number(contextPath[index]);
                }
                else if (fieldPath[index] !== contextPath[index] || fieldPath[index] === '*') {
                    break;
                }
            }
            for (; index < pathLength; index++) {
                if (fieldPath[index] === '@') {
                    throw new Error('Context could not fully resolve');
                }
            }
            return Variable._parse(fieldPath, this._environment);
        };
        Variable.prototype.hasStar = function () {
            return this._hasStar;
        };
        Variable.prototype.hasAt = function () {
            return this._hasAt;
        };
        Variable.isValid = function (text) {
            return !INVALID_VARIABLE_REGEX.test(text);
        };
        Variable._parse = function (path, environment) {
            var hasStarOperator = false;
            var parsedVariable = environment;
            path.forEach(function (pathElement) {
                if (pathElement === '*') {
                    if (hasStarOperator) {
                        parsedVariable += "\")";
                    }
                    else {
                        hasStarOperator = true;
                    }
                    parsedVariable = "__processStarOperator(" + parsedVariable + ",\"";
                }
                else {
                    parsedVariable += "['" + pathElement + "']";
                }
            });
            if (hasStarOperator) {
                parsedVariable += "\")";
            }
            return parsedVariable;
        };
        return Variable;
    }());
    exports.Variable = Variable;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3ZhcmlhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztJQUFBLGtEQUE0QjtJQUU1QixxQ0FNbUI7SUFFbkIsSUFBTSxzQkFBc0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxrQkFBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRTFFO1FBU0Msa0JBQVksSUFBWTtZQUV2QixJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUUvQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcseUJBQWUsQ0FBQzthQUNwQztpQkFBTTtnQkFDTixJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFXLENBQUM7YUFDaEM7WUFFRCxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO2FBQzlCO2lCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDdEU7UUFDRixDQUFDO1FBRUQsZ0NBQWEsR0FBYixVQUFjLFdBQVc7WUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVELG9DQUFpQixHQUFqQixVQUFrQixXQUFXO1lBQzVCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLElBQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDekMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDckMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVyQyxPQUFPLEtBQUssR0FBRyxhQUFhLElBQUksS0FBSyxHQUFHLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDNUQsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLGdCQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUNwRSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUM5QztxQkFBTSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRTtvQkFDL0UsTUFBTTtpQkFDTjthQUNEO1lBQ0QsT0FBTyxLQUFLLEdBQUcsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNuQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztpQkFDbkQ7YUFDRDtZQUVELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFFRCwwQkFBTyxHQUFQO1lBQ0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3RCLENBQUM7UUFFRCx3QkFBSyxHQUFMO1lBQ0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BCLENBQUM7UUFFTSxnQkFBTyxHQUFkLFVBQWUsSUFBWTtZQUMxQixPQUFPLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFTSxlQUFNLEdBQWIsVUFBYyxJQUFlLEVBQUUsV0FBbUI7WUFDakQsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzVCLElBQUksY0FBYyxHQUFHLFdBQVcsQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsV0FBVztnQkFDdkIsSUFBSSxXQUFXLEtBQUssR0FBRyxFQUFFO29CQUN4QixJQUFJLGVBQWUsRUFBRTt3QkFDcEIsY0FBYyxJQUFJLEtBQUksQ0FBQztxQkFDdkI7eUJBQU07d0JBQ04sZUFBZSxHQUFHLElBQUksQ0FBQztxQkFDdkI7b0JBQ0QsY0FBYyxHQUFHLDJCQUF5QixjQUFjLFFBQUksQ0FBQztpQkFDN0Q7cUJBQU07b0JBQ04sY0FBYyxJQUFJLE9BQUssV0FBVyxPQUFJLENBQUM7aUJBQ3ZDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLGVBQWUsRUFBRTtnQkFDcEIsY0FBYyxJQUFJLEtBQUksQ0FBQzthQUN2QjtZQUNELE9BQU8sY0FBYyxDQUFDO1FBQ3ZCLENBQUM7UUFFRixlQUFDO0lBQUQsQ0FBQyxBQXpGRCxJQXlGQztJQXpGWSw0QkFBUSJ9