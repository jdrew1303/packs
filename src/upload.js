import Promise from 'bluebird'
import AWS from 'aws-sdk'

const { 
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY
} = require(`${process.cwd()}/src/credentials.json`)

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'us-east-1'
})
const S3 = new AWS.S3()

export default (fileData, bucketName, fileName) => {
  const extension = fileName.split('.')[1] || null
  const ContentType =
    extension === 'js' ? 'application/javascript' :
    extension === 'html' ? 'text/html' :
    'application/octet-stream'

  return new Promise((resolve, reject) => {
    S3
      .createBucket({
        Bucket: bucketName
      }, (err, data) => {
        if (err) reject(err)
        S3
          .putObject({
            Bucket: bucketName,
            Key: fileName,
            ACL: 'public-read',
            Body: fileData,
            ContentType
          }, (err, data) => {
            if (err) {
              reject(err)
              console.error(err)
            } else {
              resolve(`https://s3.amazonaws.com/${bucketName}/${fileName}`)
              console.log(JSON.stringify(data))
            }
          })
      })
  })
}