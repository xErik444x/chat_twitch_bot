import DataBase from "../apis/db/database";
import { ChatUserstate, Client } from 'tmi.js';interface RunFunctionOptions {
  target: string;
  client: Client;
  commandName: string;
  command: string;
  args: string[];
  context: ChatUserstate;
  db: DataBase;
}

module.exports = {
  aliases: ["info", "user_info"],
  run: (options: RunFunctionOptions) => {
    const { target, client, context, db } = options;
    if(!context.username) return;
    const userInfo = db.getUserInfo(context.username);
    try {
      client.say(
        target,
        `
        Información de ${context.username}:
        mensajes enviados: ${userInfo.messageCount}
    `
      );
    } catch (error) {
      console.log(`🐧 -> error:`, error);
    }
  },
};
