import { ChatUserstate } from "tmi.js";
import DataBase from "../../apis/db/database";
import Context from "../../types/context";

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
  aliases: [],
  admin:true,
  run: (options: RunFunctionOptions) => {
    const { target, client, commandName, command, args, context, db } = options;
    try {
      db.setRippleStatus(true);
      client.say(target, "Ripple está activa y esperando ordenes!");
    } catch (error) {
      console.log(`🐧 -> error:`, error);
    }
  },
};
