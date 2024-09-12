import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';

export interface Message {
    content: string;
    id: string;
}

export interface MessageStorage {
    id: Message;
}

@Injectable()
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
