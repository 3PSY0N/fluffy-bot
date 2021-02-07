import 'reflect-metadata';
import Discord, { Message } from 'discord.js';
import dotenv from 'dotenv';
import ConfigManagerFactory from './Core/ConfigManagerFactory';
import ConfigManager from './Core/ConfigManager';
import EventHandlerManager from './Core/EventHandlerManager';
import CommandHandler from './Core/CommandHandler';

dotenv.config();
const app = async () => {
  const client: Discord.Client = new Discord.Client();
  const configManager: ConfigManager = ConfigManagerFactory.create({
    token: process.env.BOT_TOKEN,
  });
  const eventManager: EventHandlerManager = new EventHandlerManager(client);
  const commandHandler = await CommandHandler.getInstance({ prefix: '.' });
  eventManager.bindEvent('message', (message: Message) => commandHandler.matchCommandFromEvent(message));

  eventManager.register();
  await client.login(configManager.get<string>('token'));
};
app();
