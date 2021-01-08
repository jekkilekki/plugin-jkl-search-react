const path = require('path');

module.exports = {
	entry: './assets/js/public.js',
	externals: {
		jquery: "jQuery"
	},
	output: {
		filename: 'public.min.js',
		path: path.resolve( __dirname, 'dist' )
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['babel-preset-env', 'babel-preset-react']
					}
				}
			},
			{
				test: /\.css$/i,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			},
			{
				test: /\.(png|jpg)$/,
				use: {
					loader: 'url-loader'
				}
			}
		]
	}
};