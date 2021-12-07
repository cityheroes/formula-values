import { CompiledExpression } from './compiled-expression';
import { evalWithSafeEnvironment, processPath } from './helpers';
const CLEANING_RULES = [
    {
        pattern: '^=',
        replacement: ''
    },
    {
        pattern: '\'',
        replacement: '\\\''
    }
];
export class Formula extends CompiledExpression {
    constructor(expression) {
        super(CLEANING_RULES, expression);
    }
    eval(data, metaData, context) {
        let result = null;
        try {
            const contextPath = processPath(context);
            const parsedVariables = this._variables.map(variable => variable.parseVariable(contextPath));
            const resolvedParsedExpression = this._parsedExpression.replace(/\[\*(\d*)\*\]/g, (_match, number) => {
                return parsedVariables[parseInt(number)];
            });
            result = evalWithSafeEnvironment(resolvedParsedExpression, data, metaData);
        }
        catch (error) {
            console.warn(error);
        }
        return result;
    }
    getDependencies() {
        return this._variables.map((fieldPath) => fieldPath.split('::').shift());
    }
    static isFormula(expression) {
        return 'string' === typeof expression && expression.indexOf('=') === 0;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXVsYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZm9ybXVsYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsa0JBQWtCLEVBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFhLE1BQU0sV0FBVyxDQUFDO0FBRTVFLE1BQU0sY0FBYyxHQUFXO0lBQzlCO1FBQ0MsT0FBTyxFQUFFLElBQUk7UUFDYixXQUFXLEVBQUUsRUFBRTtLQUNmO0lBQ0Q7UUFDQyxPQUFPLEVBQUUsSUFBSTtRQUNiLFdBQVcsRUFBRSxNQUFNO0tBQ25CO0NBQ0QsQ0FBQztBQUVGLE1BQU0sT0FBTyxPQUFRLFNBQVEsa0JBQWtCO0lBRTlDLFlBQVksVUFBa0I7UUFDN0IsS0FBSyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQTZCLEVBQUUsUUFBaUMsRUFBRSxPQUFlO1FBQ3JGLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJO1lBQ0gsTUFBTSxXQUFXLEdBQWMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzdGLE1BQU0sd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FDOUQsZ0JBQWdCLEVBQ2hCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNsQixPQUFPLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQ0QsQ0FBQztZQUNGLE1BQU0sR0FBRyx1QkFBdUIsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDM0U7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNmLENBQUM7SUFFRCxlQUFlO1FBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQWtCO1FBQ2xDLE9BQU8sUUFBUSxLQUFLLE9BQU8sVUFBVSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FFRCJ9