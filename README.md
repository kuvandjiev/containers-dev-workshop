Setting up a local development environment for a cloud application and debugging it by simulating an end-to-end flow with plenty of different services is not easy. Often such applications are distributed and asynchronous which makes things extra challenging on the developer’s PC, especially when dealing with limited PC resources and dependencies around tooling and licensing.

I am going to show you a possible solution for the above problem by demonstrating a small application using AWS Lambda, SNS, SQS, DynamoDB, PostgreSQL, and AWS Secrets Manager. I am going to use Python and Node.js for the backend and slightly modified version of the React’s Tic-Tac-Toe tutorial game as a simple frontend. The local environment deployment will be built on my Windows 10 PC, using WSL (Windows Subsystem for Linux), Docker and Localstack

The directories in the project contain the respective parts of the following design:

![On the cloud](/architecture-Cloud.drawio.png)

![Locally](/architecture-Local.drawio.png)