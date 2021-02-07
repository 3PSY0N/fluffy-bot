import { Message, MessageEmbed } from 'discord.js';
import { BaseCommandInterface } from '../Interface/BaseCommandInterface';
import { CommandContextInterface } from '../Interface/CommandContextInterface';

export default class PingCommand implements BaseCommandInterface {
  name = 'Ping';

  description = 'Permet de vérifier si le bot fonctionne'

  execute({ client }: CommandContextInterface, message: Message): Promise<Message> {
    return message.channel.send(
      new MessageEmbed()
        .setColor('GREEN')
        .addField('Pong', `La latence de l'api discord est de **${Math.round(client?.ws.ping || 0)} ms**`)
        .setFooter(`Commande exécutée par ${message.author.username}`),
    );
  }
}
