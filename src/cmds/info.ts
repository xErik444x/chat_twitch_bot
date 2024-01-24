import DataBase from "../apis/db/database";
import Context from "../types/context";
import { ChatUserstate } from 'tmi.js';
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
  aliases: ["info", "user_info"],
  run: (options: RunFunctionOptions) => {
    const { target, client, commandName, command, args, context, db } = options;
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
