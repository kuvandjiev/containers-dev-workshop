This is the React tic-tac-toe tutorial from https://react.dev/learn/tutorial-tic-tac-toe
The games is slightly modified to report each player click on the board to the echo function.
The backend endpoint is specified by the `REACT_APP_ECHO_ENDPOINT` environmental variable.

## 1. Install depedencies

`npm install`

## 2. Run the game in a browser

`REACT_APP_ECHO_ENDPOINT="<js-echo-func-invoke-url>" npm start`

`<js-echo-func-invoke-url>` will be something like: `http://8g83a1vtt1rtp6at2zlqmfcfzd2r13mx.lambda-url.us-east-1.localhost.localstack.cloud:4566/`
and is outputted when the url is generated with this command: `awslocal lambda create-function-url-config --function-name js-echo-func --auth-type NONE`

This can be automated using:

REACT_APP_ECHO_ENDPOINT=$(awslocal lambda get-function-url-config --function-name js-echo-func|jq -r ".FunctionUrl") npm start