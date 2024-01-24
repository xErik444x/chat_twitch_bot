import * as fs from "fs";
import DataBase from "../apis/db/database";
import path from "path";
import { ChatUserstate, Client } from "tmi.js";
const commands = {};

readFilesRecursive(path.join(__dirname, "../cmds"), (file: string) =>
  file.endsWith(".js") || file.endsWith(".ts")
);

export default async (
  client: Client,
  target: string,
  context: ChatUserstate,
  msg: string,
  db: DataBase,
  commandName: string
) => {
  try {
    const args = msg?.slice(1)?.split(" ");
    const command = args?.shift()?.toLowerCase();

    const cmd = commands[command as string];

    if (cmd && context.username) {
      if(cmd.admin && context.username.toLowerCase() != 'xerik_444'){
        return;
      }
      cmd.run({
        target,
        client,
        args,
        commandName: command,
        command,
        context,
        db,
      });
    } else {
      console.log(`comando no valido. ${command}`);
    }
  } catch (error) {
    console.log(error);
    console.log(`no existe el comando ${commandName}`);
  }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function readFilesRecursive (dir: string, fileFilter: any) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      readFilesRecursive(filePath, fileFilter); // Llama recursivamente a la función si es una subcarpeta
    } else if (stat.isFile() && fileFilter(file)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const command = require(filePath);

      if (command.aliases && Array.isArray(command.aliases)) {
        commands[file.split(".")[0]] = command;
        for (const alias of command.aliases) {
          commands[alias] = command;
        }
      }
    }
  });
}