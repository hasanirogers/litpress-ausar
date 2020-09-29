const { resolve, join } = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const workbox = require('workbox-webpack-plugin');
const ausar = require('./ausar.settings.json');


// directories
// -----------

const themeDirectory = resolve('wp-content/themes/ausar');
const wcJSDirectory = './node_modules/@webcomponents/webcomponentsjs';


// configuration options
// ---------------------

const pluginConfigs = {
  copyFiles: [
    {
      from: resolve(`${wcJSDirectory}/webcomponents-*.{js,map}`),
      to: join(themeDirectory, 'vendor'),
      flatten: true
    },
    {
      from: resolve(`${wcJSDirectory}/custom-elements-es5-adapter.js`),
      to: join(themeDirectory, 'vendor'),
      flatten: true
    }
  ],

  styleLint: {
    context: './src',
    failOnError: true
  },


  miniCSSExtract: {
    filename: "bundle.css"
  },

  browserSync: {
    files: '**/*.php',
    proxy: ausar.urls.localWordPress
  },

  workbox: {
    swDest: 'sw.js',
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
        handler: 'CacheFirst'
      },
      {
          urlPattern: /.*/,
          handler: 'NetworkFirst'
      },
    ]
  }
}

const loaderConfigs = {
  babel: [{
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'false',
            targets: {
              browsers: '> 1%, IE 11, not dead'
            }
          }
        ]
      ],
      plugins: [
        '@babel/syntax-dynamic-import',
        '@babel/syntax-object-rest-spread',
        '@babel/plugin-proposal-class-properties'
      ]
    }
  }],

  miniCSSExtract: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {sourceMap: true}
    },
    {
      loader: "postcss-loader",
      options: {sourceMap: true}
    },
    {
      loader: "sass-loader",
      options: {sourceMap: true}
    }
  ],

  images: [
    {
      loader: 'url-loader',
      options: {
        limit: false,
        outputPath: 'images',
        esModule: false
      },
    },
  ]
}


// main export
// -----------

module.exports = {
  context: __dirname,

  entry: [
    'regenerator-runtime/runtime',
    `${themeDirectory}/src/scripts/app.js`,
    `${themeDirectory}/src/styles/app.scss`
  ],

  output: {
    path: `${themeDirectory}/bundles`,
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: loaderConfigs.babel
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: loaderConfigs.miniCSSExtract
      },

      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: loaderConfigs.images
      }
    ]
  },

  devtool: 'cheap-module-source-map',

  plugins: [
    new CopyWebpackPlugin(pluginConfigs.copyFiles),
    new StyleLintPlugin(pluginConfigs.styleLint),
    new MiniCssExtractPlugin(pluginConfigs.miniCSSExtract),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
    new BrowserSyncPlugin(pluginConfigs.browserSync, { reload: true }),
    new workbox.GenerateSW(pluginConfigs.workbox)
  ]
};
