# Backend

## 1. Setup

The setup of this project is a test of own abilities to create a serverless setup using AWS services to our advantage

## 2. Services

### 2.1 Websocket API Gateway

For websocket connection between "server" and client

### 2.2 SNS

To publish events to Websocket API

### 2.3 SQS

In case we need to do some REALLY async stuff

### 2.4 API Gateway

Old version, since serverless does not support authorizers on the new httpApi

### 2.5 Lambda

To run functions accessed via API Gateway, plus anything else that needs to be computed

## 2. Error keywords

- ERROR:
- QUERY_ERROR_USER
- USER_NOT_FOUND
