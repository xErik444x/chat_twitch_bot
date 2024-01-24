import * as fs from 'fs'
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
export default class DataBase {
    constructor() {};

    connect() {
        if (!fs.existsSync(path.join(__dirname, '../../../json'))) {
            fs.mkdirSync(path.join(__dirname, '../../../json'));
        }
        this.createUsersFile();
        this.createConfigFile();
    }

    createUsersFile(){
        if (fs.existsSync(path.join(__dirname, '../../../json/users.json'))) return;
        fs.writeFileSync(path.join(__dirname, '../../../json/users.json'), JSON.stringify({}));
    }

    createConfigFile(){
        if (fs.existsSync(path.join(__dirname, '../../../json/configs.json'))) return;
        fs.writeFileSync(path.join(__dirname, '../../../json/configs.json'), JSON.stringify({activa:false}));
    }

    incrementMessagesUser(userName: string) {
        const json: Usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../json/users.json'), 'utf8'));
        if (!(userName in json)) {
          json[userName] = {
            messageCount: 0,
          };
        }
        json[userName].messageCount += 1;
        fs.writeFileSync(path.join(__dirname, '../../../json/users.json'), JSON.stringify(json));
    }

    getUserInfo(userName: string){
        const json: Usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../json/users.json'), 'utf8'));
        return json[userName];
    }

    setRippleStatus(status: boolean){
        const json: Configs = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../json/configs.json'), 'utf8'));
        json.activa = status;
        fs.writeFileSync(path.join(__dirname, '../../../json/configs.json'), JSON.stringify(json));
    }

    getRippleStatus(){
        const json: Configs = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../json/configs.json'), 'utf8'));
        return json.activa;
    }
}