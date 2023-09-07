const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const endpoint_url = process.env.LOCALSTACK_HOSTNAME !== null ? `http://${process.env.LOCALSTACK_HOSTNAME}:4566` : process.env.AWS_ENDPOINT_URL || null;
const documentClient = new AWS.DynamoDB.DocumentClient(endpoint_url !== null ? {endpoint: new AWS.Endpoint(endpoint_url)} : {});

exports.handler = async function(event) {
  const message_body = event.Records[0].body;
  console.info("Processing message: ", message_body);
  try {
    await documentClient.put({TableName : 'message-history', Item: {id: uuidv4(), message: message_body}}).promise();
  } catch (err) {
    console.error('Error processing record', message_body, err)
    throw err;
  }
  console.info(`Successfully processed message`, message_body);
  return {body: `Successfully processed message`}
};
