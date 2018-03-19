const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]'
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader?name=[name].[ext]&outputPath=media/',
					{
						loader: 'image-webpack-loader'
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		hot: true,
		port: 5000,
		stats: 'errors-only',
		open: false
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js'
	}
});
