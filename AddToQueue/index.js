import { extractMetadata } from "link-meta-extractor";
// validate url and email address.
async function extractMeta(url) {
  const metaInformation = await extractMetadata(url);

  return metaInformation;
}

export const handler = async (event) => {
  const { url, email } = event.queryStringParameters;
  const metaTags = await extractMeta(url);

  const response = {
    statusCode: 200,
    body: JSON.stringify(metaTags),
  };

  return response;
};

handler();
