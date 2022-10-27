const fs = require("fs");
const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-north-1" });

const Uploader = async ({ fileName, bucketName }) => {
  const fileContent = fs.readFileSync(`./${fileName}`);
  const s3 = new AWS.S3({ apiVersion: "2006-03-01", region: "eu-north-1" });

  return s3
    .upload({
      Bucket: bucketName,
      Key: fileName,
      Body: fileContent,
    })
    .promise();
};

exports.Uploader = Uploader;
