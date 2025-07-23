---
sidebar_position: 4
sidebar_label: Setup .env
---

# How to Set Up a `.env` File with Node.js, Deno or Bun

Each runtime has it's own way of handling the `.env` file, we will see how to do it with Node.js, Deno and Bun

## Setup

Create a `.env` file we will be loading into our runtime environment and add some variables to it in the following format: `VAR_NAME=value`

For example:

```ini
DB_HOST = localhost
DB_USER = admin
DB_PASS = password123
```

## Node.js

### Loading the `.env` file

Now that we created this file we need to load it into the environment variables of the node process, we have 2 alternative

1. Use the build-in `--env-file` option (requires Node.js v20.6+)
1. Use the `dotenv` package

#### --env-file option

You need to update the command line you use for running node with the following **node** option and passing it the file name for the `.env` file, the file is resolved based on the directory you are running node from

Here is an example:

```sh
node --env-file=.env index.js
```

You need to add this flag before the file you want to run also if you have multiple `.env` file you want to include you can add multiple `--env-file`

#### `dotenv` package

If you don't want or can't use the `--env-file` option you can do it with the `dotenv` package

First of all you need to install the `dotenv` package

`npm install dotenv`
_or using yarn, pnpm or bun_

We now need to load the `.env` from our code so let's add the following code to your typescript file:

```ts
import 'dotenv/config'
```

This will import the dotenv module and add all the variables we declared in our `.env` file into the node environment variables

### Use the environment variables

You can now access your environment variables using the `process.env` object. For example:

```ts
const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
```

And that's it! You have now set up a `.env` file in Node.js and can access your environment variables in your code.

## Deno

Deno has a function in the standard library to load the env from a `.env` file so we will use that function to load our `.env` file

### Loading the `.env` file

We first need to import the `load` function from the dotenv module of the standard library and then call it, by doing this it will return us with the environment variables that exited inside the `.env` file.

```ts
import { load } from 'https://deno.land/std@0.212.0/dotenv/mod.ts'

const env = await load()
```

### Use the environment variables

With the return object returned by `load` we can access the environment variables it just obtained. For example:

```ts
const dbHost = env.DB_HOST
const dbUser = env.DB_USER
const dbPass = env.DB_PASS
```

And that's it! You have now set up a `.env` file in Deno and can access your environment variables in your code.

## Bun

Bun automatically detects and load all the `.env` file in the current directory where you run the bun command. Bun actually allows for some configuration of the runtime itself from this `.env` file and some additional options. You can refer to the [Bun documentation](https://bun.sh/docs/runtime/env) to see them

### Loading the `.env` file

We just need to have the `.env` in the same directory as the current directory from where we run the `bun` command.

If you need you can specify one or more `--env-file` options with the path to your .env file if you need it.

### Using the environment variables

Since Bun aims to be a Drop-in replacement for Node.js we can use it's own `Bun.env` object to access the environment variables or just use the `process.env` object to do so.

For example using `Bun.env`:

```ts
const dbHost = Bun.env.DB_HOST
const dbUser = Bun.env.DB_USER
const dbPass = Bun.env.DB_PASS
```

Or using `process.env`:

```ts
const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
```

And that's it! You have now set up a `.env` file in Bun and can access your environment variables in your code.
