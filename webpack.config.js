var path = require('path');
var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV;
var nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    externals: [
        nodeExternals(),
        {
            'data/stationNames': 'commonjs ' + path.resolve(__dirname, 'data/stationNames')
        }
    ],
    entry: {
        ticket: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js'
    },
    resolve: {
        // alias: {
        //     middlewares: './src/middlewares'
        // }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    devtool: NODE_ENV !== 'production'
    ? '#inline-source-map'
    : false
};

if (NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ];
}
