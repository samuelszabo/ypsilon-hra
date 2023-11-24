const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');

var env = process.env.NODE_ENV || 'development';
module.exports = {
    mode: env,
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: './dist',
    },
    plugins: [
        new WebpackManifestPlugin({}),
        new HtmlWebpackPlugin({
            title: 'Ypsilon Hra',
            template: 'src/assets/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },

        ],
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};