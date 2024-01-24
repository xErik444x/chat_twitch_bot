import * as fs from 'fs';
import * as path from 'path';

interface Usuarios {
  [username: string]: Usuario;
}

interface Usuario {
  messageCount: number;
}

interface Configs {
  activa: boolean;
}

/*
TODO: separar información por canal
*/
export default class Database {
  private usersFilePath: string;
  private configsFilePath: string;
  private jsonFolderPath: string;
  constructor() {
    this.usersFilePath = path.join(__dirname, '../../../json/users.json');
    this.configsFilePath = path.join(__dirname, '../../../json/configs.json');
    this.jsonFolderPath = path.join(__dirname, '../../../json');
  }

  private createDirectoryIfNotExists(directoryPath: string) {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
  }

  private createFileIfNotExists(filePath: string, defaultContent: unknown = {}) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultContent));
    }
  }

  connect() {
    const jsonDirectory = path.join(this.jsonFolderPath);
    this.createDirectoryIfNotExists(jsonDirectory);

    this.createFileIfNotExists(this.usersFilePath);
    this.createFileIfNotExists(this.configsFilePath, { activa: false });
  }

  incrementMessagesUser(userName: string) {
    const json: Usuarios = JSON.parse(fs.readFileSync(this.usersFilePath, 'utf8'));
    if (!(userName in json)) {
      json[userName] = {
        messageCount: 0,
      };
    }
    json[userName].messageCount += 1;
    fs.writeFileSync(this.usersFilePath, JSON.stringify(json));
  }

  getUserInfo(userName: string) {
    const json: Usuarios = JSON.parse(fs.readFileSync(this.usersFilePath, 'utf8'));
    return json[userName];
  }

  setRippleStatus(status: boolean) {
    const json: Configs = JSON.parse(fs.readFileSync(this.configsFilePath, 'utf8'));
    json.activa = status;
    fs.writeFileSync(this.configsFilePath, JSON.stringify(json));
  }

  getRippleStatus() {
    const json: Configs = JSON.parse(fs.readFileSync(this.configsFilePath, 'utf8'));
    return json.activa;
  }
}
