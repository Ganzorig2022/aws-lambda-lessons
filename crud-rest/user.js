'use strict';
require('dotenv').config();

const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const db = new DynamoDB();
const bcrypt = require('bcryptjs');
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

// GET REQUEST ==> When new table created, then returns its data fron dynamodb using event stream
exports.getUserHandler = async (event) => {
  const { email, firstname, lastname } = event.Records[0].dynamodb.NewImage;

  // email notifiction.
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: email,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const result = await transporter.sendMail({
    from: email,
    to: email,
    subject: ' Sending email using node.js',
    text: `Hello, Mr ${firstname} ${lastname}. This email has been sent by AWS in nodejs`,
  });

  console.log(result.messageId);

  return result.messageId;
};
