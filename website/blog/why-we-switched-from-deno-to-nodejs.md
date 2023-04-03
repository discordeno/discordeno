---
slug: why-we-switched-from-deno-to-nodejs
title: 'From Deno to Node.js: Why We Made the Switch'
authors: [itohatweb, skillz]
tags: [deno, node.js, library]
---

# Our move from Deno to Node.js

As a team, we have recently made the decision to move away from Deno and migrate to Node.js. This was not a decision we made lightly, but rather one that was based on several factors.

## Deno's Broken Promises: Why we had to make the switch

One of the primary reasons we decided to make the switch was because we found that Deno had become a worse version of Node.js.
While Deno promised to be more secure, simpler to use, and more modern than Node.js, we found that it fell short on some of their promises.

Deno started to feel like a worse version of Node.js.
Initially, Deno was seen as a promising alternative to Node.js, but we found that it was ditching many of its principles.
For example, Deno initially didn't support configs or package.json, but now it does.
Additionally, they never wanted to support npm modules, but they have now added that support.
The same applies to the fact that imports were only allowed via relative or absolute URLs.

## Technical Issues with Deno: Difficulties in installation and usage

In addition, our team members were facing difficulties installing Deno on their machines.
Some of them spent hours trying to figure out why they couldn't install it, and it ended up being a major blocker for them.
On the other hand, Node.JS is well-established and easy to install.

Another issue we faced was with the Deno LSP. It would use 100% of the CPU for no apparent reason, making it unusable. Additionally, the VSCode extension for Deno had some wonky problems, making it a frustrating experience to use.

One other issue we encountered with Deno was with its formatter.
We found that it was quite inconsistent in its formatting, making it difficult to achieve a consistent codebase.
In some cases, it would add unnecessary changes to every file, even if the code was already properly formatted.
For instance, we had a recent PR where half of the changes were just from deno fmt, even though the code was already properly formatted.
This inconsistency in formatting made it frustrating to use, and we often found ourselves spending more time trying to fix the formatting than actually writing code.

## Our Focus on Efficiency and Scalability: Moving forward with Node.js

As a result of these issues, we have decided to move to Node.js.
While we understand that this may come as a surprise to some of our users, we believe that this decision is in the best interest of our community.

Moving forward, our main objective with the library remains the same - to deliver the same level of efficiency and scalability that was achieved with the Deno version.
However, we have decided to transition our focus towards Node.js to take advantage of its vast ecosystem and stability.
Discordeno will remain a runtime-agnostic library functioning in any javascript runtime including Deno.

## Our commitment to providing a reliable library for our users

We understand that this decision may not be popular with everyone, but we believe that it is the right decision for the future of our project.
We are confident that the library will continue to provide the same level of quality and reliability that our users have come to expect from us.
