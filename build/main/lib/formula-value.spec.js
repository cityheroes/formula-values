var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "ava", "dayjs", "./formula-value"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ava_1 = __importDefault(require("ava"));
    var dayjs_1 = __importDefault(require("dayjs"));
    var formula_value_1 = require("./formula-value");
    var testProcess = function (test, formula, formData, formMetaData, context, expectedResult) {
        var fv = new formula_value_1.FormulaValue(formula);
        var result = fv.eval(formData, formMetaData, context);
        test.deepEqual(result, expectedResult);
    };
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
    ava_1.default('#process Feature #1', function (t) {
        testProcess(t, '123', formData, null, null, '123');
        testProcess(t, '=2+2', formData, null, null, 4);
        testProcess(t, '=2*2', formData, null, null, 4);
        testProcess(t, '=8/2', formData, null, null, 4);
        testProcess(t, '=6-2', formData, null, null, 4);
    });
    ava_1.default('#process Feature #2', function (t) {
        testProcess(t, '={{name}}', formData, null, null, 'Outside name');
        testProcess(t, '{{name}}', formData, null, null, 'Outside name');
        testProcess(t, '{{name}} is THE NAME', formData, null, null, 'Outside name is THE NAME');
    });
    ava_1.default('#process Feature #3', function (t) {
        testProcess(t, '={{custom.name}}', formData, null, null, 'Inside name');
        testProcess(t, '{{custom.name}}', formData, null, null, 'Inside name');
        testProcess(t, '{{custom.name}} is the Custom name!', formData, null, null, 'Inside name is the Custom name!');
    });
    ava_1.default('#process Feature #1, #2, #3', function (t) {
        testProcess(t, '={{custom.price}}*{{custom.quantity}}*(100+{{tax}})/100', formData, null, null, 46);
        testProcess(t, '{{custom.price}}*{{custom.quantity}}*(100+{{tax}})/100', formData, null, null, '20*2*(100+15)/100');
    });
    ava_1.default('#process Feature #4', function (t) {
        testProcess(t, '={{custom.How many tasks were performed?}}', formData, null, null, 2);
        testProcess(t, '={{custom.How many tasks were}performed?}}', formData, null, null, null);
        testProcess(t, '={{custom.How many tasks were{performed?}}', formData, null, null, null);
        testProcess(t, '={{custom.How many tasks were[performed?}}', formData, null, null, null);
        testProcess(t, '={{custom.How many tasks were]performed?}}', formData, null, null, null);
        testProcess(t, "={{custom.How many tasks were'performed?}}", formData, null, null, 2);
        testProcess(t, '={{custom.How many tasks were\'performed?}}', formData, null, null, 2);
        testProcess(t, '={{custom.How many tasks were"performed?}}', formData, null, null, 2);
        testProcess(t, "={{custom.How many tasks were\"performed?}}", formData, null, null, 2);
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
    ava_1.default('#process Feature #5', function (t) {
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
        testProcess(t, "{{test'custom.How many tasks were performed?}}", formData, null, null, '2');
        testProcess(t, '{{test\'custom.How many tasks were performed?}}', formData, null, null, '2');
        testProcess(t, '{{test"custom.How many tasks were performed?}}', formData, null, null, '2');
        testProcess(t, "{{test\"custom.How many tasks were performed?}}", formData, null, null, '2');
        testProcess(t, '{{test,custom.How many tasks were performed?}}', formData, null, null, '2');
    });
    ava_1.default('#process Feature #13 with normal unit names', function (t) {
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
    ava_1.default('#process Feature #13 with alias unit names', function (t) {
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
    ava_1.default('#process Feature 6', function (t) {
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
    ava_1.default('#process Feature 7', function (t) {
        testProcess(t, '={{custom.workers[1].first_name}}', formData, null, null, 'Olene');
        testProcess(t, '{{custom.workers[1].first_name}}', formData, null, null, 'Olene');
    });
    ava_1.default('#process Feature 8', function (t) {
        testProcess(t, '={{custom.products[*].quantity}}', formData, null, null, [5, 10, 15, 20, 25]);
        testProcess(t, '={{custom.products[*].product}}', formData, null, null, ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5']);
        testProcess(t, '{{custom.products[*].quantity}}', formData, null, null, '');
        testProcess(t, '{{custom.products[*].product}}', formData, null, null, '');
    });
    ava_1.default('#process Feature 9', function (t) {
        testProcess(t, '=sum({{custom.products[*].quantity}})', formData, null, null, 75);
        testProcess(t, '=avg({{custom.products[*].quantity}})', formData, null, null, 15);
        testProcess(t, 'sum({{custom.products[*].quantity}})', formData, null, null, 'sum()');
        testProcess(t, 'avg({{custom.products[*].quantity}})', formData, null, null, 'avg()');
    });
    ava_1.default('#proces Feature 14', function (t) {
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
    ava_1.default('#process Feature 18', function (t) {
        var formData = {
            custom: {
                compositeData1: '328516028|5407|383401700074490|18/10/2017|12.00|12.00|25-33-9F-1A-C5|791638|0|0|0|0'
            }
        };
        var formMetaData = {};
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
    ava_1.default('#process Feature 17', function (t) {
        var formData = {
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
        testProcess(t, '=groupConcat({{custom.composite[*].name}})', formData, formMetaData, null, 'Name 1, Name 2');
        testProcess(t, '=groupConcat({{custom.composite[*].name}}," - ")', formData, formMetaData, null, 'Name 1 - Name 2');
        testProcess(t, '=groupConcat({{custom.emptyComposite[*].name}}," - ")', formData, formMetaData, null, '');
        testProcess(t, '=groupConcat({{custom.unexistentComposite[*].name}}," - ")', formData, formMetaData, null, '');
        testProcess(t, '=groupConcat({{custom.unexistentComposite[*].name}}," - ")', formData, formMetaData, null, '');
    });
    ava_1.default('#process Feature 18b', function (t) {
        var formData = {
            custom: {
                first_name: 'Fernando',
                last_name: 'Salidas',
                amount: 500,
                discount: 10
            }
        };
        var formMetaData = {};
        testProcess(t, '=concat({{custom.first_name}},{{custom.last_name}})', formData, formMetaData, null, 'FernandoSalidas');
        testProcess(t, '=concat({{custom.first_name}}," ",{{custom.last_name}})', formData, formMetaData, null, 'Fernando Salidas');
        testProcess(t, '=concat({{custom.first_name}}," ",{{custom.last_name}}," bought ",{{custom.amount}}," dollars of bread with a discount of ",{{custom.discount}},"%")', formData, formMetaData, null, 'Fernando Salidas bought 500 dollars of bread with a discount of 10%');
        testProcess(t, '=concat({{custom.first_name}}," ",{{custom.last_name}}," bought ",{{custom.amount}}," dollars of bread with a discount of ",{{custom.discount}},"% spending ",{{custom.amount}}*(1-{{custom.discount}}/100)," dollars")', formData, formMetaData, null, 'Fernando Salidas bought 500 dollars of bread with a discount of 10% spending 450 dollars');
        testProcess(t, 'concat({{custom.first_name}}," ",{{custom.last_name}}," bought ",{{custom.amount}}," dollars of bread with a discount of ",{{custom.discount}},"% spending ",{{custom.amount}}*(1-{{custom.discount}}/100)," dollars")', formData, formMetaData, null, 'concat(Fernando," ",Salidas," bought ",500," dollars of bread with a discount of ",10,"% spending ",500*(1-10/100)," dollars")');
    });
    ava_1.default('#process Feature 19', function (t) {
        var formData = {
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
    ava_1.default('#process Feature 20', function (t) {
        var formData = {
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
    ava_1.default('#process Feature 21', function (t) {
        var formData = {
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
    ava_1.default('#process Feature #21 with normal unit names', function (t) {
        testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 0, 0)', null, null, null, dayjs_1.default().set('millisecond', 0).toISOString());
        testProcess(t, '=datetimeFromNow(1, 0, 0, 0, 0, 0)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'year').toISOString());
        testProcess(t, '=datetimeFromNow(-1, 0, 0, 0, 0, 0)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'year').toISOString());
        testProcess(t, '=datetimeFromNow(0, 1, 0, 0, 0, 0)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'month').toISOString());
        testProcess(t, '=datetimeFromNow(0, -1, 0, 0, 0, 0)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'month').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 1, 0, 0, 0)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'day').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, -1, 0, 0, 0)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'day').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, 1, 0, 0)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'hour').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, -1, 0, 0)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'hour').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 1, 0)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'minute').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, 0, -1, 0)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'minute').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 0, 1)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'second').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 0, -1)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'second').toISOString());
        testProcess(t, '=datetimeFromNow()', null, null, null, dayjs_1.default().set('millisecond', 0).toISOString());
        testProcess(t, '=datetimeFromNow(1)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'year').toISOString());
        testProcess(t, '=datetimeFromNow(-1)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'year').toISOString());
        testProcess(t, '=datetimeFromNow(0, 1)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'month').toISOString());
        testProcess(t, '=datetimeFromNow(0, -1)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'month').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 1)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'day').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, -1)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'day').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, 1)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'hour').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, -1)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'hour').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 1)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'minute').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, 0, -1)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'minute').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 0, 1)', null, null, null, dayjs_1.default().set('millisecond', 0).add(1, 'second').toISOString());
        testProcess(t, '=datetimeFromNow(0, 0, 0, 0, 0, -1)', null, null, null, dayjs_1.default().set('millisecond', 0).subtract(1, 'second').toISOString());
        testProcess(t, '=formatDate(datetimeFromNow(), "YYYYMMDD", true)', null, null, null, dayjs_1.default().set('millisecond', 0).format('YYYYMMDD'));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXVsYS12YWx1ZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mb3JtdWxhLXZhbHVlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSw0Q0FBdUI7SUFDdkIsZ0RBQTBCO0lBRTFCLGlEQUErQztJQUUvQyxJQUFNLFdBQVcsR0FBRyxVQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsY0FBYztRQUNsRixJQUFNLEVBQUUsR0FBRyxJQUFJLDRCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLElBQU0sUUFBUSxHQUFHO1FBQ2hCLElBQUksRUFBRSxjQUFjO1FBQ3BCLEdBQUcsRUFBRSxFQUFFO1FBQ1AsTUFBTSxFQUFFO1lBQ1AsSUFBSSxFQUFFLGFBQWE7WUFDbkIsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsQ0FBQztZQUNYLGdDQUFnQyxFQUFFLENBQUM7WUFDbkMsZ0NBQWdDLEVBQUUsQ0FBQztZQUNuQyxnQ0FBZ0MsRUFBRSxDQUFDO1lBQ25DLGdDQUFnQyxFQUFFLENBQUM7WUFDbkMsZ0NBQWdDLEVBQUUsQ0FBQztZQUNuQyxnQ0FBZ0MsRUFBRSxDQUFDO1lBQ25DLGdDQUFnQyxFQUFFLENBQUM7WUFDbkMsZ0NBQWdDLEVBQUUsQ0FBQztZQUNuQyxLQUFLLEVBQUUsWUFBWTtZQUNuQixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLEtBQUssRUFBRSxZQUFZO1lBQ25CLEtBQUssRUFBRSxxQkFBcUI7WUFDNUIs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RUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsdURBQXVELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxxREFBcUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHFEQUFxRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUscURBQXFELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHNEQUFzRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxDQUFDLEVBQUUsc0RBQXNELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxzREFBc0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEcsV0FBVyxDQUFDLENBQUMsRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxXQUFXLENBQUMsQ0FBQyxFQUFFLHdEQUF3RCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsd0RBQXdELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEcsV0FBVyxDQUFDLENBQUMsRUFBRSx1REFBdUQsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSx1Q0FBdUMsQ0FBQyxDQUFDO0lBQ3hJLENBQUMsQ0FBQyxDQUFDO0lBRUgsYUFBSSxDQUFDLDRDQUE0QyxFQUFFLFVBQUMsQ0FBQztRQUVwRCxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUYsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFL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a0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRyxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFD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LENBQUM7UUFDaEcsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuRyxXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9GLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFdBQVcsQ0FBQyxDQUFDLEVBQUUsa0RBQWtELEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YsV0FBVyxDQUFDLENBQUMsRUFBRSxrREFBa0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixXQUFXLENBQUMsQ0FBQyxFQUFFLGtEQUFrRCxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxF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