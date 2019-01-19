var path = require('path');

var conf = {
    entry: {
        app: './resources/assets/js/webpack.js'
    },
    output: {
        path: path.resolve(__dirname, './public_html/assets/js/'),
        filename: '[name].min.js',
        publicPath: '/public_html/assets/js/'
    },
    devServer: {
        overlay: true
    } 
};

module.exports = conf;