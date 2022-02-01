# Hosting Your Bot Online 24/7!

Once you feel that you are ready to get your bot to stay online 24/7, follow the
guide below. This guide, is going to use
[Hyper Expert](https://p.hyper.expert/aff.php?aff=125) as our hosting provider.
You can use any you wish, but I recommend using
[Hyper Expert](https://p.hyper.expert/aff.php?aff=125) for the following
reasons.

- I host all my bots on it. That's currently 6 bots with over 2 million users
  and 10K servers. They could grow to another 3-5 times their current size
  without issues.
- Launch a high performance server in seconds.
- One of the cheapest VPS options, I have ever seen!
- The best part in my opinion is: **They have a Discord Server where you can get
  help if you need help with hosting your bot!!!**

## Local Computer 24/7

If you have a computer that you can keep running 24/7, you can actually run the
bot on it. Just use the PM2 module to run the bot in the background.

## Virtual Private Server

For most people, this is where you are going to want to be.

### Buying The VPS

Go to the [Hyper Expert Website](https://p.hyper.expert/aff.php?aff=125) and get
a VPS of your choice. Depending on your needs, you can choose a larger more
powerful VPS, but I recommend starting out with the base model and then raise it
when you need to.

### Setting Up The VPS

Once your ready and logged into the server, the first thing you should do is
change your password!

```shell
sudo passwd
```

Enter the password twice and make sure you do not forget this password. Save it
somewhere safe!

Next, let's make sure you have the latest updates on your server so all bug
fixes and features are available for your server.

```shell
sudo apt update && sudo apt upgrade -y
```

In case there is some bug that let's someone access your machine, you always
want to have an extra layer of protection. So let's create a separate user on
your server where your bot will be.

```shell
adduser [USERNAME]
```

You will be prompted to enter a password. Use a different password for this for
increased security. Save this password as well!

Once your user has been created, you now should give this user sudo powers so it
can do everything your root access could.

```shell
usermod -aG sudo [USERNAME]
```

Now let's install the required stuff for our bot. The following command will
install Deno to your server.

```shell
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Now that we have Deno installed let's install Denon which will keep the process
running even after you log out or close your VPS terminal. For Node.JS devs,
Denon is like Nodemon/PM2 for Deno.

```shell
deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon/denon.ts
```

Once, that is done you can simply run the bot.

```shell
denon run --allow-net --allow-read --no-check mod.ts
```
