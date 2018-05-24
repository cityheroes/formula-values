import path from 'path';

export default () => ({
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
});
