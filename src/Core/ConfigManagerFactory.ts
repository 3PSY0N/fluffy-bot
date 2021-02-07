import ConfigManager from './ConfigManager';
import { ConfigManagerInterface } from '../Interface/ConfigManagerInterface';

export default class ConfigManagerFactory {
  /**
   * Create new instance of ConfigManager
   * @param {ConfigManagerInterface} config
   * @author Mishaa <mishapro@mm.st>
   */
  static create(config: ConfigManagerInterface): ConfigManager {
    return new ConfigManager(config);
  }
}
