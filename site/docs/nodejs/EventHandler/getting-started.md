---
sidebar_position: 1
---
# Getting Started with a Event Handler:
An EventHandler is essential to process the data, which Discord has sent. 

With a good implementation, you can introduce a nice structure in the code and thus have a good overview in long term. 

You probably know the EventEmitter from other libraries, since they are also used in many other libraries in general. 

Discordeno decided against it as it comes with some downsides which are mentioned below. 

The performance had a more important role than the handling, however, the EventManager system can be easily implemented since it only needs a few changes in the code.

* Event listeners often create memory leaks that are difficult to debug 
* Errors can only be found with difficulty because event-listeners often bind many functions to themselves (e.g: Listen on the same Event with different Functions)
* Lots of fragmented pieces of event code making maintaibility more difficult.

In the following we will show you, how to create a EventHandler/Manager, which is compitable with Discordeno's Client.

Head on to the Page `Event-Manager` to see how to create a EventManager.