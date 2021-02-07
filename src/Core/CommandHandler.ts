import fs from 'fs';
import { Message } from 'discord.js';
import { BaseCommandInterface } from '../Interface/BaseCommandInterface';

export default class CommandHandler {
  private static instance: CommandHandler;

  private classCommands: Array<BaseCommandInterface> = [];

  private settings: {prefix: string};

  private constructor(settings: {prefix: string}) {
    this.settings = settings;
  }

  /**
   * Loading and instantiation of command files
   * @author Mishaa <mishapro@mm.st>
   * @private
   */
  private async loadFiles(): Promise<Array<BaseCommandInterface>> {
    const files: Array<string> = fs.readdirSync('./dist/Commands/').filter((file) => file.endsWith('.js'));
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const commandClass = await import(`./../Commands/${file}`);
      const className = Object.keys(commandClass)[0];
      const instance: BaseCommandInterface = new commandClass[className]();
      console.log(`[CommandHandler] Instantiation of ${instance.name} command from ${file}`);
      this.classCommands.push(instance);
    }
    return this.classCommands;
  }

  /**
   * Return a command from his name
   *
   * Warning, prefix is not extracted, format message.content before using this
   * @param {string|undefined} name - The name of the command
   * @author Mishaa <mishapro@mm.st>
   */
  public getCommandFromName<T>(name: string): BaseCommandInterface | undefined | T {
    return this.classCommands.find((command) => command.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Match command from registered commands and execute it.
   *
   * Args and prefix of the command are automatically extracted and formatted
   * @param {Message} message - The message of the event
   * @param commandContext - Arguments which will be passed in the commandContext
   * @author Mishaa <mishapro@mm.st>
   * @example
   *
   * eventManager.bindEvent('message', (message: Message) // Message.content = ping
   * => commandHandler.matchCommandFromEvent(message));
   * // If a command named ping has been loaded, the command will be executed
   */
  public matchCommandFromEvent(message: Message, commandContext: Record<string, any> = {}): void {
    if (message.author.bot || !message.content.toLowerCase().startsWith(this.settings.prefix)) {
      return;
    }
    const commandArgs: Array<string> = message.content.slice(this.settings.prefix.length).trim().split(/ +/);
    const command: string | undefined = commandArgs.shift()?.toLowerCase();
    if (!command) return;
    this.getCommandFromName<BaseCommandInterface>(command)?.execute({
      client: message.client,
      ...commandContext,
    }, message, commandArgs);
  }

  /**
   * Get the instance of CommandHandler and load commands from Commands folder
   * @param {object} settings
   * @author Mishaa <mishapro@mm.st>
   */
  public static async getInstance(settings: {prefix: string}): Promise<CommandHandler> {
    if (!CommandHandler.instance) {
      CommandHandler.instance = new CommandHandler(settings);
      await CommandHandler.instance.loadFiles();
    }
    return CommandHandler.instance;
  }
}
