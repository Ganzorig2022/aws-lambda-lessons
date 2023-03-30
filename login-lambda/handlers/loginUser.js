'use strict';

const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const bcrypt = require('bcryptjs');
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

    // check if data has arrived, then get the password
    if (result.Items.length > 0) {
      const hash = result.Items[0].password.S;
      const isPassword = bcrypt.compareSync(password, hash);

      if (isPassword) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'User has logged successfully.',
          }),
        };
      } else {
        return {
          statusCode: 401,
          body: JSON.stringify({
            message: 'Login, failed. Password does not match!!',
          }),
        };
      }
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'User is not found.',
        }),
      };
    }
  } catch (error) {
    console.log('ERROR with getting user data ====>', error);
  }
};

// # https://cloudkatha.com/how-to-create-dynamodb-table-with-global-secondary-index-using-cloudformation/
