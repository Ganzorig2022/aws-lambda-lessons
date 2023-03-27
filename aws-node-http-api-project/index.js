'use strict';
const DynamoDB = require('aws-sdk/clients/dynamodb');
const documentClient = new DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.createNote = async (event, context, callback) => {
  let data = JSON.parse(event.body);

  try {
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    const params = {
      TableName: 'notes',
      Item: {
        notesId: data.id,
        title: data.title,
        body: data.body,
      },
      ConditionExpression: 'attribute_not_exists(notesId)',
    };
    await documentClient.put(params).promise();
    callback(null, {
      statusCode: 201,
      body: JSON.stringify(data),
    });
  } catch (error) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify(error.message),
    });
  }
};

exports.updateNote = async (event) => {
  let notesId = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify('The note with id ' + notesId + ' has been updated'),
  };
};

exports.deleteNote = async (event) => {
  let notesId = event.pathParameters.id;

  return {
    statusCode: 200,
    body: JSON.stringify('The note with id ' + notesId + ' has been deleted'),
  };
};
exports.getAllNotes = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify('All notes are returned'),
  };
};
