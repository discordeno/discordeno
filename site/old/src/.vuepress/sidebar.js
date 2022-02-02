module.exports = {
  "/": [
    {
      title: "Home",
      children: ["/", "faq", "gettingstarted", "migrating"],
    },
    {
      title: "Big Bots Guide",
      children: [
        "/bigbots/",
        "/bigbots/rest",
        "/bigbots/gateway",
        "/bigbots/cache",
        "/bigbots/events",
      ],
    },
    {
      title: "Step By Step Guide",
      children: [
        "/stepbystep/",
        "/stepbystep/createbot",
        "/stepbystep/createcommand",
        "/stepbystep/createevent",
        "/stepbystep/createlanguage",
        "/stepbystep/createmonitor",
        "/stepbystep/createinhibitor",
        "/stepbystep/createtask",
        "/stepbystep/hostingbot",
      ],
    },
    {
      title: "Advanced Guide",
      children: [
        "/advanced/",
        "/advanced/arguments",
        "/advanced/collectors",
        "/advanced/customizations",
        "/advanced/dockerhosting",
        "/advanced/dynamiccommands",
        "/advanced/permlevels",
        "/advanced/subcommands",
      ],
    },
  ],
};
