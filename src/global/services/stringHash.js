import Hashids from 'hashids'

function hashCode (s) {
  return s.split('')
    .reduce(function (a, b) {
      return ((a << 5) - a) + b.charCodeAt(0)
      & ((a << 5) - a) + b.charCodeAt(0)
    }, 0)
}

export default function (s) {
  const hashids = new Hashids('')
  return hashids
    .encode(Math.abs(hashCode(s)))
}