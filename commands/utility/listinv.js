const { SlashCommandBuilder } = require('discord.js');
const { coffre } = require('./../../coffre.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listinv')
		.setDescription('Liste tous les items du coffre'),
	async execute(interaction) {
        // Construire la liste des items avec leurs valeurs
        let itemList = "Voici la liste des items du coffre avec leurs quantités :\n";
        for (const [item, value] of Object.entries(coffre)) {
            itemList += `${item}: ${value}\n`;
        }

        // Répondre à l'utilisateur avec la liste des items
        await interaction.reply(itemList);
    },
};