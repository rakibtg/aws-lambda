const { extractMetadata } = require("link-meta-extractor");

const ExtractMetaData = async ({ url }) => {
  const urlArray = typeof url === "string" ? [url] : [...url];
  const results = await Promise.all(
    urlArray.map(async (pageAddress) => {
      try {
        const metaInformation = await extractMetadata(pageAddress);
        return metaInformation;
      } catch (error) {
        // log fail.
      }
    })
  );

  return results;
};

exports.ExtractMetaData = ExtractMetaData;
