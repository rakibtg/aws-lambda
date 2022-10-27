const S3_BUCKET = "metatagsemailattachments";

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
