const AWS = require('aws-sdk');
const keys = require('../config/keys');
const uuid = require('uuid/v1'); //v1 version1. u cannuse any version
const requireLogin = require('../middlewares/requireLogin');

const s3 = new AWS.S3({
    credentials: {
      accessKeyId: keys.accessKeyId,
      secretAccessKey: keys.secretAccessKey,
    },
    region: 'us-east-1',
  });


module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res)=>{
      const key = `${req.user.id}/${uuid()}.jpeg`;

      s3.getSignedUrl('putObject', {
        Bucket: 'myblogster-bucket',
        ContentType: 'image/jpeg',
        Key: key
      }, (err, url)=>{
          res.send({key, url})
      })
    })
};