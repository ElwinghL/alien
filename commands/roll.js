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
    const dices = interaction.options.getInteger("dices");
    const stress = interaction.options.getInteger("stress");

    const normalDices = new Array(dices).fill(undefined).map(() => {
      return Math.floor(Math.random() * 6 + 1);
    });
    const stressDices = new Array(stress).fill(undefined).map(() => {
      return Math.floor(Math.random() * 6 + 1);
    });

    const message = `Tu as roll : ${normalDices
      .map((v) => `:d${v}:`)
      .join("")} et ${stressDices.map((v) => `:d${v}s:`).join("")} `;

    await interaction.reply(message);
  },
};
