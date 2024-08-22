const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { coffre } = require('./../../coffre.json');  // Importer l'objet 'coffre'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createitem')
        .setDescription('Crée un item dans le coffre')
        .addStringOption(option =>
            option.setName('nom')
                .setDescription('Le nom de l\'item à créer')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('valeur')
                .setDescription('La valeur initiale de l\'item')
                .setRequired(true)),

    async execute(interaction) {
        const itemName = interaction.options.getString('nom');
        const valeurInitiale = interaction.options.getInteger('valeur');

        // Vérifier si l'item existe déjà
        if (coffre.hasOwnProperty(itemName)) {
            return interaction.reply(`L'item "${itemName}" existe déjà dans le coffre avec une valeur de ${coffre[itemName]}.`);
        }

        // Créer le nouvel item
        coffre[itemName] = valeurInitiale;

        // Mettre à jour le fichier JSON
        fs.writeFileSync('./../../coffre.json', JSON.stringify({ coffre }, null, 2));

        // Répondre à l'utilisateur
        await interaction.reply(`L'item "${itemName}" a bien été créé avec une valeur initiale de ${valeurInitiale}.`);
    },
};