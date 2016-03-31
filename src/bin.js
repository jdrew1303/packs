#!/usr/bin/env node

require('babel/register')({
  stage: 0,
  loose: 'all'
})

var program = require('commander')

program
  .command('init')
  .description('create survey template in current directory')
  .action(function () {
    require('./init')
  })

program
  .command('serve')
  .description('serve survey modules from configuration file')
  .action(function () {
    require('./build')('src/survey', 'src/modules', false)
    require('./server')
  })

program
  .command('bundle')
  .description('bundle and minify survey modules from configuration file')
  .action(function () {
    require('./build')('src/survey', 'src/modules', true)
  })

program
  .command('launch')
  .description('launch a HIT')
  .action(function () {
    require('./launch')
  })

program
  .command('simulate')
  .description('simulate HIT results')
  .action(function () {
    require('./simulate')('src/survey', 'src/modules')
  })

program
  .command('screenshots')
  .description('generate survey module screenshots from survey with browsertack')
  .action(function () {
    require('./screenshots/generate.node')(
      require(`${process.cwd()}/dist/survey`)
    )
  })

program
  .command('results')
  .description('get HIT results')
  .action(function () {
    require('./results')
  })

program.parse(process.argv)