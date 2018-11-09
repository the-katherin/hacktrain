const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
//const ImageminPlugin = require('imagemin-webpack-plugin').default;

// const isProduction = (process.env.NODE_ENV === 'production');
// console.log(isProduction + '!!!!!!!!!!');


let config = {
    // mode: "production",
    //devtool: "source-map",
    //devtool: (isProduction) ? false : 'inline-source-map',
    context: path.resolve(__dirname, "app"),
    entry: {

        app: [
            "./app.js"
            // "./scss/style.scss"


        ],


    },

    devServer: {
        // contentBase: './dist',
        publicPath: 'http://localhost:8080/',
        hot: true,
        overlay: true,
        contentBase: './app', //src!!!! with dist it wouldn't work
        watchContentBase: true
    },

    output: {

        path: path.resolve(__dirname, "dist"),
        filename: "js/main.build.js"

        //publicPath: '../../' //so that css could fing pathes for images etc 
    },


    module: {
        rules: [

            // {
            //     test: /\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     //exclude: "/node_modules/",
            //     use: {
            //         loader: 'babel-loader'
            //     }

            // },
            {
                test: /\.html$/,
                //exclude: /index.html/,
                use: "html-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
            },
            //['css-hot-loader'].concat

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',

                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            //Images
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]',
                        }
                    },
                    'img-loader'
                ]
            },

            //fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        }
                    }
                ]
            }


        ]
    },

    plugins: [

        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin({
            title: 'Hacktrain',
            template: 'index.html'
            //  excludeChunks: ['styles']
            // filename: 'admin.html'
        }),

        //new HtmlWebpackHarddiskPlugin(),

        new ExtractTextPlugin({
            filename: 'style.css'
        }),


        // new CopyWebpackPlugin(
        //     [
        //         { from: './**/*', to: './', ignore: ['*.js', '*.scss', '*.html'] }
        //     ]
        // ),

        new webpack.NamedModulesPlugin(),

        new webpack.HotModuleReplacementPlugin()

        // new ImageminPlugin({
        //   test: /\.(png|jpe?g|gif)$/i
        // })

    ]
};

// if (isProduction) {
//     console.log('ok!!!!!!!!!!!!');

//     module.exports.plugins.push(
//         new webpack.LoaderOptionsPlugin({
//             minimize: true
//         })
//     )
// }


//we can write down module.exports = config;
//module.exports can be a function
module.exports = (env, options) => {
    let mode = options.mode;

    //conf.devtool

    if (mode === 'development') {
        config.devtool = 'inline-source-map';
    }

    if (mode === 'production') {
        config.plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        )
    }

    return config;
};