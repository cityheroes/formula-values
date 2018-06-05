import path from 'path';

let serverConf = {
	entry: './src/FormulaValue.js',
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'FormulaValue.js',
		libraryTarget: 'umd',
		library: 'FormulaValue'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map',
	externals: {
		'underscore': 'underscore',
		'moment': 'moment'
	}
};

let webConf = {
	entry: './src/FormulaValue.js',
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'FormulaValue.web.js',
		libraryTarget: 'umd',
		library: 'FormulaValue',
		libraryExport: 'default'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map',
	externals: {
		'underscore': 'underscore',
		'moment': 'moment'
	}
};

export default [serverConf, webConf];
