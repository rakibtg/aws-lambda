const { extractMetadata } = require("link-meta-extractor");

async function extractMeta(url) {
  const metaInformation = await extractMetadata(url);

  return metaInformation;
}

async function handleRequest({ email, url }) {
  const metaTags = await extractMeta(url);

  const response = {
    statusCode: 200,
    body: JSON.stringify(metaTags),
  };

  return response;
}

exports.handler = async (event) => {
  const { Records } = event;

  if (!Records.length) return;

  await Promise.all(
    Records.map((record) => {
      const { body } = record;
      console.log(body);
      const { email, url } = JSON.parse(body);
      console.log({ email, url });
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify("moved to commonjs"),
  };
};
