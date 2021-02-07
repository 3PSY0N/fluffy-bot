import { Client, ClientEvents } from 'discord.js';

interface EventMapped {
  clientEvent: keyof ClientEvents;
  callback: (...args: any[]) => void;
}

export default class EventHandlerManager {
  private readonly eventsMapped: Array<EventMapped> = [];

  private hasBeenRegistered = false;

  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Bind an event to the discord client
   * @param {ClientEvents} clientEvent - The discord event
   * @param {function} callback - The callback which will be executed when the event is call
   * @author Mishaa <mishapro@mm.st>
   * @return void
   */
  bindEvent(clientEvent: keyof ClientEvents, callback: (...args: any[]) => void): void {
    this.eventsMapped.push({ clientEvent, callback });
  }

  /**
   * Bind multiples event to the discord client
   * @param {ClientEvents} clientEvents - An array of objet of EventMapped
   * @author Mishaa <mishapro@mm.st>
   * @return void
   */
  bindEvents(clientEvents: EventMapped[]): void {
    clientEvents.forEach((event: EventMapped) => {
      this.eventsMapped.push({
        clientEvent: event.clientEvent,
        callback: event.callback,
      });
    });
  }

  /**
   * Return an array of currently mapped events
   * @return {EventMapped[]}
   * @author Mishaa <mishapro@mm.st>
   */
  getBindEvents(): Array<EventMapped> {
    return this.eventsMapped;
  }

  /**
   * Bind all registered/mapped event to the discord client
   * @param {boolean} force - Register even if events has been already registered
   * @author Mishaa <mishapro@mm.st>
   * @return void
   */
  register(force = false): void {
    if (this.hasBeenRegistered && !force) throw new Error('Event has already been registered, use force option to force registration');
    if (!('on' in this.client)) throw new Error('Client must have a "on" method to define events');

    this.eventsMapped.forEach((event: EventMapped) => {
      this.client.on(event.clientEvent, event.callback);
    });
  }
}
