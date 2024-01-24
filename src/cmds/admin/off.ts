import { ChatUserstate } from "tmi.js";
import DataBase from "../../apis/db/database";
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
      db.setRippleStatus(false);
      client.say(target, "Ripple se fue a mimir");
    } catch (error) {
      console.log(`🐧 -> error:`, error);
    }
  },
};
