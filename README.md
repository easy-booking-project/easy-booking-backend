Built with [NestJS](https://nestjs.com/)

# EasyBooking Backend

EasyBooking backend project.

# Getting Started

## Install Dependencies

Install Node modules by the following command.

```sh
npm i
```

## Running a MongoDB Instance

If you understand how to start a MongoDB instance, you can star MongoDB instance in your own way, but please make sure you know its connection string. We have a __default__ connection string config as ```mongo://localhost:27017```, if you use different connection string, please read the [Config DB Connection String](#config-db-connection-string) section.

### Starting MongoDB Instance Using Docker

To make it simple, you can start a MongoDB instance using Docker by the command below. It gives you a empty MongoDB instance called _mongo_ with no password and port _27017_ opened. This is the __default__ development config for the backend app.


```sh
docker run --name mongo -p 27017 -d mongo
```
In case of port _27017_ being used, you can use a random port like below. If you use this way, please make sure you read the [Config DB Connection String](#config-db-connection-string) section

```sh
docker run --name mongo -P -d mongo
```

Note that this would create a MongoDB container without data persistence. If you want to persist the data, considering using `-v` flag for `docker run`.

## Running the Backend App

### Config DB Connection String

If you running your MongoDB instance on _localhost:27017_, you can skip this step.

If you run the MongoDB instance not on _localhost:27017_, you should change your database connection string in _.env.local_ to connect your local MongoDB. In this case, please __DO NOT__ commit your modified _.env.local_ file.

You can run `docker ps` to checkout which port MongoDB has exposed to.

To Run the app, use the following command, which the app would start and listen to port _3000_ on _localhost_.

```sh
npm run start
```

# Project Structure

Except the _app module_, there are three main modules.

## Controller

This module would hold all the API endpoint handlers, which basically contains _controllers_ in NestJS concept. Any _controller_ here should only handle the API requests and should not contain bussiness logic. They can use services from Service and Repository modules.

## Service

This module would hold all the general services, such as business logic, which basically contains _services_ in NestJS concept. Any _service_ here should not contain API processing logic. They can use services from Repository module.

## Repository

This module would hold all the services about accessing database, which basically contains _services_ in NestJS concept. Any _service_ here should only provide database access and should not contain bussiness logic.

# Contribution

## Before Committing

Before committing, please use `npm run lint` first.
