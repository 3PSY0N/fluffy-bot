import { ConfigManagerInterface } from '../Interface/ConfigManagerInterface';

export default class ConfigManager {
  private readonly configuration: ConfigManagerInterface;

  constructor(configuration: ConfigManagerInterface) {
    this.configuration = configuration;
  }

  /**
   * Get an item from the configuration
   * @param {string} key
   * @author Mishaa <mishapro@mm.st>
   */
  get<T>(key: string): T {
    return this.configuration[key] || undefined;
  }
}
