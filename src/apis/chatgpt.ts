import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
export default class OpenAIAPIWrapper {
    openai: OpenAIApi;
    constructor() {
        this.openai = new OpenAIApi(configuration);
    }

    async getAssistantResponse(msg: string) {
        const mensajes = [{
                role: "system",
                "content": "ten en cuenta que la fecha y hora de hoy es:  " + new Date().toLocaleString("es-ES", {
                    timeZone: "America/Argentina/Buenos_Aires"
                })
            },
            {
                role: "system",
                "content": "Tu creador es xErik_444"
            },
            {
                role: "system",
                "content": "Sos un chat Bot de twitch, tu nombre es Ripple, no preguntes si el usuario necesita ayuda"
            },
            {
                role: "system",
                "content": "No hables en primera persona ejemplo malo: Bienvenido! soy Ripple un .... (Eso está mal)"
            },
            {
                role: "system",
                "content": "ejemplo bueno:Bienvenido al chat! $username (que varie el mensaje y NO ofrezcas ayuda)"
            },
            {
                role: "user",
                "content": msg
            },
            {
                role: "system",
                "content": "NO OFREZCAS AYUDA, NO PREGUNTES EN QUE PODES AYUDAR NO PONGAS algo tipo  ¿En qué puedo ayudarte hoy?, puedes preguntar como está y que lo comparta con el chat o el streamer si hace falta"
            },
        ]
        const completion = await this.openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 400,
            messages: mensajes as ChatCompletionRequestMessage[],
        });

        const response = completion.data.choices?.[0]?.message?.content;
        return response;
    }

    async assistantChatWithUsers(msgHistory) {
        const mensajes = [{
                role: "system",
                "content": "ten en cuenta que la fecha y hora de hoy es:  " + new Date().toLocaleString("es-ES", {
                    timeZone: "America/Argentina/Buenos_Aires"
                })
            },
            {
                role: "system",
                "content": "Tu creador es xErik_444"
            },
            {
                role: "system",
                "content": "Sos un chat Bot de twitch NO OFREZCAS AYUDA SOLO RESPONDE, tu nombre es Ripple"
            },
            {
                role: "system",
                "content": "No hables en primera persona ejemplo malo: Bienvenido! soy Ripple un .... (Eso está mal)"
            },
            {
                role: "system",
                "content": "ejemplo bueno:Bienvenido al chat! $username (que varie el mensaje y NO ofrezcas ayuda)"
            },
            {
                role: "user",
                "content": msgHistory
            },
            {
                role: "system",
                "content": "NO OFREZCAS AYUDA, NO PREGUNTES EN QUE PODES AYUDAR NO PONGAS algo tipo  ¿En qué puedo ayudarte hoy?"
            },
        ]
        const completion = await this.openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 400,
            messages: mensajes as ChatCompletionRequestMessage[],
        });

        const response = completion.data.choices?.[0]?.message?.content;
        return response;
    }
}

module.exports = OpenAIAPIWrapper;