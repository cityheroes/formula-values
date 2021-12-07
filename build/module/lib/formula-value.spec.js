import test from 'ava';
import dayjs from 'dayjs';
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
test('#process Feature #21 with normal unit names', (t) => {
    testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 0, 0)', null, null, null, dayjs().set('millisecond', 0).toISOString());
    testProcess(t, '=datetimeFromNow(1, 0, 0, 0, 0, 0)', null, null, null, dayjs().set('millisecond', 0).add(1, 'year').toISOString());
    testProcess(t, '=datetimeFromNow(-1, 0, 0, 0, 0, 0)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'year').toISOString());
    testProcess(t, '=datetimeFromNow(0, 1, 0, 0, 0, 0)', null, null, null, dayjs().set('millisecond', 0).add(1, 'month').toISOString());
    testProcess(t, '=datetimeFromNow(0, -1, 0, 0, 0, 0)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'month').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 1, 0, 0, 0)', null, null, null, dayjs().set('millisecond', 0).add(1, 'day').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, -1, 0, 0, 0)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'day').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, 1, 0, 0)', null, null, null, dayjs().set('millisecond', 0).add(1, 'hour').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, -1, 0, 0)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'hour').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 1, 0)', null, null, null, dayjs().set('millisecond', 0).add(1, 'minute').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, 0, -1, 0)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'minute').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 0, 1)', null, null, null, dayjs().set('millisecond', 0).add(1, 'second').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 0, -1)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'second').toISOString());
    testProcess(t, '=datetimeFromNow()', null, null, null, dayjs().set('millisecond', 0).toISOString());
    testProcess(t, '=datetimeFromNow(1)', null, null, null, dayjs().set('millisecond', 0).add(1, 'year').toISOString());
    testProcess(t, '=datetimeFromNow(-1)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'year').toISOString());
    testProcess(t, '=datetimeFromNow(0, 1)', null, null, null, dayjs().set('millisecond', 0).add(1, 'month').toISOString());
    testProcess(t, '=datetimeFromNow(0, -1)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'month').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 1)', null, null, null, dayjs().set('millisecond', 0).add(1, 'day').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, -1)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'day').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, 1)', null, null, null, dayjs().set('millisecond', 0).add(1, 'hour').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, -1)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'hour').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 1)', null, null, null, dayjs().set('millisecond', 0).add(1, 'minute').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, 0, -1)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'minute').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 0, 1)', null, null, null, dayjs().set('millisecond', 0).add(1, 'second').toISOString());
    testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 0, -1)', null, null, null, dayjs().set('millisecond', 0).subtract(1, 'second').toISOString());
    testProcess(t, '=formatDate(datetimeFromNow(), "YYYYMMDD", true)', null, null, null, dayjs().set('millisecond', 0).format('YYYYMMDD'));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXVsYS12YWx1ZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mb3JtdWxhLXZhbHVlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxFQUFFO0lBQ3RGLE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRztJQUNoQixJQUFJLEVBQUUsY0FBYztJQUNwQixHQUFHLEVBQUUsRUFBRTtJQUNQLE1BQU0sRUFBRTtRQUNQLElBQUksRUFBRSxhQUFhO1FBQ25CLEtBQUssRUFBRSxFQUFFO1FBQ1QsUUFBUSxFQUFFLENBQUM7UUFDWCxnQ0FBZ0MsRUFBRSxDQUFDO1FBQ25DLGdDQUFnQyxFQUFFLENBQUM7UUFDbkMsZ0NBQWdDLEVBQUUsQ0FBQztRQUNuQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQ25DLGdDQUFnQyxFQUFFLENBQUM7UUFDbkMsZ0NBQWdDLEVBQUUsQ0FBQztRQUNuQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQ25DLGdDQUFnQyxFQUFFLENBQUM7UUFDbkMsS0FBSyxFQUFFLFlBQVk7UUFDbkIsS0FBSyxFQUFFLHFCQUFxQjtRQUM1QixLQUFL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QUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ2pDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsNENBQTRDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEYsV0FBVyxDQUFDLENBQUMsRUFBRSw0Q0FBNEMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RixXQUFXLENBQUMsQ0FBQyxFQUFFLDRDQUE0QyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsNENBQTRDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekYsV0FBVyxDQUFDLENBQUMsRUFBRSw0Q0FBNEMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RixXQUFXLENBQUMsQ0FBQyxFQUFFLDRDQUE0QyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsNkNBQTZDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkYsV0FBVyxDQUFDLENBQUMsRUFBRSw0Q0FBNEMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0RixXQUFXLENBQUMsQ0FBQyxFQUFFLDRDQUE0QyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsNENBQTRDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFdEYsV0FB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QUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDekcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDekcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLHVDQUF1QyxDQUFDLENBQUM7QUFDeEksQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsNENBQTRDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUV4RCxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxD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LFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJ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WUFDbkIsYUFBYSxFQUFFLGNBQWM7WUFDN0IsYUFBYSxFQUFFLFNBQVM7U0FDeEI7S0FDRCxDQUFDO0lBQ0YsV0FBVyxDQUFDLENBQUMsRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RSxXQUFXLENBQUMsQ0FBQyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLFdBQVcsQ0FBQyxDQUFDLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEUsV0FBVyxDQUFDLENBQUMsRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyRSxXQUFXLENBQUMsQ0FBQyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsZ0NBQWdDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0UsV0FBVyxDQUFDLENBQUMsRUFBRSxnQ0FBZ0MsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RSxXQUFXLENBQUMsQ0FBQyxFQUFFLGdDQUFnQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsZ0NBQWdDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0UsV0FBVyxDQUFDLENBQUMsRUFBRSxnQ0FBZ0MsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RSxDQUFDLENB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R0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDeEksV0FBVyxDQUFDLENBQUMsRUFBRSxvQ0FBb0MsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNuSSxXQUFXLENBQUMsQ0FBQyxFQUFFLHFDQUFxQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3pJLFdBQVcsQ0FBQyxDQUFDLEVBQUUsb0NBQW9DLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDckksV0FBVyxDQUFDLENBQUMsRUFBRSxxQ0FBcUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUMzSSxXQUFXLENBQUMsQ0FBQyxFQUFFLG9DQUFvQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMs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