Some quick commands to deal with this function and localstack
=======
## 1. Create the lambda function in localstack

`
rm function.zip || echo "no function.zip to delete"
mkdir dist -p
pip install -r requirements.txt --target dist
pip install --platform manylinux2014_x86_64 --target=dist --implementation cp --python-version 3.11 --only-binary=:all: --upgrade psycopg2-binary
cd dist
zip -r $OLDPWD/function.zip .
cd $OLDPWD
zip -g function.zip main.py
`

`awslocal lambda create-function --function-name python-rds-func --runtime python3.11 --zip-file fileb://function.zip --handler main.lambda_handler --role arn:aws:iam::000000000000:role/lambda-role --timeout 900 --environment "Variables={DB_HOST=postgres,DB_USER=postgres,DB_SECRET_ID=rds_password}"`
`awslocal lambda update-function-configuration --function-name python-rds-func --environment "Variables={DB_HOST=postgres,DB_USER=postgres,DB_SECRET_ID=rds_password}"`

## 2. Update the function code

`awslocal lambda update-function-code --function-name python-rds-func --zip-file fileb://function.zip`

## 3. Invoke the function

`awslocal lambda invoke --function-name python-rds-func --cli-binary-format raw-in-base64-out --payload file://test_message.json output.txt`

## 4. Create SNS topic
`awslocal sns create-topic --name test-sns-topic`


## 5. Triggering Lambda from SNS
`awslocal sns subscribe --protocol lambda --topic-arn arn:aws:sns:us-east-1:000000000000:test-sns-topic --notification-endpoint arn:aws:lambda:us-east-1:000000000000:function:python-rds-func`

## 6. Enable remote debugging

LAMBDA_RUNTIME_ENVIRONMENT_TIMEOUT=900 localstack start -d
The debugger is available at $(hostname).$(domainname) on the port configured in the PyCharm debug configuration