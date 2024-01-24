import { ChatUserstate, Client } from "tmi.js";
import DataBase from "../../apis/db/database";
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
  aliases: [],
  admin:true,
  run: (options: RunFunctionOptions) => {
    const { target, client, db } = options;
    try {
      db.setRippleStatus(false);
      client.say(target, "Ripple se fue a mimir");
    } catch (error) {
      console.log(`🐧 -> error:`, error);
    }
  },
};
