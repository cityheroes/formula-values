
function init() {
	var inspector = new Inspector();
}
var Inspector = function() {
	this.initializeElements();
	this.initializeEvents();
	this.restoreState();
	console.log('Inspector initialized.');
}

Inspector.prototype.initializeElements = function() {
	this.elements = {
		fvExpression: document.getElementById('fvExpression'),
		data: document.getElementById('data'),
		metaData: document.getElementById('metaData'),
		result: document.getElementById('result'),
		fvForm: document.getElementById('fvForm')
	};
};

Inspector.prototype.initializeEvents = function() {
	this.elements.fvForm.addEventListener('submit', this.onFormSubmit.bind(this));
};

Inspector.prototype.onFormSubmit = function(event) {
	event.preventDefault();
	this.evalContent();
};

Inspector.prototype.onKeyPress = function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		this.evalContent();
	}
};

Inspector.prototype.parseJSON = function(value) {
	try {
		return JSON.parse(value);
	} catch (e) {
		alert('Invalid JSON: ' + e.message);
		return {};
	}
};

Inspector.prototype.persistState = function() {
	var elements = this.elements;
	localStorage.setItem('fvExpression', elements.fvExpression.value);
	localStorage.setItem('data', elements.data.value);
	localStorage.setItem('metaData', elements.metaData.value);
};

Inspector.prototype.restoreState = function() {
	var elements = this.elements;
	 elements.fvExpression.value = localStorage.getItem('fvExpression');
	 elements.data.value = localStorage.getItem('data');
	 elements.metaData.value = localStorage.getItem('metaData');
};

Inspector.prototype.extractParams = function() {
	var params = {},
		elements = this.elements;

	params.fvExpression = elements.fvExpression.value || '';

	params.data = this.parseJSON(elements.data.value);
	elements.data.value = JSON.stringify(params.data, null, 3);

	params.metaData = this.parseJSON(elements.metaData.value);
	elements.metaData.value = JSON.stringify(params.metaData, null, 3);

	return params;
};

Inspector.prototype.evalContent = function() {
	var params = this.extractParams();
	this.persistState();

	try {
		var fv = new FormulaValue(params.fvExpression);
		var result = fv.eval(params.data, params.metaData, '');
		this.elements.result.value = result;
		console.info('Result: ' + result);
	} catch (e) {
		alert('An error occurred while evaluating the FormulaValue: ' + e.message);
	}
};