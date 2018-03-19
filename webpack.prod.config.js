const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

// const VENDOR_LIBRARIES = ["react", "react-dom"];

module.exports = merge(common, {
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								localIdentName: '[name]__[local]--[hash:base64:5]',
								importLoaders: 1
							}
						},
						{
							loader: 'sass-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								config: {
									path: 'postcss.config.js'
								}
							}
						}
					]
				})
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader?name=[name].[hash:base64:6].[ext]&outputPath=static/media/',
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							optipng: {
								enabled: false
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							gifsicle: {
								interlaced: false
							},
							webp: {
								quality: 75
							}
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: require.resolve('file-loader'),
				// exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
				options: {
					name: 'static/fonts/[name].[hash:8].[ext]'
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'static/css/[name].[chunkhash].css',
			disable: false,
			allChunks: true
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		//   name: "manifest"
		// }),
		new UglifyJSPlugin({
			sourceMap: true
		})
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'static/js/[name].[chunkhash].js'
	}
});
