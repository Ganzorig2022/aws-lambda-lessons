'use strict';

const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const db = new DynamoDB();
const bcrypt = require('bcryptjs');
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

const TABLE_NAME = 'userData';
const USER_ID = '123';

// PUT REQUEST ==> Create a new USER table
exports.createUserHandler = async (event) => {
  const params = {
    user_id: USER_ID,
    firstname: 'Ganzorig',
    lastname: 'Nyamsuren',
    email: 'ganzo.galaxy@gmail.com',
    password: await bcrypt.hash('12345', 10),
  };

  const result = await db.putItem({
    TableName: TABLE_NAME,
    Item: marshall(params),
  });

  return result;
};

// GET REQUEST
exports.getUserHandler = async (event) => {
  const { email, username, lastname } = event.Records[0].dynamodb.NewImage;
  // email notifiction end bichne.
};
