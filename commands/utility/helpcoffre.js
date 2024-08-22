const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('helpcoffre')
        .setDescription('Affiche la liste des commandes disponibles'),

        async execute(interaction) {
            // Définir les descriptions des commandes
            const commands = [
                {
                    name: 'listinv',
                    description: 'Liste tous les items du coffre',
                    options: []
                },
                {
                    name: 'additem',
                    description: 'Ajoute une valeur à l\'item spécifié',
                    options: [
                        { name: 'nom', description: 'Le nom de l\'item à modifier' },
                        { name: 'valeur', description: 'La valeur à ajouter à l\'item' }
                    ]
                },
                {
                    name: 'createitem',
                    description: 'Crée un item dans le coffre',
                    options: [
                        { name: 'nom', description: 'Le nom de l\'item à créer' },
                        { name: 'valeur', description: 'La valeur initiale de l\'item' }
                    ]
                },
                {
                    name: 'removeitem',
                    description: 'Supprime un item du coffre',
                    options: [
                        { name: 'nom', description: 'Le nom de l\'item à supprimer' }
                    ]
                }
            ];
    
            // Construire la réponse avec la liste des commandes
            let helpMessage = '```Voici la liste des commandes disponibles :\n\n';
            commands.forEach(command => {
                helpMessage += `/${command.name}: ${command.description}\n`;
                if (command.options.length > 0) {
                    command.options.forEach(option => {
                        helpMessage += `- ${option.name}: ${option.description}\n`;
                    });
                }
                helpMessage += '\n';
            });
            helpMessage += '\n```';
    
            // Répondre à l'utilisateur
            await interaction.reply(helpMessage);   
    },
};