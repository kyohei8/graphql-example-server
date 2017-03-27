var path = require('path');
var webpack = require('webpack');

var entry = ['./app/index'];

if(process.env.NODE_ENV === 'production') {
  // plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, comments: false}));
} else {
  entry.push('webpack-dev-server/client?http://localhost:3000');
  entry.push('webpack/hot/only-dev-server');
}

module.exports = {
  devtool: 'eval',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader',
          'babel-loader'
        ],
        include: path.join(__dirname, 'app')
      }
    ]
  }
};

