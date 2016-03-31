const express = require('express')
const http = require('superagent')

const server = express()

server.use('/', express.static(`${process.cwd()}/dist`))

server.use('/screenshots', express.static(`${__dirname}/screenshots`))
server.get('/screenshots/job_ids.json', (req, res) => {
  res.send(require(`${process.cwd()}/screenshots/job_ids.json`))
})
server.get('/screenshots/:jobId', (req, res) => {
  http
    .get(`https://www.browserstack.com/screenshots/${req.params.jobId}.json`)
    .end((err, response) => {
      res.send(response.body)
    })
})

const port = process.env.PORT || 5000
server.listen(port, '0.0.0.0')