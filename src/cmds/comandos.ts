import DataBase from '../apis/db/database';
import { ChatUserstate, Client } from 'tmi.js';
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
    aliases: ["commands", "cmd"],
    run: (options: RunFunctionOptions) => {
        const {
            target,
            client,
        } = options;

       client.say(target,`Comandos: 
       !info, !dado.
       `)

    }
}