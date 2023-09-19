Some quick commands to deal with this function and localstack
=======

## 1. Create/update the lambda function in localstack

`zip -r function.zip index.js node_modules`

`awslocal lambda create-function --function-name js-sqs-read-func --runtime nodejs18.x --zip-file fileb://function.zip --handler index.handler --role arn:aws:iam::000000000000:role/lambda-role --timeout 900`
`awslocal lambda update-function-configuration --function-name js-sqs-read-func`

## 2. Update the function code

`awslocal lambda update-function-code --function-name js-sqs-read-func --zip-file fileb://function.zip`

## 3. Invoke the function

`awslocal lambda invoke --function-name js-sqs-read-func --cli-binary-format raw-in-base64-out --payload file://test_message.json output.txt`

## 4. Create DnynamoDB table

`awslocal dynamodb create-table --table-name message-history --key-schema AttributeName=id,KeyType=HASH --attribute-definitions AttributeName=id,AttributeType=S --billing-mode PAY_PER_REQUEST`

## 5. Create SQS

`awslocal sqs create-queue --queue-name test-queue`

## 6. Send message to SQS

`awslocal sqs send-message --queue-url http://localhost:4566/000000000000/test-queue --message-body "test console test"`

See received messages on:
`http://localhost:4566/_aws/sqs/messages?QueueUrl=http://localhost:4566/000000000000/test-queue`


## 7. Lambda event sourcing from SQS

`awslocal lambda create-event-source-mapping --function-name js-sqs-read-func --batch-size 1 --event-source-arn arn:aws:sqs:us-east-1:000000000000:test-queue`

## 8. To subscribe the SQS queue to an SNS topic:

`awslocal sns subscribe --protocol sqs --topic-arn arn:aws:sns:us-east-1:000000000000:test-sns-topic --notification-endpoint arn:aws:sqs:us-east-1:000000000000:test-queue`

## 9. Enable remote debugging

LAMBDA_RUNTIME_ENVIRONMENT_TIMEOUT=900 LAMBDA_DOCKER_FLAGS="-e NODE_OPTIONS=--inspect-brk=0.0.0.0:9229 -p 9229:9229" localstack start -d