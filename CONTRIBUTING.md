# Fundamental Design Goals

This document serves to outline the overall design goals of the project. Please see below a list of these fundamentals.

## Do not allow anything Discord does not permit
Prevent any and all attempts of making user bots. If someone connects and the client.user is not a bot user then throw an error immediately.

Do not support non-bot features like Group DMs or dm calls etc...

## Prettier Philosophy Regarding Options

Avoid options/customizable whenever possible. Always enforce default values. Except in cases like intents where the user should be able to pick which intents to listen for.

## Security

Permission checks should be done by the library! We can throw a custom error that shows which permissions are missing in order to run this request and save an API call. This will also prevent bots from getting banned due to Missing Access errors.

Typescript 3.8 provides **TRUE** private props and methods that no one can access. We will use this to our advantage to truly make a proper API. This isn't a silly `_` to mark it as a private but the user should NEVER be able to access it no matter what.

## Functional API

Events emitted by the client, for example the message creation event, should not emit a `Message` class instance, but instead a *POJO* (Plain Ol' JavaScript Object). This will overall make a cleaner and more performant API, while removing the headaches of extending built-in classes, and inheritance.

Use functions when possible instead of an event emitter to prevent emitter related memory leak issues or a number of other headaches that arise.

TLDR: Avoid `classes` whenever possible. Avoid `loops` whenever possible(opt for iterations like .forEach, map reduce, some find etc...)

## Documentation

Use `/** Description here */` comments above all properties and methods to describe it so that VSC and other good IDE's with intellisense can pick it up and provide the documentation right inside the IDE preventing a developer from needing Discord API docs or even Deno documentation.

We should have a step by step guide nonetheless but this is a POST v1 launch.
We should have a template repo to creating a boilerplate bot. 

## Backwards Compatibility BS

Backwards compatibility is the death of code. It causes clutter and uglyness to pile up and makes developers lazier. There will be no such thing as backwards compatibility reasons in Discordeno. We will always support the latest and greatest of JS. The end! Users can fork the lib at any commit to keep older versions until they are ready to update.

That said, we don't expect many things to be changing drastically after v1. As you can imagine Typescript allows the latest and greatest of JS so we will be ahead of the curve for years to come.

## Style Guide

Prettier is our style guide. No discussions around styling ever. The options are set and that is all. When you code let prettier handle the styling. PERIOD!
