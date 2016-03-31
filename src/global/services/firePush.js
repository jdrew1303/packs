import http from 'superagent'
import Promise from 'bluebird'

export default (endpoint, key, data) => {
  if (!key) {
    return new Promise((resolve, reject) => {
      http
        .post(`${endpoint}.json`)
        .send({
          ...data,
          timestamp: {
            '.sv': 'timestamp'
          }
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res.body.name)
          }
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      http
        .put(`${endpoint}/${key}.json`)
        .send({
          ...data,
          timestamp: {
            '.sv': 'timestamp'
          }
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(key)
          }
        })
    })
  }
}