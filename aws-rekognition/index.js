const AWS = require('aws-sdk');
// const s3 = require('aws-sdk/clients/s3');

const rekognition = new AWS.Rekognition();

module.exports.handler = async (event) => {
  const params = {
    Image: {
      S3Object: {
        Bucket: 'my-rekog',
        Name: 'my-email.png',
      },
    },
  };

  try {
    const result = await rekognition.detectText(params).promise();
    console.log('WORKS>>>>>', result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'REKOG',
        email: result.TextDetections.filter((email) =>
          email.DetectedText.includes('@')
        )[0].DetectedText,
      }),
    };
  } catch (error) {
    console.log('ERRORRRRRRR', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'REKOG FAILED',
      }),
    };
  }
};

// TASKs

// Zurag hiine.
// Zurgan dotroosoo "text"-vvdee awna.
// Text-iin array-aar gvigeed "email"-ee salgaj awna.
// Ter email-rvvgee email bichne.
