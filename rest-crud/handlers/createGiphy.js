const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const uuid = require('uuid');
const db = new DynamoDB();

const TABLE_NAME = process.env.GIPHY_TABLE;

module.exports.createGiphy = async (event) => {
  let { name, urls } = JSON.parse(event.body);
  const timestamp = new Date().getTime();

  const params = {
    giphyId: uuid.v1(),
    name: name,
    urls: urls,
    createdAt: timestamp,
  };

  await db.putItem({
    TableName: TABLE_NAME,
    Item: marshall(params),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Data has been successfully created',
    }),
  };
};
