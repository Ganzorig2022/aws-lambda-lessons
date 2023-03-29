'use strict';
require('dotenv').config();

const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const db = new DynamoDB();

const TABLE_NAME = process.env.USERS_TABLE; // "Users" irne.

module.exports.getUserByGlobalIndex = async (event) => {
  const { email, password } = JSON.parse(event.body);
  // const USER_ID = event.pathParameters.id;
  const GLOBAL_INDEX = email;

  console.log('global index ni: ', GLOBAL_INDEX);
  const isPassword = bcrypt.compareSync(password, hash);
  console.log('COMPARE VNEN BNUU?==>', isPassword);

  // try {
  //   const result = await db.query({
  //     TableName: TABLE_NAME,
  //     IndexName: 'email-index',
  //     KeyConditionExpression: 'email = :email',
  //     ExpressionAttributeValues: {
  //       ':email': { S: GLOBAL_INDEX },
  //     },
  //   });

  //   console.log('COMPARE VNEN BNUU?==>', result.Items);
  //   // if (result.Items) {
  //   //   const isPassword = bcrypt.compareSync(password, hash);
  //   //   console.log('COMPARE VNEN BNUU?==>', isPassword);
  //   // }

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({
  //       message: 'User data has been successfully arrived',
  //       data: result.Items,
  //     }),
  //   };
  // } catch (error) {
  //   console.log('ERROR with getting user data ====>', error);
  // }
};
