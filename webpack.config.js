module.exports = [
  {
    entry: './src/index',
    output: {
      path: __dirname + '/browser',
      filename: 'ketting.min.js',
      library: 'Ketting',
      libraryTarget: 'umd'
    },

    resolve: {
      extensions: ['.web.ts', '.web.js', '.ts', '.js', '.json'],
      alias: {
        // We need an alternative 'querystring', because the default is not
        // 100% compatible
        querystring: 'querystring-browser'
      }
    },

    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        }
      ]
    },
    node: {
      Buffer: false
    }

  }
];
