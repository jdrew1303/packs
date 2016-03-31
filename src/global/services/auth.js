import firebase from 'firebase'
const ref = new Firebase('https://surveyloader.firebaseio.com')

export default {
  on (cb) {
    ref.onAuth(cb)
  },

  login () {
    ref.authWithOAuthRedirect('github', error => {
      if (error) alert(error)
    })
  },

  logout () {
    ref.unauth()
  },

  status () {
    return ref.getAuth()
  },

  saveConfiguration (name, config, callback) {
    ref
      .child('configurations')
      .child(name)
      .push(config, callback)
  }
}