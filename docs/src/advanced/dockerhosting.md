# Docker Hosting

Docker is an open platform for developing, shipping, and running applications.
Docker enables you to separate your applications from your infrastructure so you
can deliver software quickly. With Docker, you can manage your infrastructure in
the same ways you manage your applications. By taking advantage of Docker’s
methodologies for shipping, testing, and deploying code quickly, you can
significantly reduce the delay between writing code and running it in
production.

Learn more [here](https://docs.docker.com/get-started/)

### Installing Docker

Installing Docker is very simple and supported on nearly every major operating
system! Just follow the instructions [here](https://docs.docker.com/get-docker/)
to get started.

### Building The Bot's Docker Image

Now it is time to build the image that will be running the bot! Simply run this
command, replacing `IMAGE_NAME` with whatever you want to name the image. Make
sure to run this command from the root of the bot directory! This command could
take a while depending on how powerful your device is.

```bash
docker build -t IMAGE_NAME .
```

### Running The Bot For The First Time

With the bot's image built, it is time to create a container and run the bot for
the first time! Remember to replace `IMAGE_NAME` with the same name you chose in
the last step, and replace `CONTAINER_NAME` with what you want to name the
container. (RECOMMENDATION: Name the container with the name of your bot)

```bash
docker run -it --init -v $PWD:/bot --name CONTAINER_NAME IMAGE_NAME
```

This command should create a new container linked to the directory containing
your bot's code. Once your bot finishes loading, you should be able to use the
bot just like normal.

### Starting, Stopping, And Restarting The Bot

Now that the container is created, you should only need three main commands to
manage the bot. Remember to replace CONTAINER_NAME with whatever you chose in
the last step.

```bash
docker start CONTAINER_NAME
```

```bash
docker stop CONTAINER_NAME
```

```bash
docker restart CONTAINER_NAME
```
