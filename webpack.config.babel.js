import path from 'path';

let serverConf = {
	mode: 'production',
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
	mode: 'production',
	entry: './src/FormulaValue.js',
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'FormulaValue.web.js',
		libraryTarget: 'var',
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
		'underscore': '_',
		'moment': 'moment'
	}
};

export default [serverConf, webConf];
