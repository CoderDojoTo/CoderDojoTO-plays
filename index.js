require("dotenv").config();
const tmi = require("tmi.js");
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels: [process.env.TWITCH_CHANNEL],
});
client.connect();
client.on("message", (channel, tags, message, self) => {
  if (self) return;
  if (message.toLowerCase() === "!followers") {
    const coderDojoTOID = 501645429;
    client.api(
      {
        url: `https://api.twitch.tv/helix/users/follows?to_id=${coderDojoTOID}`,
        method: "GET",
        headers: {
          Accept: "application/vnd.twitchtv.v5+json",
          Authorization: `OAuth ${process.env.TWITCH_OAUTH_TOKEN}`,
          "Client-ID": process.env.TWITCH_CLIENT_ID,
        },
      },
      (err, res, body) => {
        const user = body.data.find((userData) => {
          return userData["from_name"] === tags.username;
        });

        if (user) {
          client.say(
            channel,
            `${tags.username} have been following since ${user["followed_at"]}`
          );
        }
      }
    );
  }
});
