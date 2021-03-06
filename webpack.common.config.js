const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/client/index.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Webpack 101',
			minify: {
				collapseWhitespace: true
			},
			hash: false,
			template: './src/client/index.html'
		})
	]
};
