let path = require("path");
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/js/index.js",
    mode: 'development',
    output: {
        filename: "bundle.js"
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/canvas.html"
    })],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ["style-loader", "css-loader", "sass-loader",],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        hot: true
    }
}