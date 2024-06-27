# Discordeno Bot Templates

In this directory you will find some example bots written using Discordeno.

In each template directory you will find more information on how to setup and run the template.

## Minimal & Beginner

A very minimal bot with only a /ping command to show how to set-up a discordeno bot for interactions

The beginner template is a bit more complete and has a caching system already setup using the `dd-cache-proxy` library

## Advanced

A more complex bot compared to beginner. It also has a /ping command, but also a /warn command showing how to deal with permissions and sending DMs

This template has a caching system already setup using the `dd-cache-proxy` library

## BigBot

![Log Image](https://i.imgur.com/09skKfz.png)

The BigBot template is intended for more complex systems that need scaling.

The template consists of 3 folders with some common files. The template is configured with a REST proxy, the Gateway in a separate process and the Bot code in another.

While the template does not include any caching by default, you can either install `dd-cache-proxy` and setup it or roll your own solution
