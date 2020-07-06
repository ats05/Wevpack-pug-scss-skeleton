const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globule = require('globule');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const app = {
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 9011
    },
    module: {
        rules: [
            // TODO scssを出力できるようにする
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.pug$/,
                use: ['pug-loader'],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            path: path.resolve(__dirname, 'assets/css/'),
        })
    ],

};


const pugFiles = globule.find(
    './src/pug/**/*.pug', {
        ignore: [
            './src/pug/**/_*.pug'
        ]
    }
);

// pugファイルの出力先がpublic直下になるように指定
pugFiles.forEach((document) => {
    const fileName = document.replace('./src/pug/', './').replace('.pug', '.html');
    app.plugins.push(
        new HtmlWebpackPlugin({
            filename: `${fileName}`,
            template: document,
        })
    );
});


const scssFiles = globule.find(
    './src/scss/**/*.scss', {
        ignore: [
            './src/scss/**/_*.scss'
        ]
    }
);

// scssファイルの出力先を指定
scssFiles.forEach((document) => {
    console.log(document);
    const fileName = document.replace('./src/scss/', './assets/css/').replace('.scss', '.css');
    app.plugins.push(
        new MiniCssExtractPlugin({
            filename: fileName,
        })
    );
});


module.exports = app;