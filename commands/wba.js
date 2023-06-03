require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const Alien = require("../res/alien.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wba")
    .setDescription("Rolls the dice to a specific alien wound")
    .addStringOption((option) =>
      option
        .setName("alien")
        .setDescription("What kind of alien is attacking")
        .setRequired(true)
        .addChoices(
          ...Object.keys(Alien).map((v, i) => {
            return { name: v, value: v };
          })
        )
    ),
  async execute(interaction) {
    const emojiList = await interaction.guild.emojis.fetch();

    const dice = Math.floor(Math.random() * 6 + 1);
    const alienName = interaction.options.getString("alien");
    const effect = Alien[alienName].find(
      ({ range: [start, end] }) => dice <= end && dice >= start
    ).effect;

    await interaction.reply({
      content: `${emojiList.find((e) => e.name == `d${dice}`)}`,
      ephemeral: true,
    });
    await interaction.followUp({
      content: `${effect}`,
      ephemeral: true,
    });

    //Then we send messages on admin channel
    await interaction.guild.channels
      .fetch(process.env.privateChan)
      .then((channel) => {
        channel.send(
          `${alienName} ${emojiList.find(
            (e) => e.name == `d${dice}`
          )} : ${effect}`
        );
      });
  },
};
