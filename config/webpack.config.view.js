const path = require('path');
const PathHelper = require(path.join(__dirname,'pathsHelper.js'));
const ph = new PathHelper();
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options) {
    this.module = {
        rules: [
            {
                test:/\.pug$/,
                use:[
                    {
                        loader:'pug-loader', // compiles pug templates to html
                        options: {
                            pretty:options.mode === 'development'
                        }
                    }
                ]
            }
        ]
    };
    this.plugins = [
        new HtmlWebpackPlugin({
            template: ph
                .root()
                .src()
                .searchInCurrentFolder('index.pug')
                .getAbsolutePath(),
            filename: "index.html",
            favicon: ph
                .root()
                .src()
                .searchInCurrentFolder('assets')
                .searchInCurrentFolder('img')
                .searchInCurrentFolder('fav.png')
                .getAbsolutePath()
        })
    ];
};
