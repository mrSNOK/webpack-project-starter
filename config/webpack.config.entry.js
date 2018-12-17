const path = require('path');
const PathHelper = require(path.join(__dirname,'pathsHelper.js'));
const ph = new PathHelper();
module.exports = function (options) {
    this.entry = {
        bundle:['babel-polyfill',ph
            .root()
            .src()
            .searchInCurrentFolder('assets')
            .searchInCurrentFolder('js')
            .searchInCurrentFolder('index.js')
            .getAbsolutePath()]
    };
    this.output = {
        filename: 'assets/js/[name].[hash:6].js',
        chunkFilename: 'assets/js/[name].[chunkhash:6].chunk.js',
        path: ph
            .root()
            .build()
            .getAbsolutePath()
    };
};