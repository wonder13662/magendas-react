const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;

module.exports = function(env) {
	return {
		entry: {
            main: path.resolve(__dirname, '../app/src'),
			vendor: [
				'babel-polyfill',
				'bootstrap',
				'i18next',
				'jquery',
				'moment',
				'moment-timezone',
				'parsleyjs',
				'prop-types',
				'react',
				'immutable',
				'react-addons-shallow-compare',
				'react-places-autocomplete',
				'react-bootstrap',
				'react-dates',
				'react-dom',
				'react-redux',
				'react-redux-toastr',
				'react-router-dom',
				'react-month-picker',
				'redux',
				'rxjs',
				'underscore',
				'numeral',
				'picker',
				'pickadate',
				'select2',
			]
		},
		output: {
			path: path.join(__dirname, '..', 'build-prod', 'static'),
			filename: '[name].[chunkhash].bundle.js',
			publicPath: 'https://d3gue9xwltc7sk.cloudfront.net/'
		},
		module:{
			rules:[
				{
					test:/\.js$/,
					loader: 'eslint-loader',
					enforce: "pre",
					exclude: /node_modules/,
					options: require(path.resolve(__dirname, 'eslint.config.js'))
				},
				{
					test:/\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					options: {
						presets:['react',["es2015", { "modules": false }]]
					}
				},
				{
					test:/\.css$/,
					use: ['style-loader','css-loader'],
				},
				{
					test:/\.scss$/,
					loader: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: "css-loader?sourceMap!sass-loader?sourceMap",
						publicPath: "/dist"
					})				
				},
                {
                    test:/\.less$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use:[
                            {
                                loader: "css-loader?sourceMap"
                            },
                            {
                                loader: "less-loader?sourceMap",
                                options: {
                                    paths: [
                                        path.resolve(__dirname, "../app/asset")
                                    ]
                                }
                            }
                        ],
                        publicPath: "/dist"
                    })
                },
				{
					test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
					use: 'url-loader?limit=100000',
				}
			]
		},
        resolve: {
            extensions: ['.js', '.css', '.scss', '.less'],
            alias: {
                //directory
                Asset: path.resolve(__dirname, '../app/asset'),
                Helper: path.resolve(__dirname, '../app/helper'),
                Network: path.resolve(__dirname, '../app/network'),
                Service: path.resolve(__dirname, '../app/service'),
                Test: path.resolve(__dirname, '../app/test'),
                Util: path.resolve(__dirname, '../app/util'),
	            Src: path.resolve(__dirname, '../app/src'),
                Component: path.resolve(__dirname, '../app/src/component'),
                MainPage: path.resolve(__dirname, '../app/src/page/main-page'),
                DevPage: path.resolve(__dirname, '../app/src/page/dev-page'),
				UnauthorizedPage: path.resolve(__dirname, '../app/src/page/unauthorized-page'),
				NotFoundPage: path.resolve(__dirname, '../app/src/page/not-found-page'),
	            Store: path.resolve(__dirname, '../app/src/store'),
				Action: path.resolve(__dirname, '../app/src/store/action'),
				picker: path.resolve(__dirname, '../node_modules/pickadate/lib/picker'), // http://amsul.ca/pickadate.js/date/
				pickadate: path.resolve(__dirname, '../node_modules/pickadate/lib/picker.date'), //http://amsul.ca/pickadate.js/date/
				Pickatheme: path.resolve(__dirname, '../node_modules/pickadate/lib/themes'), //http://amsul.ca/pickadate.js/date/
            }
        },
		plugins: [
			new ExtractTextPlugin('[name].[chunkhash].css'),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				filename: 'vendor.[chunkhash].bundle.js',
				chunks: ['vendor']
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
                i18next: 'i18next',
			}),
            // bundle file들을 html 문서안에 연결해주는 플러그인
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, '../app/src/index.html'),
                hash: true,
                chunks: ['vendor', 'main'],
                minify: {
                    collapseWhitespace:true
                },
                filename: path.join(__dirname, '..', 'build-prod', 'index.html')
            }),
			new cleanWebpackPlugin(
				// folders that we want to clean
				['build-prod'], 
				{
					root: path.resolve(__dirname, '..'),
					verbose: true // console output
				}
			),
			new optimizeCssAssetsWebpackPlugin({
				cssProcessorOptions: { discardComments: {removeAll: true } }
			}),
			new webpack.optimize.UglifyJsPlugin({
				output:{
					comments:false
				},
				mangle: false, // Never change variable name after compile
				sourceMap: true
			}),
			new webpack.DefinePlugin({
				'env': JSON.stringify(env)
			}),
			// https://github.com/itgalaxy/generate-robotstxt
			new RobotstxtPlugin({
				policy:[
					{
						userAgent: '*',
						disallow: '/',
					}
				]
			})
		],
		devServer:{
			contentBase: path.resolve(__dirname, '../build-prod'),
			inline:true,
			port:3000,
            historyApiFallback: true
		}
	};
};