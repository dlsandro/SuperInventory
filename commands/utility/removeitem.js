const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { coffre } = require('../../coffre.json');  // Importer l'objet 'coffre'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeitem')
        .setDescription('Supprime un item du coffre')
        .addStringOption(option =>
            option.setName('nom')
                .setDescription('Le nom de l\'item à supprimer')
                .setRequired(true)),

    async execute(interaction) {
        const itemName = interaction.options.getString('nom');

        // Vérifier si l'item existe dans le coffre
        if (!coffre.hasOwnProperty(itemName)) {
            return interaction.reply(`L'item "${itemName}" n'existe pas dans le coffre.`);
        }

        // Supprimer l'item
        delete coffre[itemName];

        // Mettre à jour le fichier JSON
        fs.writeFileSync('./../../coffre.json', JSON.stringify({ coffre }, null, 2));

        // Répondre à l'utilisateur
        await interaction.reply(`L'item "${itemName}" a bien été supprimé du coffre.`);
    },
};
