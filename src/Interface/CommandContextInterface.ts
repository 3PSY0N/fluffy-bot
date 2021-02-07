import {
  Channel, Client, Guild, User,
} from 'discord.js';

export interface CommandContextInterface {
  user?: User;
  server?: Guild;
  client?: Client;
  channel?: Channel;
  [key: string]: any;
}
