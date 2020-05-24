# CoderDojoTO Twitch Chat-bot

## Resources

This project requires you to use several different programs like `node` and `git`. It may be your first time using these, so to help get you started, you can use these resources:

- learnyounode (https://github.com/workshopper/learnyounode) - A Node JS package that helps you learn how to make applications using Node.
- Github Labs (https://lab.github.com/) - A website that walks you through using `git` and GitHub.

## Setting Up Your Environment

- You may want to install a package manager to help you download the programs you need for this project. I like Homebrew (https://brew.sh/). Follow the setup instructions to download and install it from your terminal program (I like to use iTerm2: https://www.iterm2.com/)
- Next, you will need to install Node. If you downloaded and installed brew, you can run `brew install node`. Check that node has been installed properly by running `node --version`
- You may also want to install a code editor. It doesn't matter which one you like to use, any will work. I like Visual Studio Code (https://code.visualstudio.com/), but Atom or another will work fine.
- Once you download this code using `git clone` or the download link. Install the Node packages you need by running `npm install`

## Setting up your .env file

This project uses a package called `dotenv` in order to prevent accidentally sharing sensitive information. As a rule, you should never share your password or any "API" or "secret" keys you might use in a program. If someone got their hands on these, they could mess around with your Twitch account without your permission. To use these secrets safely, follow these steps:

- First, you'll need to make a `.env` file. Note, this file starts with a `.`. That's important! If you are using a code editor like VS Code, you can create a new file from your file system sidebar. You can also do this with your terminal tool by navigating to this project folder and running the command `touch .env`
- Our program uses three secret values (we call these "environment variables") `TWITCH_USERNAME` which is the username for the Twitch account you want the bot to use, `TWITCH_CHANNEL_NAME` which is the Twitch channel you want your bot to listen to and `TWITCH_OAUTH_TOKEN` which is a secret value kind of like a password that lets your bot access your Twitch account for a certain amount of time.
- Inside your new `.env` file, you want to write these three environment variables like this:

```
TWITCH_USERNAME=
TWITCH_CHANNEL=
TWITCH_OAUTH_TOKEN=
```

- After each `=` you want to put these values. For example, I use `CHANNEL_NAME=coderdojoto` because I want my bot to post in my `coderdojoto` Twitch stream.
- The `TWITCH_OAUTH_TOKEN` is special, here you will want to visit this address: https://twitchapps.com/tmi/ and log in with the account you want your bot to use. Copy this key and place it after `TWITCH_OAUTH_TOKEN=`
- In order to use the `!followers` command we need to access the Twitch API, that means creating a Twitch developer account and registering an application. You'll need to complete "Step One" from this guide: https://dev.twitch.tv/docs/api
- Once you've created your own Twitch application, copy the Client Id found in the "Console" menu and add it to your `.env` file using `TWITCH_CLIENT_ID=`

![Twitch Developer Console Screen](/images/twitch-application.png)

## Running the Application

Once you have set up your `.env` file, you can run the `node index.js` from your terminal to start your server up! You should see some output on your console like this:

```
[21:17] info: Connecting to irc-ws.chat.twitch.tv on port 443..
[21:17] info: Sending authentication to server..
[21:17] info: Connected to server.
[21:17] info: Executing command: JOIN #coderdojoto
[21:17] info: Joined #coderdojoto
```
