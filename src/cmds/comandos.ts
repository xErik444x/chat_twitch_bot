import DataBase from '../apis/db/database';
import { ChatUserstate, Client } from 'tmi.js';
interface RunFunctionOptions {
    target: any;
    client: Client;
    commandName: string;
    command: any;
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
            args,
            context,
            db
        } = options;

       client.say(target,`Comandos: 
       !info, !dado.
       `)

    }
}