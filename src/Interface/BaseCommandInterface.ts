import { CommandContextInterface } from './CommandContextInterface';

export interface BaseCommandInterface {
  new?(...args: any[]): any;
  name: string;
  description?: string;
  syntax?: string;
  timeToLeave?: number;
  cooldown?: number;
  execute: (commandContext: CommandContextInterface, ...args: any[]) => any;
  guard?: (commandContext: CommandContextInterface) => boolean
}
