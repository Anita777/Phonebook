module.exports = {
    entry: './src/main.js',
    output: {
        filename: './src/dist/build.js'
    },
    devtool: 'cheap-source-map',
    devServer: {
        port: 3001
  },
  module: {
    rules: [
     {
        test: /\.js$/,
        use: 'babel-loader'
     }
   ]
  },
};