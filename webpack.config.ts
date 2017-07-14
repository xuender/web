import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
const extractSass = new ExtractTextPlugin({
	filename: "[name].[hash].css",
	disable: process.env.NODE_ENV === "development"
});
declare var __dirname;

const config: webpack.Configuration = {
	entry: {
		app: './src/index.js',
		// app: './src/index.ts',
		vendors: ['jquery', 'codemirror'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]-[hash].js'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [{
						loader: "css-loader"
					}, {
						loader: "sass-loader"
					}],
					fallback: "style-loader"
				})
			},
			{
				test: /\.ts/,
				loader: 'ts-loader'
			},
			// Fonts
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loaders: ['url-loader?limit=10000&mimetype=application/font-woff']
			},
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loaders: ['url-loader?limit=10000&mimetype=application/font-woff']
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loaders: ['url-loader?limit=10000&mimetype=application/octet-stream']
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loaders: ['file-loader']
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loaders: ['url-loader?limit=10000&mimetype=image/svg+xml']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
		}),
		extractSass,
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: "jquery",
			'window.jQuery': 'jquery',
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		hot: true,
		historyApiFallback: true,
		inline: true,
	}
};

export default config;
