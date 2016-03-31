import MTurk from 'mturk-api'
import fs from 'fs'
import writeFile from 'writefile'

const {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY
} = require(`${process.cwd()}/src/credentials.json`)

fs.readFile(`${process.cwd()}/dist/data/HIT.json`, (err, data) => {
  if (err) console.error(err)
  const HITs = JSON.parse(data)
  MTurk
    .connect({
      access: AWS_ACCESS_KEY,
      secret: AWS_SECRET_KEY,
      sandbox: true // change!!!
    })
    .then(turk => {
      turk
        .req('GetAssignmentsForHIT', {
          HITId: HITs[0].HITId 
        })
        .then(res => {
          console.log(JSON.stringify(res))
          // TODO: sanitize worker IDs
          writeFile(`${process.cwd()}/dist/data/responses.json`, JSON.stringify(res.GetAssignmentsForHITResult, null, 2), err => {
            if (err) console.error(err)
          })
        })
        .catch(err => console.error(err))

    })
})