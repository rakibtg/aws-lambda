console.clear();

const MetaTagFinder = require("./index");

const body = JSON.stringify({
  url: "https://example.com/article/article-title",
  email: "user@example.com",
});

const SQS_PAYLOAD = {
  Records: [
    {
      messageId: "000000000-0000-0000-0000-000000000",
      receiptHandle: "MessageReceiptHandle",
      body,
      attributes: {
        ApproximateReceiveCount: "1",
        SentTimestamp: "000000000000",
        SenderId: "000000000000",
        ApproximateFirstReceiveTimestamp: "000000000000",
      },
      messageAttributes: {},
      md5OfBody: "{{{md5_of_body}}}",
      eventSource: "aws:sqs",
      eventSourceARN: "arn:aws:sqs:us-east-1:000000000000:MyQueue",
      awsRegion: "us-east-1",
    },
  ],
};

MetaTagFinder.handler(SQS_PAYLOAD);
