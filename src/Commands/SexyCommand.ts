import {
  DMChannel, Message, MessageEmbed, NewsChannel,
} from 'discord.js';
import fetch from 'node-fetch';
import { BaseCommandInterface } from '../Interface/BaseCommandInterface';
import { CommandContextInterface } from '../Interface/CommandContextInterface';

export default class SexyCommand implements BaseCommandInterface {
  name = 'Sexy';

  description = 'Hentai'

  async execute({ client }: CommandContextInterface, message: Message, args: string[]): Promise<void> {
    if (message.channel instanceof DMChannel) return;
    if (message.channel instanceof NewsChannel) return;

    if (!args || !args[0]) {
      await message.channel.send(
        new MessageEmbed()
          .setColor('GREEN')
          .addField('Catégories disponibles', 'ass, bdsm, blowjob, cum, doujin, feet, femdom, foxgirl, gifs, glasses, hentai, netorare, loli, malid, masturbation, orgy, panties, pussy, school, tentacles, thights, uniform, yuri')
          .setFooter(`Commande exécutée par ${message.author.username}`),
      );
      return;
    }

    if (!message.channel.name.includes('hentai')) {
      await message.channel.send(
        new MessageEmbed()
          .setColor('RED')
          .addField('Erreur', 'Cette commande ne peut être executée uniquement dans un canal *-hentai')
          .setFooter(`Commande exécutée par ${message.author.username}`),
      );
      return;
    }

    const formattedUrl = `https://akaneko-api.herokuapp.com/api/${args[0]}`;
    const url = await (await fetch(formattedUrl)).json();
    if (!message.channel.nsfw) {
      await message.channel.send(
        new MessageEmbed()
          .setColor('RED')
          .addField('Erreur', 'Vous devez être dans un canal NSFW pour utiliser cette commande, petit coquin.')
          .setFooter(`Commande exécutée par ${message.author.username}`),
      );
    } else {
      await message.channel.send(
        new MessageEmbed()
          .setColor('GREEN')
          .setImage(url.url)
          .setFooter(`Commande exécutée par ${message.author.username}`),
      );
    }
  }
}
