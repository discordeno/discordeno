await fetch("http://localhost:8000/", {
  method: "POST",
  body: JSON.stringify({ "test": true }),
  headers: {
    "Content-Type": "application/json",
    "sec-websocket-key": "fijowiqu2ofw",
    "upgrade": "websocket",
    "connection": "Upgrade",
  },
}).then(console.log).catch(console.error);

setInterval(() => {}, 10000);
