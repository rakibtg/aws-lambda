const { v4: uuidv4 } = require("uuid");
const { ExtractMetaData } = require("./utils/ExtractMetaData");
const { WriteExcel } = require("./utils/WriteExcel");
const { RemoveExcel } = require("./utils/RemoveExcel");
const { Uploader } = require("./utils/Uploader");
const { PreSignObject } = require("./utils/PreSignObject");
const { Emailer } = require("./utils/Emailer");

const S3_BUCKET = "metatagsemailattachments";
const EXCEL_FILE_NAME = `${uuidv4()}.xlsx`;

const RecordHandler = async ({ email, url }) => {
  const metaDataArray = await ExtractMetaData({ url });

  await WriteExcel({
    headers: {
      title: "The title of the page.",
      description: "The description of the page.",
      banner: "The webpage thumbnail.",
      isItWordpress: "Is the website is made of WP.",
    },
    data: metaDataArray,
    fileName: EXCEL_FILE_NAME,
  });

  await Uploader({
    fileName: EXCEL_FILE_NAME,
    bucketName: S3_BUCKET,
  });

  const signedUrl = await PreSignObject({
    fileName: EXCEL_FILE_NAME,
    bucketName: S3_BUCKET,
    expires: 3600 * 2,
  });

  await Emailer({
    to: email,
    subject: "Your file is ready!",
    message: `
      <p style="font-size: 18px;">
        Your excel file is ready to download here:
      </p>
      <div style="background-color: #eee; padding: 10px; margin-top: 10px; margin-bottom: 10px; border-radius: 10px;">
        <a style="color: #000000" href="${signedUrl}">${signedUrl}</a>
      </div>
      <p>
        The download link will expire in two hours.
      </p>
    `,
  });

  await RemoveExcel({ fileName: EXCEL_FILE_NAME });
};

exports.handler = async (event) => {
  const { Records } = event;
  if (!Records.length) return;
  await Promise.all(
    Records.map(async (record) => {
      const { body } = record;
      const { email, url } = JSON.parse(body);
      await RecordHandler({ email, url });
    })
  );

  return {
    statusCode: 200,
  };
};
