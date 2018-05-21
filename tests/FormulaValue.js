import FormulaValue from '../dist/FormulaValue';

describe('PlastikCalculatorService', function() {

	var formData = {
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
		'test\'custom': {
			'How many tasks were performed?': 2
		},
		'test"custom': {
			'How many tasks were performed?': 2
		},
		'test\"custom': {
			'How many tasks were performed?': 2
		},
		'test,custom': {
			'How many tasks were performed?': 2
		},
	};

	describe('#process Feature #1', function() {
		testProcess('123', formData, null, null, null);
		testProcess('=2+2', formData, null, null, 4);
		testProcess('=2*2', formData, null, null, 4);
		testProcess('=8/2', formData, null, null, 4);
		testProcess('=6-2', formData, null, null, 4);
	});

	describe('#process Feature #2', function() {
		testProcess('={{name}}', formData, null, null, 'Outside name');
	});

	describe('#process Feature #3', function() {
		testProcess('={{custom.name}}', formData, null, null, 'Inside name');
	});

	describe('#process Feature #1, #2, #3', function() {
		testProcess('={{custom.price}}*{{custom.quantity}}*(100+{{tax}})/100', formData, null, null, 46);
	});

	describe('#process Feature #4', function() {
		testProcess('={{custom.How many tasks were performed?}}', formData, null, null, 2);
		testProcess('={{custom.How many tasks were}performed?}}', formData, null, null, null);
		testProcess('={{custom.How many tasks were{performed?}}', formData, null, null, null);
		testProcess('={{custom.How many tasks were[performed?}}', formData, null, null, null);
		testProcess('={{custom.How many tasks were]performed?}}', formData, null, null, null);
		testProcess("={{custom.How many tasks were'performed?}}", formData, null, null, 2);
		testProcess('={{custom.How many tasks were\'performed?}}', formData, null, null, 2);
		testProcess('={{custom.How many tasks were"performed?}}', formData, null, null, 2);
		testProcess("={{custom.How many tasks were\"performed?}}", formData, null, null, 2);
		testProcess('={{custom.How many tasks were,performed?}}', formData, null, null, 2);

		testProcess('={{custom.workers[01].first_name}}', formData, null, null, 'Olene');

		// This should be rejected
		testProcess('={{custom.workers[4a].first_name}}', formData, null, null, null);
		testProcess('={{custom.workers[a].first_name}}', formData, null, null, null);
		testProcess('={{custom.workers[f234].first_name}}', formData, null, null, null);
		testProcess('={{custom.workers[a.first_name}}', formData, null, null, null);
		testProcess('={{custom.workers[a]sdf.first_name}}', formData, null, null, null);
		testProcess('={{custom.workers[1]sdf.first_name}}', formData, null, null, null);
		testProcess('={{custom.workersa].first_name}}', formData, null, null, null);
		testProcess('={{custom.workers23].first_name}}', formData, null, null, null);
		testProcess('={{custom.workers[1].workers23].first_name}}', formData, null, null, null);
	});

	describe('#process Feature #5', function() {
		testProcess('={{test custom.How many tasks were performed?}}', formData, null, null, 2);
		testProcess('={{test}custom.How many tasks were performed?}}', formData, null, null, null);
		testProcess('={{test{custom.How many tasks were performed?}}', formData, null, null, null);
		testProcess('={{test[custom.How many tasks were performed?}}', formData, null, null, null);
		testProcess('={{test]custom.How many tasks were performed?}}', formData, null, null, null);
		testProcess("={{test'custom.How many tasks were performed?}}", formData, null, null, 2);
		testProcess('={{test\'custom.How many tasks were performed?}}', formData, null, null, 2);
		testProcess('={{test"custom.How many tasks were performed?}}', formData, null, null, 2);
		testProcess("={{test\"custom.How many tasks were performed?}}", formData, null, null, 2);
		testProcess('={{test,custom.How many tasks were performed?}}', formData, null, null, 2);
	});

	describe('#process Feature #13 with normal unit names', function() {
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"years")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"years")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"years")', formData, null, null, 1);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"years")', formData, null, null, 1);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"years")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"years")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"years")', formData, null, null, 1);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"years")', formData, null, null, 1);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"years")', formData, null, null, -1);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"years")', formData, null, null, -1);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"years")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"years")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"years")', formData, null, null, -1);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"years")', formData, null, null, -1);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"years")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"years")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"years")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"months")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"months")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"months")', formData, null, null, 14);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"months")', formData, null, null, 14);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"months")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"months")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"months")', formData, null, null, 14);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"months")', formData, null, null, 14);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"months")', formData, null, null, -14);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"months")', formData, null, null, -14);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"months")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"months")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"months")', formData, null, null, -14);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"months")', formData, null, null, -14);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"months")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"months")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"months")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"weeks")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"weeks")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"weeks")', formData, null, null, 65);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"weeks")', formData, null, null, 64);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"weeks")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"weeks")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"weeks")', formData, null, null, 65);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"weeks")', formData, null, null, 65);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"weeks")', formData, null, null, -65);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"weeks")', formData, null, null, -65);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"weeks")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"weeks")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"weeks")', formData, null, null, -64);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"weeks")', formData, null, null, -65);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"weeks")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"weeks")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"weeks")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"days")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"days")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"days")', formData, null, null, 455);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"days")', formData, null, null, 454);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"days")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"days")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"days")', formData, null, null, 455);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"days")', formData, null, null, 455);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"days")', formData, null, null, -455);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"days")', formData, null, null, -455);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"days")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"days")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"days")', formData, null, null, -454);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"days")', formData, null, null, -455);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"days")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"days")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"days")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"hours")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"hours")', formData, null, null, -22);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"hours")', formData, null, null, 10920);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"hours")', formData, null, null, 10898);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"hours")', formData, null, null, 22);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"hours")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"hours")', formData, null, null, 10942);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"hours")', formData, null, null, 10921);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"hours")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"hours")', formData, null, null, 2);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"hours")', formData, null, null, -10920);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"hours")', formData, null, null, -10942);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"hours")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"hours")', formData, null, null, -21);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"hours")', formData, null, null, -10898);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"hours")', formData, null, null, -10921);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"hours")', formData, null, null, 21);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"hours")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"hours")', formData, null, null, -2);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"hours")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"hours")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"minutes")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"minutes")', formData, null, null, -1354);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"minutes")', formData, null, null, 655200);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"minutes")', formData, null, null, 653907);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"minutes")', formData, null, null, 1354);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"minutes")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"minutes")', formData, null, null, 656554);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"minutes")', formData, null, null, 655261);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"minutes")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"minutes")', formData, null, null, 121);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"minutes")', formData, null, null, -655200);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"minutes")', formData, null, null, -656554);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"minutes")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"minutes")', formData, null, null, -1292);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"minutes")', formData, null, null, -653907);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"minutes")', formData, null, null, -655261);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"minutes")', formData, null, null, 1292);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"minutes")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"minutes")', formData, null, null, -121);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"minutes")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"minutes")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"seconds")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"seconds")', formData, null, null, -81252);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"seconds")', formData, null, null, 39312000);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"seconds")', formData, null, null, 39234466);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"seconds")', formData, null, null, 81252);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"seconds")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"seconds")', formData, null, null, 39393252);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"seconds")', formData, null, null, 39315718);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"seconds")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"seconds")', formData, null, null, 7290);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"seconds")', formData, null, null, -39312000);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"seconds")', formData, null, null, -39393252);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"seconds")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"seconds")', formData, null, null, -77534);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"seconds")', formData, null, null, -39234466);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"seconds")', formData, null, null, -39315718);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"seconds")', formData, null, null, 77534);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"seconds")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"seconds")', formData, null, null, -7290);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"seconds")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"seconds")', formData, null, null, 0);
	});

	describe('#process Feature #13 with alias unit names', function () {

		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"Y")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"Y")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"Y")', formData, null, null, 1);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"Y")', formData, null, null, 1);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"Y")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"Y")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"Y")', formData, null, null, 1);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"Y")', formData, null, null, 1);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"Y")', formData, null, null, -1);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"Y")', formData, null, null, -1);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"Y")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"Y")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"Y")', formData, null, null, -1);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"Y")', formData, null, null, -1);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"Y")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"Y")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"Y")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"M")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"M")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"M")', formData, null, null, 14);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"M")', formData, null, null, 14);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"M")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"M")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"M")', formData, null, null, 14);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"M")', formData, null, null, 14);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"M")', formData, null, null, -14);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"M")', formData, null, null, -14);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"M")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"M")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"M")', formData, null, null, -14);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"M")', formData, null, null, -14);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"M")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"M")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"M")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"W")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"W")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"W")', formData, null, null, 65);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"W")', formData, null, null, 64);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"W")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"W")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"W")', formData, null, null, 65);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"W")', formData, null, null, 65);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"W")', formData, null, null, -65);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"W")', formData, null, null, -65);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"W")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"W")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"W")', formData, null, null, -64);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"W")', formData, null, null, -65);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"W")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"W")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"W")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"D")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"D")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"D")', formData, null, null, 455);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"D")', formData, null, null, 454);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"D")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"D")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"D")', formData, null, null, 455);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"D")', formData, null, null, 455);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"D")', formData, null, null, -455);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"D")', formData, null, null, -455);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"D")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"D")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"D")', formData, null, null, -454);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"D")', formData, null, null, -455);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"D")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"D")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"D")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"h")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"h")', formData, null, null, -22);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"h")', formData, null, null, 10920);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"h")', formData, null, null, 10898);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"h")', formData, null, null, 22);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"h")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"h")', formData, null, null, 10942);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"h")', formData, null, null, 10921);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"h")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"h")', formData, null, null, 2);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"h")', formData, null, null, -10920);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"h")', formData, null, null, -10942);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"h")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"h")', formData, null, null, -21);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"h")', formData, null, null, -10898);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"h")', formData, null, null, -10921);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"h")', formData, null, null, 21);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"h")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"h")', formData, null, null, -2);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"h")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"h")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"m")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"m")', formData, null, null, -1354);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"m")', formData, null, null, 655200);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"m")', formData, null, null, 653907);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"m")', formData, null, null, 1354);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"m")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"m")', formData, null, null, 656554);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"m")', formData, null, null, 655261);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"m")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"m")', formData, null, null, 121);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"m")', formData, null, null, -655200);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"m")', formData, null, null, -656554);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"m")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"m")', formData, null, null, -1292);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"m")', formData, null, null, -653907);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"m")', formData, null, null, -655261);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"m")', formData, null, null, 1292);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"m")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"m")', formData, null, null, -121);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"m")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"m")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date1}},"s")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date1}},{{custom.date2}},"s")', formData, null, null, -81252);
		testProcess('=dateDiff({{custom.date1}},{{custom.date3}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date1}},{{custom.date4}},"s")', formData, null, null, 39312000);
		testProcess('=dateDiff({{custom.date1}},{{custom.date5}},"s")', formData, null, null, 39234466);
		testProcess('=dateDiff({{custom.date1}},{{custom.date6}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date1}},"s")', formData, null, null, 81252);
		testProcess('=dateDiff({{custom.date2}},{{custom.date2}},"s")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date2}},{{custom.date3}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date2}},{{custom.date4}},"s")', formData, null, null, 39393252);
		testProcess('=dateDiff({{custom.date2}},{{custom.date5}},"s")', formData, null, null, 39315718);
		testProcess('=dateDiff({{custom.date2}},{{custom.date6}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date1}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date2}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date3}},"s")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date3}},{{custom.date4}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date5}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date3}},{{custom.date6}},"s")', formData, null, null, 7290);
		testProcess('=dateDiff({{custom.date4}},{{custom.date1}},"s")', formData, null, null, -39312000);
		testProcess('=dateDiff({{custom.date4}},{{custom.date2}},"s")', formData, null, null, -39393252);
		testProcess('=dateDiff({{custom.date4}},{{custom.date3}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date4}},{{custom.date4}},"s")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date4}},{{custom.date5}},"s")', formData, null, null, -77534);
		testProcess('=dateDiff({{custom.date4}},{{custom.date6}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date1}},"s")', formData, null, null, -39234466);
		testProcess('=dateDiff({{custom.date5}},{{custom.date2}},"s")', formData, null, null, -39315718);
		testProcess('=dateDiff({{custom.date5}},{{custom.date3}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date5}},{{custom.date4}},"s")', formData, null, null, 77534);
		testProcess('=dateDiff({{custom.date5}},{{custom.date5}},"s")', formData, null, null, 0);
		testProcess('=dateDiff({{custom.date5}},{{custom.date6}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date1}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date2}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date3}},"s")', formData, null, null, -7290);
		testProcess('=dateDiff({{custom.date6}},{{custom.date4}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date5}},"s")', formData, null, null, null);
		testProcess('=dateDiff({{custom.date6}},{{custom.date6}},"s")', formData, null, null, 0);
	});

	describe('#process Feature 6', function() {
		testProcess('={{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].first_name', 'Olene');
		testProcess('={{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Olene');
		testProcess('={{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Olene');
		testProcess('={{custom.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Olene');
		testProcess('={{custom.workers[@].workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', 'Lorraine');

		testProcess('={{unexistent context.workers[@].first_name}}', formData, null, 'custom.workers[1].workers[0].workers[0].first_name', null);
	});

	describe('#process Feature 7', function() {
		testProcess('={{custom.workers[1].first_name}}', formData, null, null, 'Olene');
	});

	describe('#process Feature 8', function() {
		testProcess('={{custom.products[*].quantity}}', formData, null, null, [5, 10, 15, 20, 25]);
		testProcess('={{custom.products[*].product}}', formData, null, null, ['Product 1','Product 2','Product 3','Product 4','Product 5']);
	});

	describe('#process Feature 9', function() {
		testProcess('=sum({{custom.products[*].quantity}})', formData, null, null, 75);
		testProcess('=avg({{custom.products[*].quantity}})', formData, null, null, 15);
	});

	describe('#proces Feature 14', function() {
		var formData = {
			custom: {
				product: 'Lavandina Sachet',
				quantity: 15
			}
		};
		var formMetaData = {
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

		testProcess('={{custom.product::price}}*{{custom.quantity}}', formData, formMetaData, null, 300);
		testProcess('={{custom.product::info.inventoryId}}', formData, formMetaData, null, 15388);
		testProcess('={{custom.product::info.location}}', formData, formMetaData, null, 'Estante 4');
		testProcess('={{custom.product::price}}*(1-{{custom.product::info.promos[0].discount}})*{{custom.quantity}}', formData, formMetaData, null, 225);
		testProcess('={{custom.product::price}}*(1-{{custom.product::info.promos[1].discount}})*{{custom.quantity}}', formData, formMetaData, null, 270);
		testProcess('={{custom.product::price}}*(1-{{custom.product::info.promos[2].discount}})*{{custom.quantity}}', formData, formMetaData, null, 285);
		testProcess('={{custom.product::info.promos[*].discount}}', formData, formMetaData, null, [0.25, 0.1, 0.05, 0.01]);
		testProcess('=avg({{custom.product::info.promos[*].discount}})', formData, formMetaData, null, 0.1025);
	});

	describe('#process Feature 18', function() {
		var formData = {
			custom: {
				compositeData1: '328516028|5407|383401700074490|18/10/2017|12.00|12.00|25-33-9F-1A-C5|791638|0|0|0|0'
			}
		};

		var formMetaData = {};

		testProcess('=extract({{custom.compositeData1}},"|",-1)', formData, formMetaData, null, undefined);
		testProcess('=extract({{custom.compositeData1}},"|",0)', formData, formMetaData, null, 328516028);
		testProcess('=extract({{custom.compositeData1}},"|",1)', formData, formMetaData, null, 5407);
		testProcess('=extract({{custom.compositeData1}},"|",2)', formData, formMetaData, null, 383401700074490);
		testProcess('=extract({{custom.compositeData1}},"|",3)', formData, formMetaData, null, '18/10/2017');
		testProcess('=extract({{custom.compositeData1}},"|",4)', formData, formMetaData, null, 12.00);
		testProcess('=extract({{custom.compositeData1}},"|",5)', formData, formMetaData, null, 12.00);
		testProcess('=extract({{custom.compositeData1}},"|",6)', formData, formMetaData, null, '25-33-9F-1A-C5');
		testProcess('=extract({{custom.compositeData1}},"|",7)', formData, formMetaData, null, 791638);
		testProcess('=extract({{custom.compositeData1}},"|",8)', formData, formMetaData, null, 0);
		testProcess('=extract({{custom.compositeData1}},"|",9)', formData, formMetaData, null, 0);
		testProcess('=extract({{custom.compositeData1}},"|",10)', formData, formMetaData, null, 0);
		testProcess('=extract({{custom.compositeData1}},"|",11)', formData, formMetaData, null, 0);
		testProcess('=extract({{custom.compositeData1}},"|",12)', formData, formMetaData, null, undefined);
	});

	describe('#process Feature 17', function() {
		formData = {
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

		var formMetaData = {
			custom: {
				composite: []
			}
		};

		testProcess('=groupConcat({{custom.composite[*].name}})', formData, formMetaData, null, 'Name 1, Name 2');
		testProcess('=groupConcat({{custom.composite[*].name}}," - ")', formData, formMetaData, null, 'Name 1 - Name 2');
		testProcess('=groupConcat({{custom.emptyComposite[*].name}}," - ")', formData, formMetaData, null, '');
		testProcess('=groupConcat({{custom.unexistentComposite[*].name}}," - ")', formData, formMetaData, null, '');
	});

	describe('#process Feature 18', function() {
		formData = {
			custom: {
				first_name: 'Fernando',
				last_name: 'Salidas',
				amount: 500,
				discount: 10
			}
		};

		var formMetaData = {
		};

		testProcess('=concat({{custom.first_name}},{{custom.last_name}})', formData, formMetaData, null, 'FernandoSalidas');
		testProcess('=concat({{custom.first_name}}," ",{{custom.last_name}})', formData, formMetaData, null, 'Fernando Salidas');
		testProcess('=concat({{custom.first_name}}," ",{{custom.last_name}}," bought ",{{custom.amount}}," dollars of bread with a discount of ",{{custom.discount}},"%")', formData, formMetaData, null, 'Fernando Salidas bought 500 dollars of bread with a discount of 10%');
		testProcess('=concat({{custom.first_name}}," ",{{custom.last_name}}," bought ",{{custom.amount}}," dollars of bread with a discount of ",{{custom.discount}},"% spending ",{{custom.amount}}*(1-{{custom.discount}}/100)," dollars")', formData, formMetaData, null, 'Fernando Salidas bought 500 dollars of bread with a discount of 10% spending 450 dollars');
	});
	function testProcess(formula, formData, formMetaData, context, expectedResult) {
		it ('Should return ' + expectedResult + ' for "' + formula + '" and context "' + context + '"', function() {
			var fv = new FormulaValue(formula);
			var result = fv.eval(formData, formMetaData, context);
			if (_.isArray(expectedResult)) {
				expect(result).toEqual(expectedResult);
			} else {
				expect(result).toBe(expectedResult);
			}
		});
	}

});
