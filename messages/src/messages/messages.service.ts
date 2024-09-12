import { MessagesRepository } from './messages.repository';

export class MessagesService {
    // Service is createing its own dependencies.
    // DONT DO THIS ON REAL APPS
    constructor(public messageRepo = new MessagesRepository()) {}

    findOne(id: string) {
        return this.messageRepo.findOne(id);
    }

    findAll() {
        return this.messageRepo.findAll();
    }

    create(content: string) {
        return this.messageRepo.create(content);
    }
}
