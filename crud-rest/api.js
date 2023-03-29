'use strict';
require('dotenv').config();

const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const db = new DynamoDB();
const uuid = require('uuid');

const TABLE_NAME = process.env.GIPHY_TABLE;
// const TABLE_NAME = 'Giphy';
const HASH_KEY = 'giphyId';

// POST REQUEST ==> Create a new USER table
exports.createGiphy = async (event) => {
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

// GET REQUEST ==> Get single data from dynamodb by using query params.id
// https://l4n5p8q355.execute-api.us-east-1.amazonaws.com/dev/giphy/1234 etc...
exports.getSingleGiphy = async (event) => {
  let Id = event.pathParameters.id;

  const params = {
    giphyId: Id,
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
