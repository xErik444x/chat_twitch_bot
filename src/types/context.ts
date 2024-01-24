export default interface Context {
    clientNonce: string;
    "display-name": string;
    username: string;
    firstMsg: boolean;
    id: string; //message id
    messageType: string;
    mod: boolean;
    returningChatter: boolean;
}