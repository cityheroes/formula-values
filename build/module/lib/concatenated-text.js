import { CompiledExpression, } from './compiled-expression';
import { evalWithSafeEnvironment, patterns as helperPatterns, processPath } from './helpers';
const CLEANING_RULES = [
    {
        pattern: '\'',
        replacement: '\\\''
    }
];
const VARIABLE_REGEX = new RegExp(helperPatterns.variable);
const PARSED_EXPRESSION_REGEX = new RegExp(helperPatterns.parsedExpression, 'g');
export class ConcatenatedText extends CompiledExpression {
    constructor(expression = '') {
        super(CLEANING_RULES, expression);
    }
    eval(data, metaData, context) {
        let result = '';
        try {
            const contextPath = processPath(context);
            const parsedVariables = this._variables.map((variable) => {
                if (variable.hasStar()) {
                    return '';
                }
                return evalWithSafeEnvironment(variable.parseVariable(contextPath), data, metaData);
            });
            result = this._parsedExpression.replace(PARSED_EXPRESSION_REGEX, (_match, number) => {
                return parsedVariables[parseInt(number)];
            });
        }
        catch (error) {
            console.warn(error);
        }
        return result;
    }
    getDependencies() {
        return this._variables.map((fieldPath) => fieldPath.split('::').shift());
    }
    static isConcatenatedText(expression) {
        return 'string' === typeof expression && VARIABLE_REGEX.test(expression);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY2F0ZW5hdGVkLXRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbmNhdGVuYXRlZC10ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTixrQkFBa0IsR0FDbEIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQ04sdUJBQXVCLEVBQ3ZCLFFBQVEsSUFBSSxjQUFjLEVBQzFCLFdBQVcsRUFFWCxNQUFNLFdBQVcsQ0FBQztBQUVuQixNQUFNLGNBQWMsR0FBRztJQUN0QjtRQUNDLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLE1BQU07S0FDbkI7Q0FDRCxDQUFDO0FBQ0YsTUFBTSxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNELE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRWpGLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxrQkFBa0I7SUFFdkQsWUFBWSxVQUFVLEdBQUcsRUFBRTtRQUMxQixLQUFLLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBNkIsRUFBRSxRQUFpQyxFQUFFLE9BQWU7UUFDckYsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUk7WUFDSCxNQUFNLFdBQVcsR0FBYyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFcEQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDeEQsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO2lCQUNWO2dCQUNELE9BQU8sdUJBQXVCLENBQzdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQ25DLElBQUksRUFDSixRQUFRLENBQ1IsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQ3RDLHVCQUF1QixFQUN2QixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDbEIsT0FBTyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUVELGVBQWU7UUFDZCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVO1FBQ25DLE9BQU8sUUFBUSxLQUFLLE9BQU8sVUFBVSxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUUsQ0FBQztDQUVEIn0=