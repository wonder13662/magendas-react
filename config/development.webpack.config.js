const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
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
				'react-hot-loader/patch',
				'select2',
			]
		},
		output: {
			path: path.resolve(__dirname, '../build-dev'),
			filename: '[name].[hash].bundle.js',
			publicPath: '/'
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
						presets:['react',["es2015", { "modules": false }]],
						env: {
							// https://www.npmjs.com/package/react-transform-catch-errors
							// only enable it when process.env.NODE_ENV is 'development' or undefined
							development: {
								plugins: [["react-transform", {
									transforms: [{
										transform: "react-transform-catch-errors",
										imports: [
											"react",
											"redbox-react"
										]
									}]
								}]]
							}
						},
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
						use: "css-loader!sass-loader",
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
				},
				{
					test: /\.js$/,
					use: ['react-hot-loader/webpack'],
					include: path.resolve(__dirname, '../app/src')
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
			new ExtractTextPlugin('[name].css'),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				filename: 'vendor.bundle.js',
				chunks: ['vendor']
			}),
			new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'],
                // In case you imported plugins individually, you must also require them here:
                Util: "exports-loader?Util!bootstrap/js/dist/util",
                Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
				i18next: 'i18next',
			}),
            // bundle file들을 html 문서안에 연결해주는 플러그인
			new htmlWebpackPlugin({
				template: path.resolve(__dirname, '../app/src/index.html'),
				hash: true,
				chunks: ['vendor', 'main']
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(env)
					
				},
				'env': JSON.stringify(env) 
			}),
            // hot module replacement
            new webpack.HotModuleReplacementPlugin(),
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
			contentBase: path.resolve(__dirname, '../build-dev'),
            inline:true,
			port:3000,
            historyApiFallback: true,
			hot: true,
		},
        // devtool:'source-map'
		// devtool:'eval-source-map'
		// devtool:'eval'
		devtool:'cheap-eval-source-map'
	};
};