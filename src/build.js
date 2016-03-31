import webpack from 'webpack'
import jsonify from './jsonify'

export default (survey, modules, minimize, options) => {
  webpack({
    context: __dirname,
    entry: {
      app: `${process.cwd()}/src`,
    },
    output: {
      path: `${process.cwd()}/dist`,
      filename: 'bundle.js'
    },
    resolve: {
      root: process.cwd(),
      alias: {
        survey,
        modules
      }
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            stage: 0,
            loose: 'all'
          }
        },
        { // for third-party minified scripts, don't process require()
          test: /\.min\.js$/,
          include: /(node_modules|bower_components)/,
          loader: 'script'
        },
        {
          test: /\.json$/,
          loader: 'json-loader' 
        },
        {
          test: /\.(png|jpg|gif|woff|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
          loader: 'url-loader?limit=8192' 
        },
        { 
          test: /\.(txt|md)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
          loader: 'raw-loader' 
        }
      ]
    },
    plugins: minimize && [
      new webpack.optimize.UglifyJsPlugin({ minimize })
    ]
  })
  .watch({}, (err, stats) => {
    console.log(stats.toString({ colors: true }))
  })
}