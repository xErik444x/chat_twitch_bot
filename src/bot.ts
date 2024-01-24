import * as dotenv from 'dotenv';
dotenv.config();
import tmi, { ChatUserstate } from 'tmi.js';
import DataBase from './apis/db/database';
import onMessageHandler from './handlers/onMessageHandler';
import onConnectedHandler from './handlers/onConnectedHandler';

const opts = {
    options: {
        debug: true,
    },
    identity: {
        username: process.env.username,
        password: process.env.password,
    },
    channels: [
        "xerik_444", "ripplebot444"
    ]
};
const db = new DataBase();
db.connect();

const client = new tmi.client(opts);
client.on('connected', onConnectedHandler);

client.on('message', (channel: string, userstate: ChatUserstate, message: string, self: boolean) => {
    if(db.getRippleStatus() ||  userstate?.username?.toLowerCase() == 'xerik_444') {
        onMessageHandler(client, channel, userstate, message, self, db);
    }
});

client.connect();