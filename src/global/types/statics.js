import { every, map, omit } from 'lodash'

export default {
  string: {
    validate: (v) => typeof v === 'string',
    schema: ['string', false]
  },

  number: {
    validate: (v) => typeof v === 'number',
    schema: ['number', false]
  },

  boolean: {
    validate: (v) => typeof v === 'boolean',
    schema: ['boolean', false]
  },

  function: {
    validate: (v) => typeof v === 'function',
    schema: ['function', false]
  },

  object: {
    validate: (v) => typeof v === 'object',
    schema: ['object', false]
  },

  Object: (types) => {
    return {
      validate: (v) => typeof v === 'object' &&
        every(map(v, (e, k) => types[k].validate(e))),
      schema: ['object', types]
    }
  },

  array: {
    validate: (v) => Array.isArray(v),
    schema: ['array', false]
  },

  Array: (type) => {
    return {
      validate: (v) => Array.isArray(v) &&
        every(v, e => type.validate(e)),
      schema: ['array', type]
    }
  },

  Enumerate: (types) => {
    return {
      validate: (v) => types[v.type].validate(omit(v, 'type')),
      schema: ['enum', types]
    }
  }
}