const { extractMetadata } = require("link-meta-extractor");

const ExtractMetaData = async ({ url }) => {
  const metaInformation = await extractMetadata(url);

  return metaInformation;
};

exports.ExtractMetaData = ExtractMetaData;
