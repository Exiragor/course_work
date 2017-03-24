module.exports = {
   entry: ['babel-polyfill', './src/client.js'],
   output: {
        filename: "bundle.js",
        path: __dirname + "/src/public/assets/js"
    },

    devtool: 'sourse-map',

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ['es2015', 'react', 'stage-0']
          }
        }
      ]
    }

};
