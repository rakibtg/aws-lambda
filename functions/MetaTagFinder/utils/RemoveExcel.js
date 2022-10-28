const fs = require("fs");
const path = require("path");
const isProd = process.env.ENV === "production";

const RemoveExcel = ({ fileName }) => {
  return new Promise((res, rej) => {
    const dst = isProd
      ? `/tmp/${fileName}`
      : path.join(__dirname, "../../..", "tmp", fileName);

    fs.unlink(dst, (err) => {
      if (err) {
        rej(err);
      }
      res();
    });
  });
};

exports.RemoveExcel = RemoveExcel;
