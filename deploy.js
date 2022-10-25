const child_process = require("child_process");

const FUNCTION_NAME = "MetaTagFinder";
const BUCKET_NAME = "lambda-websitemetatagsgenerator";

const Terminal = (command) => {
  return new Promise((resolve, reject) => {
    child_process.exec(
      command,
      { maxBuffer: 1500 * 1024 },
      function (error, stdout, stderr) {
        if (!!error) reject(error);
        else resolve(stdout || stderr);
      }
    );
  });
};

const Sleep = (seconds, convertToSeconds = true) => {
  if (convertToSeconds) {
    seconds = seconds * 1000;
  }
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, seconds);
  });
};

const Deploy = async () => {
  console.info("⌛ Compressing code");
  await Terminal(
    `powershell "Compress-Archive .\\MetaTagFinder\\index.js functions.zip"`
  );
  await Sleep(1);
  console.info("⌛ Uploading code to AWS");
  await Terminal(`aws s3 cp ./functions.zip s3://${BUCKET_NAME}`);
  await Sleep(1);
  await Terminal("rm ./functions.zip");
  await Sleep(1);
  console.info("⌛ Updating lambda function");
  await Terminal(
    `aws lambda update-function-code --function-name ${FUNCTION_NAME} --s3-bucket ${BUCKET_NAME} --s3-key functions.zip --region eu-north-1`
  );
  console.info("✅ Deployed!");
};

Deploy();
