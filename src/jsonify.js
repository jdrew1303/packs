import webpack from  'webpack'
import writeFile from 'writefile'
import fs from 'fs'

// packs into .js then into .json file in dist
export default path => {
  const [name, ext] = path
    .split('/')
    .slice(-1)[0]
    .split('.')

  const temp = Date.now()

  webpack({
    context: __dirname,
    entry: {
      app: path,
    },
    output: {
      path: `${process.cwd()}/dist`,
      filename: `${name}.${ext}`
    },
    resolve: {
      root: process.cwd()
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
    }
  })
  .run((err, stats) => {
    console.log(stats.toString({ colors: true }))
    const survey = require(`${process.cwd()}/dist/${name}.${ext}`)
    console.log(survey)
    writeFile(
      `${process.cwd()}/dist/${name}.json`,
      JSON.stringify(
        require(`${process.cwd()}/dist/${name}.${ext}`),
        null,
        2
      ), 
      err => { if (err) console.error(err) }
    )
  })
}