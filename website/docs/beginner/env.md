---
sidebar_position: 4
sidebar_label: Setup .env
---

# How to Set Up a .env File with TypeScript in Node.js

## Step 1: Install Required Packages

Before you can set up a `.env` file with TypeScript in Node.js, you need to install the required packages. Run the following command in your project's directory:

`npm install dotenv @types/dotenv --save-dev`

## Step 2: Create a .env File

1. Create a new file named `.env` in the root directory of your project.
2. Add your environment variables to the file in the following format:

VAR_NAME=value

For example:

```js
DB_HOST = localhost
DB_USER = admin
DB_PASS = password123
```

## Step 3: Load Environment Variables

1. In your TypeScript file, import the `dotenv` package:

```ts
import dotenv from 'dotenv'
```

2. Call the config method of the dotenv package to load the environment variables from the .env file:

```ts
dotenv.config()
```

## Step 4: Access Environment Variables

You can now access your environment variables using the process.env object. For example:

```ts
const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
```

And that's it! You have now set up a .env file with TypeScript in Node.js and can access your environment variables in your code.
