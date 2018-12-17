/*
* use es6 modules for app src.
* create common, prod and dev configs.
* webpack.config.js in root of the project merges configs based on process.env.NODE_ENV with webpack-merge. WPMerge test: https://runkit.com/embed/u1kk97bcsyi7
* for both dev and prod add bootstrap and jquery.
* export jquery to window with provide plugin
*
*
* javascript
*   prod: no source maps
*         => add hashes to bundles
*         => convert to es5 with babel for legacy browsers support
*         => add babel polyfills for legacy browsers support
*         => uglyfy/minimize for performance purpose
*         => move vendor dependencies to separate chunks and add hashes for caching purpose
*   dev: include source maps for debugging
* html
*   prod: covert .pug to html
*         => generate html file from template with dynamicly inserted assets and scripts
*   dev: covert .pug to html
*         => generate html file from template with dynamicly inserted assets and scripts
* css
*   prod: convert sass to css
*         => add vendor prefixes
*         => minify css
*         => extract css to separate file and add hashes
*   dev: convert sass to css
*         => add vendor prefixes
*         => extract css to style tag
* images
*   prod: extract images required/imported in css and html to build/assets, replace paths to public
*   dev: minify images required/imported in css and html
*        => extract images to build/assets, replace paths to public
* fonts
*   prod: extract fonts required/imported in css to build/assets, replace paths to public
*   dev: extract fonts required/imported in css to build/assets, replace paths to public
* */

const merge = require('webpack-merge');
const prettyJSON = require('prettyjson');
const PathsHelper = require('./config/pathsHelper');
let ph = new PathsHelper();

const EntryConfig = require(ph.root().config().searchInCurrentFolder('webpack.config.entry.js').getAbsolutePath());
const JsConfig = require(ph.root().config().searchInCurrentFolder('webpack.config.javascript.js').getAbsolutePath());
const UtilsConfig = require(ph.root().config().searchInCurrentFolder('webpack.config.utils.js').getAbsolutePath());
const FontsConfig = require(ph.root().config().searchInCurrentFolder('webpack.config.fonts.js').getAbsolutePath());
const ImagesConfig = require(ph.root().config().searchInCurrentFolder('webpack.config.images.js').getAbsolutePath());
const MailerConfig = require(ph.root().config().searchInCurrentFolder('webpack.config.mailer.js').getAbsolutePath());
const StyleConfig = require(ph.root().config().searchInCurrentFolder('webpack.config.style.js').getAbsolutePath());
const ViewConfig = require(ph.root().config().searchInCurrentFolder('webpack.config.view.js').getAbsolutePath());

const JsonFileModel = require(ph.root().config().searchInCurrentFolder('JsonFileModel').getAbsolutePath());
let packageJsonModel = new JsonFileModel(ph.root().searchInCurrentFolder('package.json').getAbsolutePath());

module.exports = (env, argv) => {
    const wpMode = argv.mode || 'development';
    const projName = ph.root().getBasename();
    console.log(`============== building project "${projName}" for ${wpMode}... ==============`);
    packageJsonModel.model.name = projName;
    packageJsonModel.flushModel();

    let configOptions = {
        mode:wpMode,
    };
    let mergedConfig = merge.smart(
        new EntryConfig(configOptions),
        new JsConfig(configOptions),
        new UtilsConfig(configOptions),
        new FontsConfig(configOptions),
        new ImagesConfig(configOptions),
        new MailerConfig(configOptions),
        new StyleConfig(configOptions),
        new ViewConfig(configOptions)
    );

    console.log(`mergedConfig is :
        ${prettyJSON.render(mergedConfig,{
            keysColor: 'blue',
            dashColor: 'magenta',
            stringColor: 'white'
        }
    )}`);

    return mergedConfig;
};