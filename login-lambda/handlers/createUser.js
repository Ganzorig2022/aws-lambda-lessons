'use strict';
require('dotenv').config();

const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const db = new DynamoDB();

const TABLE_NAME = process.env.USERS_TABLE; // "Users" irne.

module.exports.createUser = async (event) => {
  let { firstname, lastname, email, password } = JSON.parse(event.body);
  const USER_ID = uuid.v1();

  try {
    const params = {
      userId: USER_ID,
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 10),
    };

    await db.putItem({
      TableName: TABLE_NAME,
      Item: marshall(params),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User data has been successfully created',
      }),
    };
  } catch (error) {
    console.log('ERROR with user create ==>', error);
  }
};
