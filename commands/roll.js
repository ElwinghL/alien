const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls the dices")
    .setDescriptionLocalizations({ fr: "Lance les dés" })
    .addIntegerOption((option) =>
      option
        .setName("dices")
        .setNameLocalizations({ fr: "dés" })
        .setDescription("The number of D6 to roll")
        .setDescriptionLocalizations({ fr: "Nombre de D6 a lancer" })
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("stress")
        .setDescription("The current level of stress of the character")
        .setDescriptionLocalizations({
          fr: "Le niveau de stress actuel du personnage",
        })
    ),
  async execute(interaction) {
    const dices = interaction.options.getInteger("dices");
    const stress = interaction.options.getInteger("stress") || 0;
    await interaction.reply("WIP");
  },
};
