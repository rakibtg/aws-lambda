const child_process = require("child_process");
const { argv } = require("process");

const FUNCTION_NAME = "MetaTagFinder";
const BUCKET_NAME = "lambda-websitemetatagsgenerator";

const [, , DEPLOY_TARGET] = argv;
console.log("Deploying:", DEPLOY_TARGET);

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

const Deploy = async () => {
  console.info("⌛ Compressing code");
  await Terminal(
    `powershell "Compress-Archive .\\functions\\${DEPLOY_TARGET}\\index.js functions.zip"`
  );
  console.info("⌛ Uploading code to AWS");
  await Terminal(`aws s3 cp ./functions.zip s3://${BUCKET_NAME}`);
  await Terminal("rm ./functions.zip");
  console.info("⌛ Updating lambda function");
  await Terminal(
    `aws lambda update-function-code --function-name ${FUNCTION_NAME} --s3-bucket ${BUCKET_NAME} --s3-key functions.zip --region eu-north-1`
  );
  console.info("✅ Deployed!");
};

Deploy();
