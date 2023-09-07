To run a local Postgresql container with data persistence use:

`docker run -d \
	-e POSTGRES_USER=postgres \
	-e POSTGRES_PASSWORD=mysecretpassword \
	-v $(pwd)/dbdata:/var/lib/postgresql/data \
    -p 5432:5432 \
	postgres`

## 1. Create rds secret in secrets manager, so it can later be used by lambda

`awslocal secretsmanager create-secret --name rds_password --secret-string mysecretpassword`

## 2. Get secret value from secrets manager

`awslocal secretsmanager get-secret-value --secret-id arn:aws:secretsmanager:us-east-1:000000000000:secret:rds_password-EWnJTz`