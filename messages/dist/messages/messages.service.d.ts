import { MessagesRepository } from './messages.repository';
export declare class MessagesService {
    messageRepo: MessagesRepository;
    constructor(messageRepo?: MessagesRepository);
    findOne(id: string): Promise<import("./messages.repository").Message>;
    findAll(): Promise<import("./messages.repository").MessageStorage>;
    create(content: string): Promise<void>;
}
