const colors = require('colors');
const AWS = require('aws-sdk');
const endpoint_url = process.env.LOCALSTACK_HOSTNAME !== null ? `http://${process.env.LOCALSTACK_HOSTNAME}:4566` : process.env.AWS_ENDPOINT_URL || null;

async function main(event) {
    let body = JSON.parse(event.body);
    const message = "Echo is: " + body.echo;
    console.log(message.green);
    console.log('Some blue text'.bgBlue);

    let publishedMessage = new AWS.SNS(endpoint_url !== null ? {endpoint: new AWS.Endpoint(endpoint_url), apiVersion: '2010-03-31'} : {apiVersion: '2010-03-31'})
    try {
        let topic_arn = process.env.SNS_TOPIC_ARN;
        await publishedMessage.publish({Message: message, TopicArn: topic_arn}).promise();
        console.log(`Message ${message} sent to the topic ${topic_arn}`);
    } catch (err) {
        console.error(err, err.stack);
        throw err;
    }

    return {
        statusCode: 200,
        body: message,
    };
};

exports.handler = main;

// main({body: '{"echo": "console test"}'});
