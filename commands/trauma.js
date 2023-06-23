require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const Trauma = require("../res/trauma.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trauma")
    .setDescription("Rolls to get a trauma"),

  async execute(interaction) {
    const emojiList = await interaction.guild.emojis.fetch();
    const dice = Math.floor(Math.random() * 6 + 1);

    await interaction.reply({
      content: `${emojiList.find((e) => e.name == `d${dice}`)}`,
      ephemeral: true,
    });
    await interaction.followUp({
      content: `${Trauma[dice]}`,
      ephemeral: true,
    });

    //Then we send messages on admin channel
    await interaction.guild.channels
      .fetch(process.env.privateChan)
      .then((channel) => {
        channel.send(
          `${interaction.member.displayName} rolled ${emojiList.find(
            (e) => e.name == `d${dice}`
          )} : ${Trauma[dice]}`
        );
      });
  },
};
