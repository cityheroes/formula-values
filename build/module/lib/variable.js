import lodash from 'lodash';
import { dataVarName, patterns as helperPatterns, metaDataVarName, processPath } from './helpers';
const INVALID_VARIABLE_REGEX = new RegExp(helperPatterns.invalidVariable);
export class Variable {
    constructor(text) {
        this._path = processPath(text);
        this._hasStar = this._path.indexOf('*') > -1;
        this._hasAt = this._path.indexOf('@') > -1;
        this._hasContext = this._hasAt;
        if (text.indexOf('::') > -1) {
            this._environment = metaDataVarName;
        }
        else {
            this._environment = dataVarName;
        }
        if (text === '') {
            this._parsedVariable = 'null';
        }
        else if (!this._hasContext) {
            this._parsedVariable = Variable._parse(this._path, this._environment);
        }
    }
    parseVariable(contextPath) {
        return (this._parsedVariable || this._parseWithContext(contextPath));
    }
    _parseWithContext(contextPath) {
        let index = 0;
        const contextLength = contextPath.length;
        const pathLength = this._path.length;
        const fieldPath = this._path.slice();
        for (; index < contextLength && index < pathLength; index++) {
            if (fieldPath[index] === '@' && lodash.isNumber(contextPath[index])) {
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
    }
    hasStar() {
        return this._hasStar;
    }
    hasAt() {
        return this._hasAt;
    }
    static isValid(text) {
        return !INVALID_VARIABLE_REGEX.test(text);
    }
    static _parse(path, environment) {
        let hasStarOperator = false;
        let parsedVariable = environment;
        path.forEach(pathElement => {
            if (pathElement === '*') {
                if (hasStarOperator) {
                    parsedVariable += `")`;
                }
                else {
                    hasStarOperator = true;
                }
                parsedVariable = `__processStarOperator(${parsedVariable},"`;
            }
            else {
                parsedVariable += `['${pathElement}']`;
            }
        });
        if (hasStarOperator) {
            parsedVariable += `")`;
        }
        return parsedVariable;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3ZhcmlhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQ04sV0FBVyxFQUNYLFFBQVEsSUFBSSxjQUFjLEVBQzFCLGVBQWUsRUFDZixXQUFXLEVBRVgsTUFBTSxXQUFXLENBQUM7QUFFbkIsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFMUUsTUFBTSxPQUFPLFFBQVE7SUFTcEIsWUFBWSxJQUFZO1FBRXZCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDO1NBQ3BDO2FBQU07WUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztTQUNoQztRQUVELElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQztTQUM5QjthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJ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