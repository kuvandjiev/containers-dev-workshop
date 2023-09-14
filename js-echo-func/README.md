Some quick commands to deal with this function and localstack
=======

## 0. Create SNS topic
`awslocal sns create-topic --name test-sns-topic`

## 1. Create the lambda function in localstack

`zip -r function.zip index.js node_modules`

`awslocal lambda create-function --function-name js-echo-func --runtime nodejs18.x --zip-file fileb://function.zip --handler index.handler --role arn:aws:iam::000000000000:role/lambda-role --timeout 900 --environment "Variables={SNS_TOPIC_ARN=arn:aws:sns:us-east-1:000000000000:test-sns-topic}"`


## 2. Update the function code

`awslocal lambda update-function-code --function-name js-echo-func --zip-file fileb://function.zip`

## 3. Invoke the function

`awslocal lambda invoke --function-name js-echo-func --cli-binary-format raw-in-base64-out --payload '{"body": "{\"echo\": \"Hello World invoke echo\"}"}' output.txt`

## 4. Create function URL to be invokable with a REST call

`awslocal lambda create-function-url-config --function-name js-echo-func --auth-type NONE`

## 5. Invoke the function using a REST call
Note, the function URL will vary and will be outputed from the command above

`curl -X POST http://7x11hxpqoz77gy2t8wy3iszg8bfsolqy.lambda-url.us-east-1.localhost.localstack.cloud:4566 -H 'Content-Type: application/json' -d '{"echo": "Hello World REST echo"}'`

## 6. Enable remote debugging

LAMBDA_RUNTIME_ENVIRONMENT_TIMEOUT=900 LAMBDA_DOCKER_FLAGS="-e NODE_OPTIONS=--inspect-brk=0.0.0.0:9229 -p 9229:9229" localstack start -d