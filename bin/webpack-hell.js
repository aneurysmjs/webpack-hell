#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { argv } = yargs(hideBin(process.argv));
const webpack = require('webpack');

const config = require('../lib/config/webpack/webpack.config');

const srcPath = path.resolve(__dirname, '../src');
const mainJsPath = path.resolve(srcPath, 'main.js');

// console.log('__dirname', __dirname);
// console.log('srcPath', srcPath);
console.log('path.resolve("../")', path.resolve('../'));

function checkMainJs() {
  if (fs.existsSync(mainJsPath)) {
    console.log('src/main.js exists bitch!');

    return true;
  } else {
    throw new Error('main.js not found');
  }
}

/**
 * @see https://stackoverflow.com/questions/4482686/check-synchronously-if-file-directory-exists-in-node-js
 */
if (fs.existsSync(srcPath)) {
  try {
    checkMainJs();
  } catch (error) {
    throw new Error(error);
  }
}

if (argv.tool === 'webpack') {
  config.entry = mainJsPath;

  /** @type {import('webpack').Compiler} */
  const compiler = webpack(config);

  const method = argv.watch ? 'watch' : 'run';

  const callback = (err, stats) => {
    if (err) {
      throw new Error(err);
    }

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n',
    );
  };

    /** @type {import('webpack').Compiler} */
  const watchOptions = {
    aggregateTimeout: 300,
    poll: undefined,
  };

  const compilerArgs = [callback];

  if (argv.watch) {
    compilerArgs.unshift(watchOptions);
  }
  /**
   * call webpack's compiler methods dinamycally
   */
  compiler[method].apply(compiler, compilerArgs);
}
