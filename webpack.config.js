var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var conf = {
    entry: {
        app: './resources/assets/index.js'
    },
    output: {
        path: path.resolve(__dirname, './public_html/assets/js/'),
        filename: '[name].min.js',
        publicPath: '/public_html/assets/js/'
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        } 
        // ,{
        //     test: /\.scss$/,
        //     use: [
        //         'style-loader',
        //         MiniCssExtractPlugin.loader,
        //         {
        //             loader: 'css-loader',
        //             options: { sourceMap: true }
        //         }, {
        //             loader: 'sass-loader',
        //             options: { sourceMap: true }
        //         }
        //     ]
        // }
        ]
    },
    devServer: {
        overlay: true
    }
    // ,plugins: [
    //     new MiniCssExtractPlugin({
    //         filename: '[name].scss'
    //     })
    // ] 
};

module.exports = conf;