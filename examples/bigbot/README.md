# Big Bot Template

> [!TIP]
> If you have any issue you can join the discord server for support: https://discord.gg/ddeno

This template is designed for bots that aim or are already in millions of Discord servers.

## Setup

- Download the source
- Copy the .env.example file and rename it to .env
- Fill out the .env file
- Find all the `TEMPLATE-SETUP:` comments and follow the instructions and delete the comments as you finish them.

## Startup

You can run the template either using Docker or using node directly.

Using docker will be the simplest and easiest way to start your bot.

### Using Docker

The docker compose file includes the discordeno bot and influxdb, this would create an environment more close to the production environment.

First, copy the .env.example file to .env, and fille the values, when values are pre-set they can be left to their default value, except the one specified below

> [!IMPORTANT]
> There are a few values in the `.env` where the value should be very specific, this is to make the docker containers communicate between them
>
> - `EVENT_HANDLER_HOST` should be set to `bot`
> - `REST_HOST` should be set to `rest`
> - `GATEWAY_HOST` should be set to `gateway`
> - Setup the message queue:
>   - `MESSAGEQUEUE_ENABLE` should be set to `true`
>   - `MESSAGEQUEUE_URL` should be set to `rabbitmq:5672`
>   - `MESSAGEQUEUE_USERNAME` should be set to `guest`
>   - `MESSAGEQUEUE_PASSWORD` should be set to `guest`
> - Copy the value for influxDB:
>   - copy `DOCKER_INFLUXDB_INIT_ORG` to `INFLUX_ORG`
>   - copy `DOCKER_INFLUXDB_INIT_BUCKET` to `INFLUX_BUCKET`
>   - copy `DOCKER_INFLUXDB_INIT_ADMIN_TOKEN` to `INFLUX_TOKEN`

Then, run `docker-compose build` to build/rebuild the bot

And, run `docker-compose up -d` to start

Your bot should be running now.

You can check the REST process fetch analytics (methods, status...) in influxdb's WebUI at http://localhost:8086 with the username and password in the .env file (`DOCKER_INFLUXDB_INIT_USERNAME` & `DOCKER_INFLUXDB_INIT_PASSWORD`). And the message queue's information (number of events ecc) in the RabbitMQ WebUI at http://localhost:15672 with username of `guest` and password of `guest`.

### Using Node

> [!NOTE]
> This template has been tested with the following versions:
>
> - NodeJS: v18.20.3 and v22.2.0
>   - Any NodeJS version between v18.20.3 and v22.2.0 should work, anything below v18 will not run correctly, anything above v22 should work
> - RabbitMQ: v3.12.14 with:
>   - Erlang: v26.2.5
>   - [RabbitMQ Message Deduplication Plugin](https://github.com/noxdafox/rabbitmq-message-deduplication): v0.6.2
> - InfluxDB: v2.7.6

You will need to start a few processes.

The preset value of `EVENT_HANDLER_HOST`, `REST_HOST` and `GATEWAY_HOST` all use localhost, if you are using different servers you will need to change those values

#### Setup process

If you want to use RabbitMQ and InfluxDB as well see below

- Install the dependencies with yarn
- Build the code with `yarn build`

After that, you can start your bot one by one with the following order.

- Start the REST Proxy: `yarn start:rest`
- Start the Bot: `yarn start:bot`
- Start Gateway: `yarn start:gateway`

#### InfluxDB

To enable InfluxDB you will need to set the `INFLUX_ORG`, `INFLUX_BUCKET`, `INFLUX_TOKEN` and `INFLUX_URL` variables in the `.env`.

For the `INFLUX_URL`, the preset value uses localhost, if your InfluxDB is not running on the same machine, change the url accordingly. You should not include any prefix, just `HOST:PORT`

If you do not set one of those values, InfluxDB will be disabled.

#### RabbitMQ

To enable RabbitMQ you will need to set `MESSAGEQUEUE_ENABLE` to `true` and set `MESSAGEQUEUE_URL`, `MESSAGEQUEUE_USERNAME` and `MESSAGEQUEUE_PASSWORD` variables in the `.env`.

`MESSAGEQUEUE_USERNAME` and `MESSAGEQUEUE_PASSWORD` will both default to `guest` in a RabbitMQ instance unless changed.

> [!IMPORTANT]
> The RabbitMQ must installed with the [RabbitMQ Message Deduplication Plugin](https://github.com/noxdafox/rabbitmq-message-deduplication)
>
> There are the plugin files (`.ez`) in the `rabbitmq/plugins/message-deduplication` folder, you can copy those into your `plugins` folder for the RabbitMQ installation folder or download them from the original repo, just make sure to download the correct version in this case
>
> To enable the plugin you will need to run: `rabbitmq-plugins enable rabbitmq_message_deduplication`
