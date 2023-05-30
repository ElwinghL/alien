const { Events } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  name: Events.GuildCreate,
  once: false,
  async execute(guild) {
    const emojisPath = path.join(__dirname, "../image");
    const emojiFiles = fs
      .readdirSync(emojisPath)
      .filter((file) => file.endsWith(".png"));

    console.log({ emojisPath, emojiFiles });

    for (const file of emojiFiles) {
      const filePath = path.join(emojisPath, file);

      guild.emojis
        .create({ attachment: filePath, name: path.parse(file).name })
        .then((emoji) =>
          console.log(
            `Created new emoji with name ${emoji.name} on ${guild.name}`
          )
        )
        .catch(console.error);
    }
  },
};
