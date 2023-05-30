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
    )
    .addBooleanOption((option) =>
      option
        .setName("secret")
        .setDescription("Do you want this message to be private ?")
        .setRequired(false)
    ),

  async execute(interaction) {
    const emojiList = await interaction.guild.emojis.fetch();
    const stress = interaction.options.getInteger("stress");
    const secret = interaction.options.getBoolean("secret") || false;
    const dice = Math.floor(Math.random() * 6 + 1);

    await interaction.reply({
      content: `${emojiList.find((e) => e.name == `d${dice}`)}`,
      ephemeral: secret,
    });
    await interaction.followUp({
      content: `${dice} + ${stress} = ${dice + stress} : ${
        Panic.find(
          ({ range: [start, end] }) =>
            dice + stress <= end && dice + stress >= start
        ).effect
      }`,
      ephemeral: secret,
    });
  },
};
