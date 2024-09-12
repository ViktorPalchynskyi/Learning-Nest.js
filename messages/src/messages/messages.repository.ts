import { readFile, writeFile } from 'node:fs/promises';

export class MessagesRepository {
    async findOne(id: string) {
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);

        return messages[id];
    }

    // async findAll(): void {}

    // async create(message: string): void {}
}
