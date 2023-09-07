const colors = require('colors');

async function main(event) {
    let body = JSON.parse(event.body);
    const message = "Echo is: " + body.echo;
    console.log(message.green);
    console.log('Some blue text'.bgBlue);
    return {
        statusCode: 200,
        body: message,
    };
};

exports.handler = main;

// main({body: '{"echo": "console test"}'});
