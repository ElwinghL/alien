require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const Panic = require("../res/panic.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("panic")
    .setDescription("Rolls the panic dice")
    .addIntegerOption((option) =>
      option
        .setName("stress")
        .setDescription("The stress level")
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(30)
    ),

  async execute(interaction) {
    const emojiList = await interaction.guild.emojis.fetch();
    const stress = interaction.options.getInteger("stress");
    const dice = Math.floor(Math.random() * 6 + 1);

    await interaction.reply({
      content: `${emojiList.find((e) => e.name == `d${dice}`)}`,
      ephemeral: true,
    });
    await interaction.followUp({
      content: `${dice} + ${stress} = ${dice + stress} : ${
        Panic.find(
          ({ range: [start, end] }) =>
            dice + stress <= end && dice + stress >= start
        ).effect
      }`,
      ephemeral: true,
    });

    //Then we send messages on admin channel
    await interaction.guild.channels
      .fetch(process.env.privateChan)
      .then((channel) => {
        channel.send(
          `${interaction.member.displayName} rolled ${emojiList.find(
            (e) => e.name == `d${dice}`
          )} + ${stress} : ${
            Panic.find(
              ({ range: [start, end] }) =>
                dice + stress <= end && dice + stress >= start
            ).effect
          }`
        );
      });
  },
};
