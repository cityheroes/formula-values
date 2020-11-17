import test from 'ava';

import { FormulaValue } from './formula-value';

const testProcess = (test, formula, formData, formMetaData, context, expectedResult) => {
	const fv = new FormulaValue(formula);
	const result = fv.eval(formData, formMetaData, context);
	test.deepEqual(result, expectedResult);
};

const formData = {
	name: 'Outside name',
	tax: 15,
	custom: {
		name: 'Inside name',
		price: 20,
		quantity: 2,
		'How many tasks were performed?': 2,
		'How many tasks were}performed?': 2,
		'How many tasks were{performed?': 2,
		'How many tasks were[performed?': 2,
		'How many tasks were]performed?': 2,
		"How many tasks were'performed?": 2,
		'How many tasks were"performed?': 2,
		'How many tasks were,performed?': 2,
		date1: '2017-07-20',
		date2: '2017-07-20 22:34:12',
		date3: '22:34:12',
		date4: '2016-04-21',
		date5: '2016-04-21 21:32:14',
		date6: '20:32:42',
		cameras: [
			{
				location: 'Here!',
				type: 'test',
				model: 'Foscam R2 Wireless 1080p IP Camera'
			},
			{
				location: 'There!',
				type: 'test',
				model: 'Foscam R2 Wireless 1080p IP Camera'
			}
		],
		workers: [
			{
				first_name: 'Thu',
				last_name: 'Tebbs',
				workers: [
					{
						first_name: 'Dimple',
						last_name: 'Durio',
						workers: [
							{
								first_name: 'Lydia',
								last_name: 'Lucero'
							}
						]
					},
					{
						first_name: 'Oralee',
						last_name: 'Oakland'
					},
					{
						first_name: 'Julieann',
						last_name: 'Joines'
					},
					{
						first_name: 'Carolyn',
						last_name: 'Camire',
						workers: [
							{
								first_name: 'Carolee',
								last_name: 'Creager'
							},
							{
								first_name: 'Leland',
								last_name: 'Lanford'
							},
							{
								first_name: 'Rheba',
								last_name: 'Rozell'
							},
							{
								first_name: 'Estefana',
								last_name: 'Ellefson'
							}
						]
					},
				]
			},
			{
				first_name: 'Olene',
				last_name: 'Old',
				workers: [
					{
						first_name: 'Lorraine',
						last_name: 'Lichtman',
						workers: [
							{
								first_name: 'Launa',
								last_name: 'Lessard',
								workers: [
									{
										first_name: 'Kasha',
										last_name: 'Kost',
										workers: [
											{
												first_name: 'Leandra',
												last_name: 'Lyda',
												workers: [
													{
														first_name: 'Cristin',
														last_name: 'Cassidy'
													},
													{
														first_name: 'Talia',
														last_name: 'Tiner'
													},
													{
														first_name: 'January',
														last_name: 'Jarrells'
													},
													{
														first_name: 'Althea',
														last_name: 'Aylesworth'
													},
													{
														first_name: 'Gilberto',
														last_name: 'Gatto'
													},
												]
											}
										]
									}
								]
							}
						]
					}
				]
			}
		],
		products: [
			{
				product: 'Product 1',
				quantity: 5
			},
			{
				product: 'Product 2',
				quantity: 10
			},
			{
				product: 'Product 3',
				quantity: 15
			},
			{
				product: 'Product 4',
				quantity: 20
			},
			{
				product: 'Product 5',
				quantity: 25
			}
		]

	},
	'test custom': {
		first_line: 2,
		'How many tasks were performed?': 2
	},
	'test}custom': {
		'How many tasks were performed?': 2
	},
	'test{custom': {
		'How many tasks were performed?': 2
	},
	'test[custom': {
		'How many tasks were performed?': 2
	},
	'test]custom': {
		'How many tasks were performed?': 2
	},
	"test'custom": {
		'How many tasks were performed?': 2
	},
	"'test'custom'": {
		'How many tasks were performed?': 2
	},
	'test"custom': {
		'How many tasks were performed?': 2
	},
	'test,custom': {
		'How many tasks were performed?': 2
	},
};

test('#process Feature #1', (t) => {
	testProcess(t, '123', formData, null, null, '123');
	testProcess(t, '=2+2', formData, null, null, 4);
	testProcess(t, '=2*2', formData, null, null, 4);
	testProcess(t, '=8/2', formData, null, null, 4);
	testProcess(t, '=6-2', formData, null, null, 4);
});

test('#process Feature #2', (t) => {
	testProcess(t, '={{name}}', formData, null, null, 'Outside name');
	testProcess(t, '{{name}}', formData, null, null, 'Outside name');
	testProcess(t, '{{name}} is THE NAME', formData, null, null, 'Outside name is THE NAME');
});

test('#process Feature #3', (t) => {
	testProcess(t, '={{custom.name}}', formData, null, null, 'Inside name');
	testProcess(t, '{{custom.name}}', formData, null, null, 'Inside name');
	testProcess(t, '{{custom.name}} is the Custom name!', formData, null, null, 'Inside name is the Custom name!');
});

test('#process Feature #1, #2, #3', (t) => {
	testProcess(t, '={{custom.price}}*{{custom.quantity}}*(100+{{tax}})/100', formData, null, null, 46);
	testProcess(t, '{{custom.price}}*{{custom.quantity}}*(100+{{tax}})/100', formData, null, null, '20*2*(100+15)/100');
});

test('#process Feature #4', (t) => {
	testProcess(t, '={{custom.How many tasks were performed?}}', formData, null, null, 2);
	testProcess(t, '={{custom.How many tasks were}performed?}}', formData, null, null, null);
	testProcess(t, '={{custom.How many tasks were{performed?}}', formData, null, null, null);
	testProcess(t, '={{custom.How many tasks were[performed?}}', formData, null, null, null);
	testProcess(t, '={{custom.How many tasks were]performed?}}', formData, null, null, null);
	testProcess(t, `={{custom.How many tasks were'performed?}}`, formData, null, null, 2);
	testProcess(t, '={{custom.How many tasks were\'performed?}}', formData, null, null, 2);
	testProcess(t, '={{custom.How many tasks were"performed?}}', formData, null, null, 2);
	testProcess(t, `={{custom.How many tasks were"performed?}}`, formData, null, null, 2);
	testProcess(t, '={{custom.How many tasks were,performed?}}', formData, null, null, 2);

	testProcess(t, '={{custom.workers[01].first_name}}', formData, null, null, 'Olene');

	testProcess(t, '={{custom.workers[4a].first_name}}', formData, null, null, null);
	testProcess(t, '={{custom.workers[a].first_name}}', formData, null, null, null);
	testProcess(t, '={{custom.workers[f234].first_name}}', formData, null, null, null);
	testProcess(t, '={{custom.workers[a.first_name}}', formData, null, null, null);
	testProcess(t, '={{custom.workers[a]sdf.first_name}}', formData, null, null, null);
	testProcess(t, '={{custom.workers[1]sdf.first_name}}', formData, null, null, null);
	testProcess(t, '={{custom.workersa].first_name}}', formData, null, null, null);
	testProcess(t, '={{custom.workers23].first_name}}', formData, null, null, null);
	testProcess(t, '={{custom.workers[1].workers23].first_name}}', formData, null, null, null);


	testProcess(t, '{{custom.How many tasks were performed?}}', formData, null, null, '2');
	testProcess(t, '{{custom.How many tasks were}performed?}}', formData, null, null, '{{custom.How many tasks were}performed?}}');
	testProcess(t, '{{custom.How many tasks were{performed?}}', formData, null, null, '{{custom.How many tasks were{performed?}}');
	testProcess(t, '{{custom.How many tasks were[performed?}}', formData, null, null, '{{custom.How many tasks were[performed?}}');
	testProcess(t, '{{custom.How many tasks were]performed?}}', formData, null, null, '{{custom.How many tasks were]performed?}}');
	testProcess(t, "{{custom.How many tasks were'performed?}}", formData, null, null, '2');
	testProcess(t, '{{custom.How many tasks were\'performed?}}', formData, null, null, '2');
	testProcess(t, '{{custom.How many tasks were"performed?}}', formData, null, null, '2');
	testProcess(t, "{{custom.How many tasks were\"performed?}}", formData, null, null, '2');
	testProcess(t, '{{custom.How many tasks were,performed?}}', formData, null, null, '2');

	testProcess(t, '{{custom.workers[01].first_name}}', formData, null, null, 'Olene');

	testProcess(t, '{{custom.workers[4a].first_name}}', formData, null, null, '{{custom.workers[4a].first_name}}');
	testProcess(t, '{{custom.workers[a].first_name}}', formData, null, null, '{{custom.workers[a].first_name}}');
	testProcess(t, '{{custom.workers[f234].first_name}}', formData, null, null, '{{custom.workers[f234].first_name}}');
	testProcess(t, '{{custom.workers[a.first_name}}', formData, null, null, '{{custom.workers[a.first_name}}');
	testProcess(t, '{{custom.workers[a]sdf.first_name}}', formData, null, null, '{{custom.workers[a]sdf.first_name}}');
	testProcess(t, '{{custom.workers[1]sdf.first_name}}', formData, null, null, '{{custom.workers[1]sdf.first_name}}');
	testProcess(t, '{{custom.workersa].first_name}}', formData, null, null, '{{custom.workersa].first_name}}');
	testProcess(t, '{{custom.workers23].first_name}}', formData, null, null, '{{custom.workers23].first_name}}');
	testProcess(t, '{{custom.workers[1].workers23].first_name}}', formData, null, null, '{{custom.workers[1].workers23].first_name}}');
});

test('#process Feature #5', (t) => {
	testProcess(t, '={{test custom.How many tasks were performed?}}', formData, null, null, 2);
	testProcess(t, '={{test}custom.How many tasks were performed?}}', formData, null, null, null);
	testProcess(t, '={{test{custom.How many tasks were performed?}}', formData, null, null, null);
	testProcess(t, '={{test[custom.How many tasks were performed?}}', formData, null, null, null);
	testProcess(t, '={{test]custom.How many tasks were performed?}}', formData, null, null, null);
	testProcess(t, "={{test'custom.How many tasks were performed?}}", formData, null, null, 2);
	testProcess(t, '={{test\'custom.How many tasks were performed?}}', formData, null, null, 2);
	testProcess(t, '={{test"custom.How many tasks were performed?}}', formData, null, null, 2);
	testProcess(t, "={{test\"custom.How many tasks were performed?}}", formData, null, null, 2);
	testProcess(t, '={{test,custom.How many tasks were performed?}}', formData, null, null, 2);

	testProcess(t, '{{test custom.How many tasks were performed?}}', formData, null, null, '2');
	testProcess(t, '{{test}custom.How many tasks were performed?}}', formData, null, null, '{{test}custom.How many tasks were performed?}}');
	testProcess(t, '{{test{custom.How many tasks were performed?}}', formData, null, null, '{{test{custom.How many tasks were performed?}}');
	testProcess(t, '{{test[custom.How many tasks were performed?}}', formData, null, null, '{{test[custom.How many tasks were performed?}}');
	testProcess(t, '{{test]custom.How many tasks were performed?}}', formData, null, null, '{{test]custom.How many tasks were performed?}}');
	testProcess(t, `{{test'custom.How many tasks were performed?}}`, formData, null, null, '2');
	testProcess(t, '{{test\'custom.How many tasks were performed?}}', formData, null, null, '2');
	testProcess(t, '{{test"custom.How many tasks were performed?}}', formData, null, null, '2');
	testProcess(t, `{{test"custom.How many tasks were performed?}}`, formData, null, null, '2');
	testProcess(t, '{{test,custom.How many tasks were performed?}}', formData, null, null, '2');
});

test('#process Feature #13 with normal unit names', (t) => {
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"years")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"years")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"years")', formData, null, null, 1);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"years")', formData, null, null, 1);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"years")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"years")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"years")', formData, null, null, 1);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"years")', formData, null, null, 1);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"years")', formData, null, null, -1);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"years")', formData, null, null, -1);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"years")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"years")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"years")', formData, null, null, -1);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"years")', formData, null, null, -1);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"years")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"years")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"years")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"months")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"months")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"months")', formData, null, null, 14);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"months")', formData, null, null, 14);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"months")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"months")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"months")', formData, null, null, 14);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"months")', formData, null, null, 14);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"months")', formData, null, null, -14);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"months")', formData, null, null, -14);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"months")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"months")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"months")', formData, null, null, -14);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"months")', formData, null, null, -14);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"months")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"months")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"months")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"weeks")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"weeks")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"weeks")', formData, null, null, 65);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"weeks")', formData, null, null, 64);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"weeks")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"weeks")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"weeks")', formData, null, null, 65);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"weeks")', formData, null, null, 65);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"weeks")', formData, null, null, -65);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"weeks")', formData, null, null, -65);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"weeks")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"weeks")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"weeks")', formData, null, null, -64);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"weeks")', formData, null, null, -65);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"weeks")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"weeks")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"weeks")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"days")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"days")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"days")', formData, null, null, 455);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"days")', formData, null, null, 454);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"days")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"days")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"days")', formData, null, null, 455);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"days")', formData, null, null, 455);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"days")', formData, null, null, -455);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"days")', formData, null, null, -455);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"days")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"days")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"days")', formData, null, null, -454);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"days")', formData, null, null, -455);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"days")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"days")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"days")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"hours")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"hours")', formData, null, null, -22);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"hours")', formData, null, null, 10920);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"hours")', formData, null, null, 10898);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"hours")', formData, null, null, 22);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"hours")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"hours")', formData, null, null, 10942);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"hours")', formData, null, null, 10921);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"hours")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"hours")', formData, null, null, 2);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"hours")', formData, null, null, -10920);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"hours")', formData, null, null, -10942);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"hours")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"hours")', formData, null, null, -21);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"hours")', formData, null, null, -10898);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"hours")', formData, null, null, -10921);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"hours")', formData, null, null, 21);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"hours")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"hours")', formData, null, null, -2);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"hours")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"hours")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"minutes")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"minutes")', formData, null, null, -1354);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"minutes")', formData, null, null, 655200);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"minutes")', formData, null, null, 653907);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"minutes")', formData, null, null, 1354);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"minutes")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"minutes")', formData, null, null, 656554);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"minutes")', formData, null, null, 655261);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"minutes")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"minutes")', formData, null, null, 121);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"minutes")', formData, null, null, -655200);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"minutes")', formData, null, null, -656554);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"minutes")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"minutes")', formData, null, null, -1292);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"minutes")', formData, null, null, -653907);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"minutes")', formData, null, null, -655261);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"minutes")', formData, null, null, 1292);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"minutes")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"minutes")', formData, null, null, -121);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"minutes")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"minutes")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"seconds")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"seconds")', formData, null, null, -81252);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"seconds")', formData, null, null, 39312000);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"seconds")', formData, null, null, 39234466);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"seconds")', formData, null, null, 81252);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"seconds")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"seconds")', formData, null, null, 39393252);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"seconds")', formData, null, null, 39315718);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"seconds")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"seconds")', formData, null, null, 7290);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"seconds")', formData, null, null, -39312000);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"seconds")', formData, null, null, -39393252);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"seconds")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"seconds")', formData, null, null, -77534);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"seconds")', formData, null, null, -39234466);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"seconds")', formData, null, null, -39315718);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"seconds")', formData, null, null, 77534);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"seconds")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"seconds")', formData, null, null, -7290);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"seconds")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"seconds")', formData, null, null, 0);

	testProcess(t, 'dateDiff({{custom.date6}},{{custom.date6}},"seconds")', formData, null, null, 'dateDiff(20:32:42,20:32:42,"seconds")');
});

test('#process Feature #13 with alias unit names', (t) => {

	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"Y")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"Y")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"Y")', formData, null, null, 1);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"Y")', formData, null, null, 1);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"Y")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"Y")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"Y")', formData, null, null, 1);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"Y")', formData, null, null, 1);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"Y")', formData, null, null, -1);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"Y")', formData, null, null, -1);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"Y")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"Y")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"Y")', formData, null, null, -1);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"Y")', formData, null, null, -1);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"Y")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"Y")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"Y")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"M")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"M")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"M")', formData, null, null, 14);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"M")', formData, null, null, 14);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"M")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"M")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"M")', formData, null, null, 14);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"M")', formData, null, null, 14);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"M")', formData, null, null, -14);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"M")', formData, null, null, -14);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"M")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"M")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"M")', formData, null, null, -14);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"M")', formData, null, null, -14);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"M")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"M")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"M")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"W")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"W")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"W")', formData, null, null, 65);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"W")', formData, null, null, 64);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"W")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"W")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"W")', formData, null, null, 65);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"W")', formData, null, null, 65);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"W")', formData, null, null, -65);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"W")', formData, null, null, -65);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"W")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"W")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"W")', formData, null, null, -64);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"W")', formData, null, null, -65);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"W")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"W")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"W")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"D")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"D")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"D")', formData, null, null, 455);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"D")', formData, null, null, 454);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"D")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"D")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"D")', formData, null, null, 455);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"D")', formData, null, null, 455);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"D")', formData, null, null, -455);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"D")', formData, null, null, -455);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"D")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"D")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"D")', formData, null, null, -454);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"D")', formData, null, null, -455);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"D")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"D")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"D")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"h")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"h")', formData, null, null, -22);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"h")', formData, null, null, 10920);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"h")', formData, null, null, 10898);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"h")', formData, null, null, 22);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"h")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"h")', formData, null, null, 10942);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"h")', formData, null, null, 10921);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"h")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"h")', formData, null, null, 2);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"h")', formData, null, null, -10920);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"h")', formData, null, null, -10942);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"h")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"h")', formData, null, null, -21);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"h")', formData, null, null, -10898);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"h")', formData, null, null, -10921);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"h")', formData, null, null, 21);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"h")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"h")', formData, null, null, -2);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"h")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"h")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"m")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"m")', formData, null, null, -1354);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"m")', formData, null, null, 655200);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"m")', formData, null, null, 653907);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"m")', formData, null, null, 1354);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"m")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"m")', formData, null, null, 656554);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"m")', formData, null, null, 655261);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"m")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"m")', formData, null, null, 121);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"m")', formData, null, null, -655200);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"m")', formData, null, null, -656554);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"m")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"m")', formData, null, null, -1292);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"m")', formData, null, null, -653907);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"m")', formData, null, null, -655261);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"m")', formData, null, null, 1292);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"m")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"m")', formData, null, null, -121);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"m")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"m")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date1}},"s")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date2}},"s")', formData, null, null, -81252);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date3}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date4}},"s")', formData, null, null, 39312000);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date5}},"s")', formData, null, null, 39234466);
	testProcess(t, '=dateDiff({{custom.date1}},{{custom.date6}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date1}},"s")', formData, null, null, 81252);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date2}},"s")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date3}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date4}},"s")', formData, null, null, 39393252);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date5}},"s")', formData, null, null, 39315718);
	testProcess(t, '=dateDiff({{custom.date2}},{{custom.date6}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date1}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date2}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date3}},"s")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date4}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date5}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date3}},{{custom.date6}},"s")', formData, null, null, 7290);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date1}},"s")', formData, null, null, -39312000);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date2}},"s")', formData, null, null, -39393252);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date3}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date4}},"s")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date5}},"s")', formData, null, null, -77534);
	testProcess(t, '=dateDiff({{custom.date4}},{{custom.date6}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date1}},"s")', formData, null, null, -39234466);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date2}},"s")', formData, null, null, -39315718);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date3}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date4}},"s")', formData, null, null, 77534);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date5}},"s")', formData, null, null, 0);
	testProcess(t, '=dateDiff({{custom.date5}},{{custom.date6}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date1}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date2}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date3}},"s")', formData, null, null, -7290);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date4}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date5}},"s")', formData, null, null, null);
	testProcess(t, '=dateDiff({{custom.date6}},{{custom.date6}},"s")', formData, null, null, 0);
});

test('#process Feature 6', (t) => {
	testProcess(t, '={{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].first_name', 'Olene');
	testProcess(t, '={{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Olene');
	testProcess(t, '={{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Olene');
	testProcess(t, '={{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Olene');
	testProcess(t, '={{custom.workers[@].workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Lorraine');

	testProcess(t, '={{unexistent context.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', null);

	testProcess(t, '{{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].first_name', 'Olene');
	testProcess(t, '{{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Olene');
	testProcess(t, '{{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Olene');
	testProcess(t, '{{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Olene');
	testProcess(t, '{{custom.workers[@].workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Lorraine');

	testProcess(t, '{{unexistent context.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', '');
});

test('#process Feature 7', (t) => {
	testProcess(t, '={{custom.workers[1].first_name}}', formData, null, null, 'Olene');

	testProcess(t, '{{custom.workers[1].first_name}}', formData, null, null, 'Olene');
});

test('#process Feature 8', (t) => {
	testProcess(t, '={{custom.products[*].quantity}}', formData, null, null, [5, 10, 15, 20, 25]);
	testProcess(t, '={{custom.products[*].product}}', formData, null, null, ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5']);

	testProcess(t, '{{custom.products[*].quantity}}', formData, null, null, '');
	testProcess(t, '{{custom.products[*].product}}', formData, null, null, '');
});

test('#process Feature 9', (t) => {
	testProcess(t, '=sum({{custom.products[*].quantity}})', formData, null, null, 75);
	testProcess(t, '=avg({{custom.products[*].quantity}})', formData, null, null, 15);

	testProcess(t, 'sum({{custom.products[*].quantity}})', formData, null, null, 'sum()');
	testProcess(t, 'avg({{custom.products[*].quantity}})', formData, null, null, 'avg()');
});

test('#proces Feature 14', (t) => {
	const formData = {
		custom: {
			product: 'Lavandina Sachet',
			quantity: 15
		}
	};
	const formMetaData = {
		custom: {
			product: {
				price: 20,
				info: {
					name: 'Lavandina Sachet',
					location: 'Estante 4',
					inventoryId: 15388,
					promos: [
						{
							name: 'Promo Gold',
							discount: 0.25
						},
						{
							name: 'Promo Platino',
							discount: 0.1
						},
						{
							name: 'Promo Bronce',
							discount: 0.05
						},
						{
							name: 'Standard',
							discount: 0.01
						}
					]
				}
			}
		}
	};

	testProcess(t, '={{custom.product::price}}*{{custom.quantity}}', formData, formMetaData, null, 300);
	testProcess(t, '={{custom.product::info.inventoryId}}', formData, formMetaData, null, 15388);
	testProcess(t, '={{custom.product::info.location}}', formData, formMetaData, null, 'Estante 4');
	testProcess(t, '={{custom.product::price}}*(1-{{custom.product::info.promos[0].discount}})*{{custom.quantity}}', formData, formMetaData, null, 225);
	testProcess(t, '={{custom.product::price}}*(1-{{custom.product::info.promos[1].discount}})*{{custom.quantity}}', formData, formMetaData, null, 270);
	testProcess(t, '={{custom.product::price}}*(1-{{custom.product::info.promos[2].discount}})*{{custom.quantity}}', formData, formMetaData, null, 285);
	testProcess(t, '={{custom.product::info.promos[*].discount}}', formData, formMetaData, null, [0.25, 0.1, 0.05, 0.01]);
	testProcess(t, '=avg({{custom.product::info.promos[*].discount}})', formData, formMetaData, null, 0.1025);

	testProcess(t, '{{custom.product::price}}*{{custom.quantity}}', formData, formMetaData, null, '20*15');
	testProcess(t, '{{custom.product::info.inventoryId}}', formData, formMetaData, null, '15388');
	testProcess(t, '{{custom.product::info.location}}', formData, formMetaData, null, 'Estante 4');
	testProcess(t, '{{custom.product::price}}*(1-{{custom.product::info.promos[0].discount}})*{{custom.quantity}}', formData, formMetaData, null, '20*(1-0.25)*15');
	testProcess(t, '{{custom.product::price}}*(1-{{custom.product::info.promos[1].discount}})*{{custom.quantity}}', formData, formMetaData, null, '20*(1-0.1)*15');
	testProcess(t, '{{custom.product::price}}*(1-{{custom.product::info.promos[2].discount}})*{{custom.quantity}}', formData, formMetaData, null, '20*(1-0.05)*15');
	testProcess(t, '{{custom.product::info.promos[*].discount}}', formData, formMetaData, null, '');
	testProcess(t, 'avg({{custom.product::info.promos[*].discount}})', formData, formMetaData, null, 'avg()');
});

test('#process Feature 18', (t) => {
	const formData = {
		custom: {
			compositeData1: '328516028|5407|383401700074490|18/10/2017|12.00|12.00|25-33-9F-1A-C5|791638|0|0|0|0'
		}
	};

	const formMetaData = {};

	testProcess(t, '=extract({{custom.compositeData1}},"|",-1)', formData, formMetaData, null, undefined);
	testProcess(t, '=extract({{custom.compositeData1}},"|",0)', formData, formMetaData, null, 328516028);
	testProcess(t, '=extract({{custom.compositeData1}},"|",1)', formData, formMetaData, null, 5407);
	testProcess(t, '=extract({{custom.compositeData1}},"|",2)', formData, formMetaData, null, 383401700074490);
	testProcess(t, '=extract({{custom.compositeData1}},"|",3)', formData, formMetaData, null, '18/10/2017');
	testProcess(t, '=extract({{custom.compositeData1}},"|",4)', formData, formMetaData, null, 12.00);
	testProcess(t, '=extract({{custom.compositeData1}},"|",5)', formData, formMetaData, null, 12.00);
	testProcess(t, '=extract({{custom.compositeData1}},"|",6)', formData, formMetaData, null, '25-33-9F-1A-C5');
	testProcess(t, '=extract({{custom.compositeData1}},"|",7)', formData, formMetaData, null, 791638);
	testProcess(t, '=extract({{custom.compositeData1}},"|",8)', formData, formMetaData, null, 0);
	testProcess(t, '=extract({{custom.compositeData1}},"|",9)', formData, formMetaData, null, 0);
	testProcess(t, '=extract({{custom.compositeData1}},"|",10)', formData, formMetaData, null, 0);
	testProcess(t, '=extract({{custom.compositeData1}},"|",11)', formData, formMetaData, null, 0);
	testProcess(t, '=extract({{custom.compositeData1}},"|",12)', formData, formMetaData, null, undefined);

	testProcess(t, 'extract({{custom.compositeData1}},"|",12)', formData, formMetaData, null, 'extract(328516028|5407|383401700074490|18/10/2017|12.00|12.00|25-33-9F-1A-C5|791638|0|0|0|0,"|",12)');
});

test('#process Feature 17', (t) => {
	const formData = {
		custom: {
			composite: [
				{
					name: 'Name 1'
				},
				{
					name: 'Name 2'
				}
			],
			emptyComposite: []
		}
	};

	const formMetaData = {
		custom: {
			composite: []
		}
	};

	testProcess(t, '=groupConcat({{custom.composite[*].name}})', formData, formMetaData, null, 'Name 1, Name 2');
	testProcess(t, '=groupConcat({{custom.composite[*].name}}," - ")', formData, formMetaData, null, 'Name 1 - Name 2');
	testProcess(t, '=groupConcat({{custom.emptyComposite[*].name}}," - ")', formData, formMetaData, null, '');
	testProcess(t, '=groupConcat({{custom.unexistentComposite[*].name}}," - ")', formData, formMetaData, null, '');

	testProcess(t, '=groupConcat({{custom.unexistentComposite[*].name}}," - ")', formData, formMetaData, null, '');
});

test('#process Feature 18b', (t) => {
	const formData = {
		custom: {
			first_name: 'Fernando',
			last_name: 'Salidas',
			amount: 500,
			discount: 10
		}
	};

	const formMetaData = {};

	testProcess(t, '=concat({{custom.first_name}},{{custom.last_name}})', formData, formMetaData, null, 'FernandoSalidas');
	testProcess(t, '=concat({{custom.first_name}}," ",{{custom.last_name}})', formData, formMetaData, null, 'Fernando Salidas');
	testProcess(t, '=concat({{custom.first_name}}," ",{{custom.last_name}}," bought ",{{custom.amount}}," dollars of bread with a discount of ",{{custom.discount}},"%")', formData, formMetaData, null, 'Fernando Salidas bought 500 dollars of bread with a discount of 10%');
	testProcess(t, '=concat({{custom.first_name}}," ",{{custom.last_name}}," bought ",{{custom.amount}}," dollars of bread with a discount of ",{{custom.discount}},"% spending ",{{custom.amount}}*(1-{{custom.discount}}/100)," dollars")', formData, formMetaData, null, 'Fernando Salidas bought 500 dollars of bread with a discount of 10% spending 450 dollars');

	testProcess(t, 'concat({{custom.first_name}}," ",{{custom.last_name}}," bought ",{{custom.amount}}," dollars of bread with a discount of ",{{custom.discount}},"% spending ",{{custom.amount}}*(1-{{custom.discount}}/100)," dollars")', formData, formMetaData, null, 'concat(Fernando," ",Salidas," bought ",500," dollars of bread with a discount of ",10,"% spending ",500*(1-10/100)," dollars")');
});

test('#process Feature 19', (t) => {
	const formData = {
		custom: {
			date1: '2017-07-20',
			date2: '2017-07-20 22:34:12',
			date3: '22:34:12',
			date4: 'This is not a date',
			date5: null
		}
	};
	testProcess(t, '=formatDate({{custom.date1}}, "YYYY-MM-DD")', formData, null, null, '2017-07-20');
	testProcess(t, '=formatDate({{custom.date2}}, "MMM Do YYYY, LT")', formData, null, null, 'Jul 20th 2017, 10:34 PM');
	testProcess(t, '=formatDate({{custom.date3}}, "YYYY-MM-DD")', formData, null, null, 'Invalid Date');
	testProcess(t, '=formatDate({{custom.date4}}, "YYYY-MM-DD")', formData, null, null, 'Invalid Date');
	testProcess(t, '=formatDate({{custom.date5}}, "YYYY-MM-DD")', formData, null, null, 'Invalid Date');
});

test('#process Feature 20', (t) => {
	const formData = {
		custom: {
			// eslint-disable-next-line no-sparse-arrays
			array1: [23, 65, 7, , 1346, 1234, 12, 709, 0, 120, 56],
			array2: [15, 56, 2, 0, 24, 15],
			array3: [],
			array4: [12, 57, 23, 100, null, 604],
			array5: [46, 78, 12, 680, 'hello', 104],
			notArrayData1: {
				Value: 3,
				value: 5
			},
			notArrayData2: 10000,
			notArrayData3: null,
			notArrayData4: "Not an array",
			notArrayData5: undefined
		}
	};
	testProcess(t, '=max({{custom.array1}})', formData, null, null, 1346);
	testProcess(t, '=max({{custom.array2}})', formData, null, null, 56);
	testProcess(t, '=max({{custom.array3}})', formData, null, null, null);
	testProcess(t, '=max({{custom.array4}})', formData, null, null, 604);
	testProcess(t, '=max({{custom.array5}})', formData, null, null, 680);
	testProcess(t, '=max({{custom.notArrayData1}})', formData, null, null, null);
	testProcess(t, '=max({{custom.notArrayData2}})', formData, null, null, null);
	testProcess(t, '=max({{custom.notArrayData3}})', formData, null, null, null);
	testProcess(t, '=max({{custom.notArrayData4}})', formData, null, null, null);
	testProcess(t, '=max({{custom.notArrayData5}})', formData, null, null, null);
});

test('#process Feature 21', (t) => {
	const formData = {
		custom: {
			// eslint-disable-next-line no-sparse-arrays
			array1: [23, 65, 7, , 1346, 1234, 12, 709, 0, 120, 56],
			array2: [15, 56, -10, 2, 0, 24, 15, -12],
			array3: [],
			array4: [12, 57, 23, 100, null, 604],
			array5: [46, 78, 12, 680, -100, 'hello again', 104],
			notArrayData1: {
				Value: 3,
				value: 5
			},
			notArrayData2: 20000,
			notArrayData3: null,
			notArrayData4: "Not an array again",
			notArrayData5: undefined
		}
	};
	testProcess(t, '=min({{custom.array1}})', formData, null, null, 0);
	testProcess(t, '=min({{custom.array2}})', formData, null, null, -12);
	testProcess(t, '=min({{custom.array3}})', formData, null, null, null);
	testProcess(t, '=min({{custom.array4}})', formData, null, null, 12);
	testProcess(t, '=min({{custom.array5}})', formData, null, null, -100);
	testProcess(t, '=max({{custom.notArrayData1}})', formData, null, null, null);
	testProcess(t, '=max({{custom.notArrayData2}})', formData, null, null, null);
	testProcess(t, '=max({{custom.notArrayData3}})', formData, null, null, null);
	testProcess(t, '=max({{custom.notArrayData4}})', formData, null, null, null);
	testProcess(t, '=max({{custom.notArrayData5}})', formData, null, null, null);
});
