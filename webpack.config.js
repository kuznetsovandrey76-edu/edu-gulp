var path = require('path');

var conf = {
    entry: './resources/assets/js/main.js',
    output: {
        path: path.resolve(__dirname, './public_html/assets/js/'),
        filename: 'main.js'
    } 
};

module.exports = conf;