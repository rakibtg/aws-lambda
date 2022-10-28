const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-north-1" });
const isProd = process.env.ENV === "production";

const Uploader = async ({ fileName, bucketName }) => {
  const dst = isProd
    ? `/tmp/${fileName}`
    : path.join(__dirname, "../../..", "tmp", fileName);
  const fileContent = fs.readFileSync(dst);
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
