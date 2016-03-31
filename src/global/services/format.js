export default {
  capitalize (str) {
    return str ? str.replace(/\s+/, '').charAt(0).toUpperCase() + str.slice(1) : ''
  }
}