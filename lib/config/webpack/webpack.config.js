const path = require('path');
const webpack = require('webpack');

const dist = path.resolve('dist');

const progressHandler = require('./helpers/progressHandler');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  output: {
    path: dist,
    filename: 'bundle.js',
  },
  plugins: [new webpack.ProgressPlugin(progressHandler)],
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
};
