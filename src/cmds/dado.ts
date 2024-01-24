'use strict';
import tmi, { ChatUserstate } from 'tmi.js';
import DataBase from '../apis/db/database';

interface RunFunctionOptions {
    target: any;
    client: any;
    commandName: string;
    command: any;
    args: any[];
    context: ChatUserstate;
    db: DataBase;
}

module.exports = {
    aliases: ["dado", "dice"],
    run: (options: RunFunctionOptions) => {
        const {
            target,
            client,
            commandName,
            command,
            args,
            context,
            db
        } = options;
    const sides = 12;
    const res = Math.floor(Math.random() * sides) + 1;
    client.say(target, `Tiraste los dados y salió... ${res}!`);
    console.log(`* Executed ${command}`);
}
}