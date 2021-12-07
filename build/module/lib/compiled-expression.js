import { patterns as helperPatterns } from './helpers';
import { Variable } from './variable';
const VARIABLE_REGEX = new RegExp(helperPatterns.variable, 'g');
export class CompiledExpression {
    constructor(rules, expression) {
        this._variables = [];
        rules.forEach(rule => {
            expression = expression.replace(new RegExp(rule.pattern, 'g'), rule.replacement);
        });
        const variablesCache = {};
        this._parsedExpression = expression.replace(VARIABLE_REGEX, (_match, variableText) => {
            variableText = variableText.trim();
            if (Variable.isValid(variableText)) {
                if (!variablesCache[variableText]) {
                    variablesCache[variableText] = this._variables.length;
                    this._variables.push(new Variable(variableText));
                }
                return `[*${variablesCache[variableText]}*]`;
            }
            else {
                return `{{${variableText}}}`;
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZWQtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcGlsZWQtZXhwcmVzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ04sUUFBUSxJQUFJLGNBQWMsRUFDMUIsTUFBTSxXQUFXLENBQUM7QUFDbkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV0QyxNQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBT2hFLE1BQU0sT0FBZ0Isa0JBQWtCO0lBS3ZDLFlBQVksS0FBYSxFQUFFLFVBQWtCO1FBSDdDLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFJZixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQXFCLENBQUMsQ0FBQztRQUM1RixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBb0IsRUFBRSxFQUFFO1lBQzVGLFlBQVksR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUNsQyxjQUFjLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7b0JBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7aUJBQ2pEO2dCQUNELE9BQU8sS0FBSyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQzthQUM3QztpQkFBTTtnQkFDTixPQUFPLEtBQUssWUFBWSxJQUFJLENBQUM7YUFDN0I7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FNRCJ9