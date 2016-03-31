import MTurk from 'mturk-api'
import fs from 'fs'
import crypto from 'crypto'
import writeFile from 'writefile'
import Promise from 'bluebird'
import Upload from './upload'

const {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY
} = require(`${process.cwd()}/src/credentials.json`)
const { S3, HIT } = require(`${process.cwd()}/src/deploy.json`)
const HTMLQuestion = fs.readFileSync(`${process.cwd()}/src/HTMLQuestion.xml`, 'utf-8')
const bundle = fs.readFileSync(`${process.cwd()}/dist/bundle.js`, 'utf-8')
const index = fs.readFileSync(`${process.cwd()}/dist/index.html`, 'utf-8')
const checksum = crypto
  .createHash('md5')
  .update(bundle, 'utf8')
  .digest('hex')

console.log(checksum)

if (!S3 || !S3.Bucket) {
  console.error('Please specify S3: { Bucket } in survey configuration file')
} else if (!HIT || !HIT.Title || !HIT.Description || !HIT.AssignmentDurationInSeconds || !HIT.LifetimeInSeconds || !HIT.MaxAssignments || !HIT.Reward) {
  console.error('Please specify HIT: { Title, Description, AssignmentDurationInSeconds, LifetimeInSeconds, MaxAssignments, Reward: { Amount, CurrencyCode } } in survey configuration file')
} else if (!bundle) {
  console.error('No bundle file in folder dist')
}

Upload(bundle, S3.Bucket, `${checksum}/bundle.js`)
  .then(JSurl => {
    Upload(index, S3.Bucket, `${checksum}/index.html`)
      .then(HTMLurl => {
        console.log(HTMLurl)
        LaunchHIT(HTMLurl, HIT)
          .then(res => {
            console.log(JSON.stringify(res))
            writeFile(`${process.cwd()}/dist/data/HIT.json`, JSON.stringify(res.HIT, null, 2), err => {
              if (err) console.error(err)
            })
          })
          .catch(err => console.error(err))
      })
  })
  .catch(err => console.error(err))

function LaunchHIT (surveyUrl, HIT, sandbox=true) {
  return new Promise((resolve, reject) => {
    MTurk
      .connect({
        access: AWS_ACCESS_KEY,
        secret: AWS_SECRET_KEY,
        sandbox
      })
      .then(turk => {
        turk
          .req('CreateHIT', {
            ...HIT,
            Question: HTMLQuestion.replace(/{survey_link}/g, surveyUrl)
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
  })
}