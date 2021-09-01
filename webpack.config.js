const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
process.env.NODE_ENV = 'production';

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    mode: process.env.NODE_ENV,
    externalsPresets: {
        node: true
    },
    externals: [webpackNodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
}
