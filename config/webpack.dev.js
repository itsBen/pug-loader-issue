/* eslint-disable */
// const {
//   CleanWebpackPlugin,
// } = require('clean-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const PugPlugin = require('pug-plugin')

const paths = require('./paths')


const loaders = require('../webpack/loaders');
/* eslint-enable */

module.exports = {

  mode: 'development',
  devtool: 'source-map',

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.dist,
    publicPath: 'auto',

    // output filename of scripts
    filename: 'assets/js/[name].[contenthash:8].js',
    chunkFilename: 'assets/js/[id].[contenthash:8].js',
    clean: true, // diese Option macht genau das gleiche wie `CleanWebpackPlugin`, deswegen das CleanWebpackPlugin kann raus
  },

  resolve: {
    // aliases used in sources
    alias: {
      Root: paths.root,
      Src: paths.src.root,
      Views: paths.src.views,
      Images: paths.src.images,
      Fonts: paths.src.fonts,
      Styles: paths.src.styles,
      Scripts: paths.src.scripts,
    },
    preferRelative: true,

    // resolve omitted extensions
    extensions: ['.js'],
  },

  // Where webpack looks to start building the bundle
  entry: {
    index: './src/views/pages/index.pug',
    // 404: './src/views/pages/404.pug',
  },

  // Determine how modules within the project are treated
  module: {
    rules: [
      // pug
      loaders.pugLoader(),

      // styles
      loaders.sassLoader(),

      // images
      loaders.imageLoader(),

      // inline images by size (to force inline use the `?inline` query)
      // ...loaders.inlineImageLoader(2 * 1024),

      // fonts
      loaders.fontLoader(),

      // generates filename including last directory name
      // to group fonts by name

      // eslint-disable-next-line max-len
      // (pathData) => `assets/fonts/${path.basename(path.dirname(pathData.filename))}/[name][ext][query]`
    ],
  },

  // Customize the webpack build process
  plugins: [

    // Removes/cleans build folders and unused assets when rebuilding
    // TODO: löcschen, da die Option `output.clean: true` macht das schon
    //new CleanWebpackPlugin(),

    new PugPlugin({
      verbose: true, // output information about the process to console
      pretty: true, // output formatted HTML
      // extract CSS from style source files specified directly in Pug
      extractCss: {
        // output filename of styles
        filename: 'assets/css/[name].[contenthash:8].css',
      },
    }),
  ],

  performance: {
    hints: 'warning',
    // in development mode the size of entrypoint
    // and assets is bigger than in production
    maxEntrypointSize: 15000 * 1024,
    maxAssetSize: 4000 * 1024,
  },

  stats: {
    colors: true,
    // see https://webpack.js.org/configuration/stats/#stats-presets
    // preset: 'minimal',
    // enable @debug output

    env: true,
    // include value of --env in the output
    outputPath: true,
    // include absolute output path in the output
    publicPath: true,
    // include public path in the output

    assets: true,
    // show list of assets in output

    entrypoints: true,
    // show entrypoints list
    chunkGroups: true,
    // show named chunk group list

    chunks: true,
    // show list of chunks in output

    modules: true,
    // show list of modules in output

    children: true,
    // show stats for child compilations

    logging: true,
    // show logging in output
    loggingDebug: ['sass-loader'],
    // show debug type logging for some loggers
    loggingTrace: true,
    // show stack traces for warnings and errors in logging output

    warnings: true,
    // show warnings

    errors: true,
    // show errors
    errorDetails: true,
    // show details for errors
    errorStack: true,
    // show internal stack trace for errors
    moduleTrace: true,
    // show module trace for errors
    // (why was causing module referenced)

    builtAt: true,
    // show timestamp in summary
    errorsCount: true,
    // show errors count in summary
    warningsCount: true,
    // show warnings count in summary
    timings: true,
    // show build timing in summary
    version: true,
    // show webpack version in summary
    hash: true,
    // show build hash in summary
  },

  // define `devServer` Einstellungen
  devServer: {
    static: {
      directory: paths.dist,
    },
    compress: true,
    // hier ist ultra wichtige Einstellung damit die geänderte Dateien aus dem `./src` Ordner direct neu kompileren
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true, // für Live Reload ist wichtig
      },
    },

    // open in default browser
    //open: true,
  },
}
