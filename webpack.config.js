const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename: './assets/css/app.css'
});

const config = {
    // configurations here
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.js'
        // any other dependencies, which should have own chunks, can be defined like:
        // vendors: './vendors.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/js/[name].bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist/assets/media'),
        compress: true,
        open: true,
        port: 12000,
        stats: 'errors-only'
    },
    devtool: 'inline-source-map',
    module: {
        // noParse: /jquery|lodash/ // prevent webpack from parsing these files, can boost build performance
        rules: [
            // babel-loader
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            // html-loader
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            // sass-loader
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
                use: extractPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            // file-loader(for images)
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './assets/media/'
                        }
                    }
                ]
            },
            // file-loader(for fonts)
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        extractPlugin
    ]
};

module.exports = config;
