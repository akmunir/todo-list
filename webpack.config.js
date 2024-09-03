// webpack.config.js
import webpack from 'webpack'
import { supportedLocales } from './config.js'
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
        new webpack.ContextReplacementPlugin(
          /^date-fns[/\\]locale$/,
          new RegExp(`\\.[/\\\\](${supportedLocales.join('|')})[/\\\\]index\\.js$`)
        ),
    ],
    module: {
       rules: [
         {
           test: /\.css$/i,
           use: ["style-loader", "css-loader"],
         },
       ],  
    },
    
};
