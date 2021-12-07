import { ConcatenatedText } from './concatenated-text';
import { DefaultValue } from './default-value';
import { Formula } from './formula';
export class FormulaValue {
    constructor(expression = '') {
        if (Formula.isFormula(expression)) {
            this.compiledExpression = new Formula(expression);
        }
        else if (ConcatenatedText.isConcatenatedText(expression)) {
            this.compiledExpression = new ConcatenatedText(expression);
        }
        else {
            this.compiledExpression = new DefaultValue(expression);
        }
    }
    eval(data = {}, metaData = {}, context = '') {
        return this.compiledExpression.eval(data, metaData, context);
    }
    static isFormulaValue(expression) {
        return Formula.isFormula(expression) || ConcatenatedText.isConcatenatedText(expression);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXVsYS12YWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZm9ybXVsYS12YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVwQyxNQUFNLE9BQU8sWUFBWTtJQUl4QixZQUFZLFVBQVUsR0FBRyxFQUFFO1FBQzFCLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbEQ7YUFBTSxJQUFJLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNEO2FBQU07WUFDTixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkQ7SUFDRixDQUFDO0lBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsRUFBRTtRQUMxQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFrQjtRQUN2QyxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekYsQ0FBQztDQUVEIn0=