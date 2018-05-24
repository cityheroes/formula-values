# Description

Package oriented to evaluate formulas written in plain strings based on an object containing information, an object containing associated meta-information and a context.

# Installation

Using npm:

```
npm install formula-values
```

# Usage

Under ES6 code:

```
import FormulaValue from 'formula-values';

let fv = new FormulaValue('=concat("Average user age: ", avg{{users[*].age}}');

let data = {
	users: [{
		first_name: 'John',
		last_name: 'Williams',
		age: 86
	}, {
		first_name: 'Danny',
		last_name: 'Elfman',
		age: 64
	}]
}

let result1 = fv.eval(data, {}, '');

data.users.push({
	first_name: 'Hans',
	last_name: 'Zimmer',
	age: 60
});

let result2 = fv.eval(data, {}, '');
```
