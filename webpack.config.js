var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package');

// replaceVersion
var replaceVersion = function () {
    var filePath = path.resolve(__dirname, 'src/cos.js');
    var content = fs.readFileSync(filePath).toString();
    if (content) {
        var newContent = content.replace(/(COS\.version) *= *['"]\d+\.\d+\.\d+['"];/, "$1 = '" + pkg.version + "';");
        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent);
            console.log('cos.js version updated.');
        }
    }
};
replaceVersion();

module.exports = {
    entry: path.resolve(__dirname, './index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'cos-js-sdk-v5.js',
        libraryTarget: 'umd',
        library: 'COS',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
};

if (process.env.NODE_ENV === 'production') {
    module.exports.output.filename = 'cos-js-sdk-v5.min.js';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            output: {
                ascii_only: true,
            },
            compress: {
                warnings: false,
            },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    ])
}