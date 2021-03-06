import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
const extractSass = new ExtractTextPlugin({
	filename: "static/[name].[hash:8].css",
	disable: process.env.NODE_ENV === "development"
});
declare var __dirname;

const config: webpack.Configuration = {
	entry: {
		app: './src/index.js',
		vendors: ['jquery'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'static/[name]-[hash:8].js'
	},
	module: {
		loaders: [
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192&name=static/[name]-[hash:8].[ext]',
			},
			{
				test: /\.html$/,
				loader: 'html-withimg-loader?min=false'
			},
			{
				test: /\.css$/,
				use: extractSass.extract({
					use: [{
						loader: "css-loader"
					}],
					fallback: "style-loader"
				})
			},
			{	// SASS
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
			{	// Typescript
				test: /\.ts/,
				loader: 'ts-loader'
			},
			{	// Fonts
				test: /\.(eot|svg|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loaders: ['file-loader?name=static/[name]-[hash:8].[ext]']
			},
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
