# RabbitMQ

This template has been tested using RabbitMQ v3.12.14 (Erlang v26.2.5)

## Plugins

The template needs the [rabbitmq_message_deduplication](https://github.com/noxdafox/rabbitmq-message-deduplication) plugin.

This template has been tested with version v0.6.2 of said plugin. The `.ez` files are already in the `message-deduplication` folder, but you can re-download them from the original repository if there is the need to do so/you want to

To enable the plugin you will need to run the following command:

```sh
rabbitmq-plugins enable rabbitmq_message_deduplication
```

> [!NOTE]
> You may need to prefix the command with `sudo` under Unix based on your RabbitMQ setup/current shell permissions
