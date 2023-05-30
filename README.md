# Alien TTRPG Dice Repo

A basic Discord bot to handle the dice throws in the TTRPG in the Alien universe

## Requirements

* Node
* Git

## Common setup

```bash
npm install
```

Then got to the [Discord Development](https://discord.com/developers/applications) page and create an app to get its ClientID and Token and put them in your `.env`.

This bot was made following this [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html), and i invite you to do the same.


## Launch the bot

```bash
npm run launch
```

Or, if you want to control what you do :

```bash
# To update the list of commands on all server your bot is on
node deploy-commands.js
# To launch the bot
node index.js
```
