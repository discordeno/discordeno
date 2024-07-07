# Big Bot Template

> [!TIP]
> If you have any issue you can join the discord server for support: https://discord.gg/ddeno

This template is designed for bots that aim to be in millions of Discord services or already are.

## Setup

- Download the source
- Copy the .env.example file and rename it to .env
- Fill out the .env file
- Find all the `TEMPLATE-SETUP:` comments and follow the instructions and delete the comments as you finish them.

## Startup

You can run the template using either Docker or Node.

Using docker will be the simplest and easiest way to start your bot.

### Using Docker

The docker compose file includes the discordeno bot and influxdb. This will create an environment close to the production environment.

First, copy the `.env.example` file, rename it to `.env`, and fill in the values. Pre-set values can be left to their default value, except for the following:

> [!IMPORTANT]
> The following values must be set to enable the docker container to communicate between different parts of your bot, InfluxDB, and RabbitMQ
>
> - `EVENT_HANDLER_HOST` should be set to `bot`
> - `REST_HOST` should be set to `rest`
> - `GATEWAY_HOST` should be set to `gateway`
> - Setup the message queue:
>   - `MESSAGEQUEUE_ENABLE` should be set to `true`
>   - `MESSAGEQUEUE_URL` should be set to `rabbitmq:5672`
>   - `MESSAGEQUEUE_USERNAME` should be set to `guest`
>   - `MESSAGEQUEUE_PASSWORD` should be set to `guest`
> - Set the value for influxDB:
>   - Copy `DOCKER_INFLUXDB_INIT_ORG` to `INFLUX_ORG`
>   - Copy `DOCKER_INFLUXDB_INIT_BUCKET` to `INFLUX_BUCKET`
>   - Copy `DOCKER_INFLUXDB_INIT_ADMIN_TOKEN` to `INFLUX_TOKEN`
>   - Set `INFLUX_URL` to `http://influxdb:8086`

After setting the aforementioned values, run `docker compose build` to build/rebuild the bot

Finally, run `docker compose up -d` to start

> [!NOTE]
> Docker will start the REST proxy, Gateway and Bot, however you won't see any command in Discord.
> You will need to manually run the `bot/register-commands.js` file.
>
> You can do this locally, but you will need to change some environment variables like the `REST_HOST` to point to something accessible from your machine

Your bot should be running now.

You can check the REST process fetch analytics (methods, status...) in influxdb's WebUI at http://localhost:8086 with the username and password in the .env file (`DOCKER_INFLUXDB_INIT_USERNAME` and `DOCKER_INFLUXDB_INIT_PASSWORD`, respectively). You can also check the message queue's information (number of events, ...) in the RabbitMQ WebUI at http://localhost:15672 with the username `guest` and password `guest`.

### Using Node

> [!NOTE]
> This template has been tested with the following versions:
>
> - NodeJS: v18.20.3, v20.14.0 and v22.2.0
>   - Any NodeJS version between v18.20.3 and v22.2.0 should work, anything below v18 will not run correctly, anything above v22 should work
> - RabbitMQ: v3.12.14 with:
>   - Erlang: v26.2.5
>   - [RabbitMQ Message Deduplication Plugin](https://github.com/noxdafox/rabbitmq-message-deduplication): v0.6.2
> - InfluxDB: v2.7.6

You will need to start a few processes.

The preset value of `EVENT_HANDLER_HOST`, `REST_HOST`, and `GATEWAY_HOST` all use localhost. If you are using different servers you will need to change those values

#### Setup process

- Install the dependencies with yarn
- Build the code with `yarn build`

You can start different parts of your bot in the following order.

- Start the REST Proxy: `yarn start:rest`
- Deploy the commands: `node dist/bot/register-commands.js`
- Start the Bot: `yarn start:bot`
- Start Gateway: `yarn start:gateway`

#### InfluxDB

To enable InfluxDB you will need to set the `INFLUX_ORG`, `INFLUX_BUCKET`, `INFLUX_TOKEN`, and `INFLUX_URL` variables in the `.env`. file

For `INFLUX_URL`, the preset value uses localhost. If your InfluxDB is not running on the same machine, change the URL accordingly (do not include any protocol prefix, just `HOST:PORT`)

If you do not set one of the values mentioned above, InfluxDB will be disabled.

#### RabbitMQ

To enable RabbitMQ you will need to set `MESSAGEQUEUE_ENABLE` to `true` and set `MESSAGEQUEUE_URL`, `MESSAGEQUEUE_USERNAME`, and `MESSAGEQUEUE_PASSWORD` variables in the `.env` file.

`MESSAGEQUEUE_USERNAME` and `MESSAGEQUEUE_PASSWORD` will both default to `guest` in a RabbitMQ instance unless changed.

> [!IMPORTANT]
> The [RabbitMQ Message Deduplication Plugin](https://github.com/noxdafox/rabbitmq-message-deduplication) must be installed
>
> The plugin files (`.ez`) are in the `rabbitmq/plugins/message-deduplication` folder. You can copy those into your `plugins` folder for the RabbitMQ installation folder or download them from the original repo (make sure to download the correct version).
>
> To enable the plugin you will need to run: `rabbitmq-plugins enable rabbitmq_message_deduplication`
