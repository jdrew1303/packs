import http from 'superagent'
import fs from 'fs'
import writeFile from 'writefile'
import Promise from 'bluebird'
import Upload from '../upload'
import ContainerHTML from '../global/components/ContainerHTML'

const { user, pass } = require(`${process.cwd()}/src/credentials.json`).browserstack
if (!user || !pass) console.error('Please specify browserstack credentials in src/credentials.json')

function generateShots (url, browsers) {
  return new Promise((resolve, reject) => {
    http
      .post('https://www.browserstack.com/screenshots')
      .auth(user, pass)
      .send({
        url,
        wait_time: 20,
        browsers
      })
      .end((err, res) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          const { job_id } = res.body
          console.log(job_id)
          resolve(job_id)
        }
      })
  })
}

export default ({ S3, table, screens }) => {
  const bundle = fs.readFileSync(`${process.cwd()}/dist/bundle.js`)

  Upload(bundle, S3.Bucket, `${table.surveyName}${table.surveyVersion}/bundle.js`)
    .then(scriptUrl => {
      Upload(ContainerHTML(scriptUrl), S3.Bucket, `${table.surveyName}${table.surveyVersion}/index.html`)
        .then(url => {
          console.log(url)
          Promise.all(screens.map((m, i) => generateShots(`${url}?index=${i}`, browsers)))
            .then(jobIds => {
              writeFile(`${process.cwd()}/screenshots/job_ids.json`, JSON.stringify(jobIds, null, 2))
            })
        })
    })
}

const browsers = [
  {
    os: 'Windows',
    os_version: '8',
    browser: 'chrome',
    browser_version: '42.0'
  },{
    os: 'Windows',
    os_version: '8',
    browser: 'firefox',
    browser_version: '37.0'
  },{
    os: 'Windows',
    os_version: '7',
    browser: 'ie',
    browser_version: '10.0'
  },{
    os: 'Windows',
    os_version: '7',
    browser: 'ie',
    browser_version: '11.0'
  },{
    os: 'Windows',
    os_version: '7',
    browser: 'opera',
    browser_version: '12.16'
  },{
    os: 'OS X',
    os_version: 'Yosemite',
    browser: 'safari',
    browser_version: '8.0'
  },{
    os: 'ios',
    os_version: '8.3',
    device: 'iPad Mini 2',
    browser: 'Mobile Safari'
  },{
    os: 'ios',
    os_version: '7.0',
    device: 'iPhone 5S',
    browser: 'Mobile Safari'
  },{
    os: 'android',
    os_version: '4.4',
    device: 'Samsung Galaxy S5',
    browser: 'Android Browser'
  },{
    os: 'android',
    os_version: '5.0',
    device: 'Google Nexus 9',
    browser: 'Android Browser'
  }
]