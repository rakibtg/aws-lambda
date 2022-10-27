const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-north-1" });

const PreSignObject = async ({ fileName, expires, bucketName }) => {
  return Promise((res, rej) => {
    const s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      region: "eu-north-1",
      signatureVersion: "v4",
    });

    const getSignedUrlParams = {
      Bucket: bucketName,
      Key: fileName,
      Expires: expires,
    };

    s3.getSignedUrl("getObject", getSignedUrlParams, (err, data) => {
      if (err) {
        rej(err);
      }
      res(data);
    });
  });
};

exports.PreSignObject = PreSignObject;
