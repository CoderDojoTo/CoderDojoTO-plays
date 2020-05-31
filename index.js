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
  const command = message.toLowerCase();

  if (command.includes("!poll")) {
    pollCommand(channel, tags, message);
  } else if (command.includes("!project")) {
    projectCommand(channel, tags, message);
  } else if (command === "!dice") {
    diceCommand(channel, tags);
  }
});

let pollLink;
let projectLink;

const followersCommand = (channel, tags) => {
  const coderDojoTOID = 501645429;
  client.api(
    {
      url: `https://api.twitch.tv/kraken/users/follows?to_id=${coderDojoTOID}`,
      method: "GET",
      headers: {
        Accept: "application/vnd.twitchtv.v5+json",
        Authorization: `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`,
        "Client-ID": process.env.TWITCH_CLIENT_ID,
      },
    },
    (err, res, body) => {
      if (body.status !== 200) {
        return;
      }

      const user = body.data.find((userData) => {
        return userData["from_name"] === tags.username;
      });

      if (user) {
        client.say(
          channel,
          `${tags.username} have been following since ${user["followed_at"]}`
        );
      } else {
        client.say("You haven't followed this account yet. You should follow!");
      }
    }
  );
};

const diceCommand = (channel, tags) => {
  const roll = Math.floor(Math.random() * 20 + 1);

  client.say(channel, `${tags.username} rolled a ${roll}`);
};

const pollCommand = (channel, tags, message) => {
  if (tags.username === "coderdojoto") {
    pollLink = message.split(" ")[1];

    client.say(channel, `Poll link has been set to ${pollLink}`);
  } else if (pollLink) {
    client.say(channel, pollLink);
  } else {
    client.say(channel, "The poll link has not been set");
  }
};

const projectCommand = (channel, tags, message) => {
  if (tags.username === "coderdojoto") {
    projectLink = message.split(" ")[1];

    client.say(channel, `Project link has been set to ${projectLink}`);
  } else if (projectLink) {
    client.say(channel, projectLink);
  } else {
    client.say(channel, "The project link has not been set");
  }
};
