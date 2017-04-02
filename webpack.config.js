module.exports = {
   entry: './build/client.js',
   output: {
        filename: "bundle.js",
        path: __dirname + "/public/assets/js"
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ['es2015', 'stage-0']
          }
        }
      ]
    }

};
