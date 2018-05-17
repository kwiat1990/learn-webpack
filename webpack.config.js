const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};

module.exports = config;
