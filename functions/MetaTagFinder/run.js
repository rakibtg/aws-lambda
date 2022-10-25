console.clear();

const MetaTagFinder = require("./index");

const body = JSON.stringify({
  url: "https://dev.to/afrazkhan/how-to-setup-aws-lambda-layers-nodejs-182",
  email: "rakibtg@gmail.com",
});

const SQS_PAYLOAD = {
  Records: [
    {
      messageId: "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
      receiptHandle: "MessageReceiptHandle",
      body,
      attributes: {
        ApproximateReceiveCount: "1",
        SentTimestamp: "1523232000000",
        SenderId: "123456789012",
        ApproximateFirstReceiveTimestamp: "1523232000001",
      },
      messageAttributes: {},
      md5OfBody: "{{{md5_of_body}}}",
      eventSource: "aws:sqs",
      eventSourceARN: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
      awsRegion: "us-east-1",
    },
  ],
};

MetaTagFinder.handler(SQS_PAYLOAD);
