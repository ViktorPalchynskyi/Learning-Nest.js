import { readFile, writeFile } from 'node:fs/promises';

interface Message {
    content: string;
    id: string;
}

interface MessageStorage {
    id: Message;
}

export class MessagesRepository {
    async findOne(id: string): Promise<Message> {
        const contents = await readFile('messages.json', 'utf8');
        const messages: MessageStorage = JSON.parse(contents);

        return messages[id];
    }

    async findAll(): Promise<MessageStorage> {
        const contents = await readFile('messages.json', 'utf8');
        const messages: MessageStorage = JSON.parse(contents);

        return messages;
    }

    async create(content: string): Promise<void> {
        const contents = await readFile('messages.json', 'utf8');
        const messages: MessageStorage = JSON.parse(contents);
        const id = Math.round(Math.random() * 999);
        messages[id] = { content, id };

        await writeFile('messages.json', JSON.stringify(messages));
    }
}
