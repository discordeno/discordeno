---
sidebar_position: 4
---

# Step 4 - Project Structure

Although the previous page's method of creating a bot is available, it isn't the greatest, as we only have one large file. This is okay for extremely simple bots, but becomes very hard to maintain as you add more commands. We can fix this by defining all our event handlers in separate files. To do this, we'll create an `src/` directory, as well as other directories and files within it.

Let's create the following project structure. Items that end with a `/` are directories. Don't worry about the contents of those files, we'll go over them in a second.:

```diff
 /
+  src/
+    events/
+      mod.ts
+      interactionCreate.ts
+      ready.ts
+      guildCreate.ts
+    commands/
+      mod.ts
+      user/
+        ping.ts
+      dev/
+        reload.ts
   mod.ts
+  deps.ts
   .gitignore
   .env
```

## `deps.ts`

Deno uses ES6 import syntax; to make sure we use the same version of all of our project dependencies, we can define them in a file like `deps.ts`. Like so:

```typescript title="deps.ts"
export * from "https://deno.land/x/discordeno@v13.0.0-rc45/mod.ts";
export { config as dotEnvConfig } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

```

And changing our imports:

```typescript title="mod.ts"
// Before
import { createBot, GatewayIntents, startBot } from "https://deno.land/x/discordeno@v13.0.0-rc45/mod.ts";
import { config as dotEnvConfig } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

// After
import { dotEnvConfig, createBot, GatewayIntents, startBot } from "./deps.ts";
```
