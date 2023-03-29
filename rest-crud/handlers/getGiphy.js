const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const db = new DynamoDB();

const TABLE_NAME = process.env.GIPHY_TABLE;

module.exports.getGiphy = async (event) => {
  const GIPHY_ID = event.pathParameters.id;

  const params = {
    giphyId: GIPHY_ID,
  };

  const { Item } = await db.getItem({
    TableName: TABLE_NAME,
    Key: marshall(params),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Data has been successfully arrived',
      data: unmarshall(Item),
    }),
  };
};
