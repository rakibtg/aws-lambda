const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-north-1" });

const Emailer = async ({ to, message, subject }) => {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: message,
        },
        Text: {
          Charset: "UTF-8",
          Data: message,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: "rakibtg@gmail.com",
    ReplyToAddresses: ["rakibtg@gmail.com"],
  };

  return new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise();
};

exports.Emailer = Emailer;
