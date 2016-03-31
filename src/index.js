module.exports = {
  declare: require('./global/types').declare,
  type: require('./global/types').type,
  modules: require('./modules'),
  run: require('./run')
}