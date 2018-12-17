const path = require('path');
const PathHelper = require(path.join(__dirname,'pathsHelper.js'));
const ph = new PathHelper();

module.exports = function (options) {
    this.module = {
        rules: [
            {
                test:/\.(eot|ttf|otf|woff|woff2)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            name:'[name].[hash:6].[ext]',
                            outputPath:'assets/fonts/'
                        }
                    }
                ]
            }
        ]
    };
};