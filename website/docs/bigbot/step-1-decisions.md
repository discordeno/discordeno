---
sidebar_position: 2
sidebar_label: Step 1 - Decisions
---

# Decisions To Make Before Continuing

This guide is going to skip the basics as it expects you to have the ability to make these key decisions.

## Choose A Runtime

Discordeno supports several platforms including Node.JS, Bun, and Deno. This means you get to make the fun decision of choosing which runtime to go with. As my personal recommendation at the time of writing this guide, I would highly recommend you chose Node.JS

This guide will proceed with Node.JS but you should apply the same concepts in your own runtime. Should you need help with another runtime, please contact us on [Discord](https://discord.gg/ddeno).

## Choose A Communication System

One of the main things to decide, is how you will communicate across your separated processes. Some developers like to use Redis Pub/Sub, some prefer RabbitMQ. There are too many systems available to cover in this guide so we will be simply opting for one solution at this time - HTTP Requests. You should look to optimize this for your specific bot, as this is a critical bottleneck in handling events.
