const AdmZip = require("adm-zip");
const child_process = require("child_process");
const { argv } = require("process");

const BUCKET_NAME = "lambda-websitemetatagsgenerator";
const [, , FUNCTION_NAME] = argv;
console.log("Deploying:", FUNCTION_NAME);

const CreateArchive = (functionName) => {
  return new Promise((res) => {
    const zip = new AdmZip();
    zip.addLocalFile(`./functions/${functionName}/index.js`);
    zip.addLocalFolder(`./functions/${functionName}/utils`, "utils");
    zip.writeZip("./functions.zip");
    setTimeout(() => {
      res();
    }, 2000);
  });
};

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
  console.info("⌛ Compressing function and it's utilities");
  await CreateArchive(FUNCTION_NAME);
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
