const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setNameLocalizations({ fr: "roll" })
    .setDescription("Rolls the dices")
    .addIntegerOption((option) =>
      option
        .setName("dices")
        .setDescription("The number of D6 to roll")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("stress")
        .setDescription("The current level of stress of the character")
        .setRequired(true)
        .setMinValue(0)
    ),
  async execute(interaction) {
    const emojiList = await interaction.guild.emojis.fetch();

    const dices = interaction.options.getInteger("dices");
    const stress = interaction.options.getInteger("stress");

    const normalDices = new Array(dices).fill(undefined).map(() => {
      return Math.floor(Math.random() * 6 + 1);
    });
    const stressDices = new Array(stress).fill(undefined).map(() => {
      return Math.floor(Math.random() * 6 + 1);
    });

    let message = `${normalDices
      .map((v) => emojiList.find((e) => e.name == `d${v}`))
      .join("")}\n${stressDices
      .map((v) => emojiList.find((e) => e.name == `d${v}s`))
      .join("")}\n`;
    const fails = stressDices.filter((r) => r == 1).length;
    if (fails >= 1) message += `Oh non... Tu paniques !`;
    else
      message += `Tu as ${
        [...normalDices, ...stressDices].filter((r) => r == 6).length
      } réussites !`;

    await interaction.reply(message);
  },
};
