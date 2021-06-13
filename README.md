Built with [NestJS](https://nestjs.com/)

# EasyBooking Backend

EasyBooking backend project.

# Getting Started

## Install Dependencies

Install Node modules by the following command.

```sh
npm i
```

### Starting MongoDB Instance Using Docker

To make it simple, you can start a MongoDB instance using Docker by the command below. It gives you a empty MongoDB instance called _mongo_ with no password and a random port opened.

```sh
docker run --name mongo -P -d mongo
```

You can check the randomly opened port number by running below command after starting the container.

```sh
docker ps
```

Note that this would create a MongoDB container without data persistence. If you want to persist the data, considering using `-v` flag for `docker run`.

## Running a MongoDB Instance

Change your database connection string in .env.local to connect your local MongoDB.

run `docker ps` to checkout which port MongoDB has exposed to.

### Running the Backend App

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
