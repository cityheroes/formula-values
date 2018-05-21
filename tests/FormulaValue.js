import FormulaValue from '../dist/FormulaValue';

describe('First test', () => {
	it('should return 1 when expression is 1', () => {
		let fv = new FormulaValue(1),
			result = fv.eval();
		expect(result).toBe(1);
	});
});
