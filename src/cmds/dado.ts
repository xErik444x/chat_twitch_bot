'use strict';
import { ChatUserstate, Client } from 'tmi.js';
import DataBase from '../apis/db/database';

interface RunFunctionOptions {
    target: string;
    client: Client;
    commandName: string;
    command: string;
    args: string[];
    context: ChatUserstate;
    db: DataBase;
  }

module.exports = {
    aliases: ["dado", "dice"],
    run: (options: RunFunctionOptions) => {
        const {
            target,
            client,
            command,
        } = options;
    const sides = 12;
    const res = Math.floor(Math.random() * sides) + 1;
    client.say(target, `Tiraste los dados y salió... ${res}!`);
    console.log(`* Executed ${command}`);
}
}