const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');	
const { coffre } = require('../../coffre.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edititem')
        .setDescription('Modifier la valeur à l\'item spécifié')
        .addStringOption(option => 
            option.setName('nom')
                .setDescription('Le nom de l\'item à modifier')
                .setRequired(true))
        .addIntegerOption(option => 
            option.setName('valeur')
                .setDescription('La valeur à ajouter à l\'item')
                .setRequired(true)),

    async execute(interaction) {
        const itemName = interaction.options.getString('nom');
        const valeurAjoutee = interaction.options.getInteger('valeur');

        // Vérifier si l'item existe dans le coffre
        if (coffre.hasOwnProperty(itemName)) {
            // Empêcher la valeur de descendre en dessous de zéro
            const nouvelleValeur = coffre[itemName] + valeurAjoutee;
            if (nouvelleValeur < 0) {
                return interaction.reply(`L'ajout de ${valeurAjoutee} à l'item ${itemName} ferait tomber sa valeur en dessous de zéro. Opération annulée.`);
            }
            // Ajouter la valeur à l'item
            coffre[itemName] += valeurAjoutee;
            
            // Mettre à jour le fichier JSON
            fs.writeFileSync('./../../coffre.json', JSON.stringify({ coffre }, null, 2));

            // Répondre à l'utilisateur
            await interaction.reply(`Vous avez bien modifié l'item.\nL'item ${itemName} est maintenant égal à ${coffre[itemName]}.`);
        } else {
            await interaction.reply(`L'item "${itemName}" n'existe pas dans le coffre.`);
        }
    },
};
