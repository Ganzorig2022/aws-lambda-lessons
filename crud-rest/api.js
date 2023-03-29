'use strict';
require('dotenv').config();

const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const db = new DynamoDB();

const TABLE_NAME = 'Giphy';
const HASH_KEY = 'giphyId';

// POST REQUEST ==> Create a new USER table
exports.createGiphy = async (event) => {
  let { name, urls, timestamp } = JSON.parse(event.body);

  const params = {
    giphyId: HASH_KEY,
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
    body: JSON.stringify('Event created'),
  };
};

// GET REQUEST ==> Get table data from dynamodb
exports.getGiphy = async (event) => {
  const params = {
    giphyId: HASH_KEY,
  };
  const { Item } = await db.getItem({
    TableName: TABLE_NAME,
    Key: marshall(params),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Data has arrived',
      data: unmarshall(Item),
    }),
  };
};

// TASK
// 1) Postman dr Authorization dotor --> AWS Signature --> Access Key, Secret Key-goo ogno.
// 2) Post request-eer serverless.yml file-aar DYNAMODB dre data-gaa bichne.
// 3) Get request-eer data-gaa awna.
