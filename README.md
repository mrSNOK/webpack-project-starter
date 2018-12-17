# Webpack project starter

Basic webpack configuration and folder layout for starting new project.

## Features

Uses loaders and plugins for handling different kind of modules:

* [Pug](https://pugjs.org/api/getting-started.html) for page markdown. Minifies page in proction mode.
* [Sass](https://sass-lang.com/documentation/file.SASS_REFERENCE.html) or pure css for stylig. Handles autoprefixing. Minifies in production mode
* Supports .eot, .ttf, .otf, .woff, .woff2 fonts.
* Minifies .png, .jpg, .gif, .svg images in production mode.
* Transpiles ES6 in .js files with [Babel](https://babeljs.io/docs/en/). Uses [babel-polyfill](https://babeljs.io/docs/en/babel-polyfill) to emulate a full ES6+ environment. Uglifies bundles in production mode. Splits modules, shared by different bundles and vendor dependencies in separate chunks in production mode, to improve loading perfomance. Adds hashes to files names for better caching.
* Provides support for common libs:
  * [jQuery](https://api.jquery.com) without explicit import or require.
  * [Lodash](https://lodash.com/docs/4.17.11) without explicit import or require.
  * [Bootstrap 4](https://getbootstrap.com/docs/4.1/getting-started/introduction/)

## Usage commands

* npm run build-proj-dev : builds project in development mode. All source maps are available. No minification provided.
* npm run build-proj-prod : builds project for production. No source maps provided, uses all available minifications and splitting.
* npm run start-proj-dev : builds project in development mode and serves with webpack-dev-server. Hot reload is provided.

Build directory is cleaned before each build.