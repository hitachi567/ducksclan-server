const webpackNodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    mode: 'production',
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
