'use strict';
require('dotenv').config();

const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const db = new DynamoDB();

const TABLE_NAME = process.env.USERS_TABLE; // "Users" irne.

module.exports.loginUser = async (event) => {
  let { email, password } = JSON.parse(event.body);
  const GLOBAL_INDEX = email;

  try {
    const result = await db.query({
      TableName: TABLE_NAME,
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': { S: GLOBAL_INDEX },
      },
    });

    console.log('COMPARE VNEN BNUU?==>', result);
    // if (result.Items) {
    //   const hash =
    //   const isPassword = bcrypt.compareSync(password, hash);
    //   console.log('COMPARE VNEN BNUU?==>', isPassword);
    // }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User has logged successfully.',
        // data: result.Items,
      }),
    };
  } catch (error) {
    console.log('ERROR with getting user data ====>', error);
  }
};
