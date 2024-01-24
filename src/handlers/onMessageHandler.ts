import { ChatUserstate, Client } from 'tmi.js';
import OpenAIAPIWrapper from '../apis/chatgpt';
const chatBot = new OpenAIAPIWrapper();
import DataBase from '../apis/db/database';

import CommandHandler from './CommandHandler';
const saludados = [];

export default async (client: Client, target:string, context: ChatUserstate, msg: string, self: boolean, db: DataBase) => {
    if (self) return;
    db.incrementMessagesUser(context?.username ?? "");
    if (context['first-msg']) {
        const x = await chatBot.getAssistantResponse(`Hola soy ${target} es mi primer mensaje en el stream!`)
        console.log(x);
        client.say(target, x as string);
        return;
    }

    const commandName = msg.trim().toLowerCase();

    if (commandName.startsWith('hola')) {
        if (saludados.includes(target as never)) {
            return;
        }
        saludados.push(target as never)
        const x = await chatBot.getAssistantResponse(`Hola soy ${context.username} estoy saludando en el stream!`)
        client.say(target, x as string);
        setTimeout(() => {
            const index = saludados.indexOf(target as never);
            if (index !== -1) {
                saludados.splice(index, 1);
            }
        }, 20000)
        return;
    }
    if (self || !msg?.startsWith('!')) return;
    CommandHandler(client, target, context, msg, db, commandName);
}