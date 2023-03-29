const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const db = new DynamoDB();

const TABLE_NAME = process.env.GIPHY_TABLE;

module.exports.listGiphys = async (event) => {
  try {
    const { Items } = await db.scan({
      TableName: TABLE_NAME,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Data has been successfully arrived',
        data: Items,
      }),
    };
  } catch (error) {
    console.log('List error: ', error);
  }
};
