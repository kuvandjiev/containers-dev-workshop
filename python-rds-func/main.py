import psycopg2
import json
import os
import boto3

AWS_ENDPOINT_URL_LOCALSTACK = os.environ.get('LOCALSTACK_HOSTNAME', None)
if AWS_ENDPOINT_URL_LOCALSTACK is not None:
    AWS_ENDPOINT_URL_LOCALSTACK = f'http://{AWS_ENDPOINT_URL_LOCALSTACK}:4566'
aws_endpoint = AWS_ENDPOINT_URL_LOCALSTACK or os.environ.get('AWS_ENDPOINT_URL', None)

DB_HOST = os.environ.get('DB_HOST')
DB_USER = os.environ.get('DB_USER')
client = boto3.client('secretsmanager', endpoint_url=aws_endpoint) if aws_endpoint else boto3.client('secretsmanager')
DB_PASSWORD = client.get_secret_value(SecretId=os.environ.get('DB_SECRET_ID')).get('SecretString', None)
print("DB_PASSWORD:", DB_PASSWORD)

def lambda_handler(event, context):
    # import pydevd_pycharm; pydevd_pycharm.settrace('<hostname here>', port=12345, stdoutToServer=True, stderrToServer=True)
    conn = psycopg2.connect(f"host={DB_HOST} dbname=postgres user={DB_USER} password={DB_PASSWORD}")
    cur = conn.cursor()
    for record in event['Records']:
        message = record.get('Sns', {}).get('Message')
        print(record)
        cur.execute("INSERT INTO messages (message) VALUES (%s)", (message, ))
    conn.commit()
    cur.close()
    conn.close()

    return {
        "StatusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "Message": "Messages inserted in RDS"
        })
    }
