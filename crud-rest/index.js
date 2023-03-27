'use strict';
const AWS = require('aws-sdk');
const { default: axios } = require('axios');
const nodemailer = require('nodemailer');
// const sts = new AWS.STS();

// exports.handler = async (event) => {
//   const { Account: account } = await sts.getCallerIdentity({}).promise();
//   return account;
// };

// exports.handler = async (event) => {
//   const morningTime = new Date();
//   morningTime.setHours(9, 0, 0, 0);
//   const currentTime = new Date().getHours();
//   const difference = currentTime - morningTime.getHours();
//   console.log(difference);
//   if (difference > 0) console.log('You came in time');
//   if (difference < 0) console.log('You did not come in time');
// };

// exports.handler = async () => {
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     auth: {
//       user: 'ganzo.galaxy@gmail.com',
//     },
//   });

//   const result = await transporter.sendMail({
//     from: 'ganzo.galaxy@gmail.com',
//     to: 'ganzo.galaxy@gmail.com',
//     subject: ' Sending email using node.js',
//     text: ' That was so fuciking easy!',
//   });

//   return result.messageId;
// };

// INVOKE function from another function
const lambda = new AWS.Lambda();
const arnPrefix = 'arn:aws:lambda:us-east-1:930277727374:function';

exports.function1 = async (event, context) => {
  const params = {
    FunctionName: `${arnPrefix}:serverless-test-dev-myFunction2`,
    InvocationType: 'Event',
    Payload: JSON.stringify({ name: 'batman' }),
  };

  const result = await lambda.invoke(params).promise();
  return result;
};

exports.function2 = async (event) => {
  const { name } = event;
  const result = await axios.get(
    `https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=3&offset=0&q=${name}`
  );

  const urls = result.data.data.map((el) => el.url);
  console.log(urls);

  return urls;
};

// CRUD operations
const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const db = new DynamoDB();

const getGiphys = async (name) => {
  const result = await axios.get(
    `https://api.giphy.com/v1/gifs/search?api_key=QPHq62keOwy2IJ46dWicOPFANBwsBnK4&limit=3&offset=0&q=${name}`
  );

  const urls = result.data.data.map((el) => el.url);

  return urls;
};

// PUT REQUEST
exports.createHandler = async () => {
  const params = {
    user_id: '123',
    giphyData: await getGiphys('batman'),
  };

  const result = await db.putItem({
    TableName: 'giphys',
    Item: marshall(params),
  });

  return result;
};
// GET REQUEST
exports.getHandler = async () => {
  const params = {
    user_id: '123',
  };

  const { Item } = await db.getItem({
    TableName: 'giphys',
    Key: marshall(params),
  });

  return unmarshall(Item);
};

// UPDATE REQUEST
exports.updateHandler = async (event) => {
  const params = {
    user_id: '123',
  };

  const data = await getGiphys('superman');

  const result = await db.updateItem({
    TableName: 'giphys',
    Key: marshall(params),
    UpdateExpression: 'SET giphyData= :updated',
    ExpressionAttributeValues: {
      ':updated': {
        L: data.map((el) => {
          return { S: el };
        }),
      },
    },
  });

  console.log(result);

  return result;
};

exports.deleteHandler = async (event) => {
  const params = {
    user_Id: '123',
  };

  const result = await db.deleteItem({
    TableName: 'giphys',
    Key: marshall(params),
  });

  console.log(result);

  return result;
};
