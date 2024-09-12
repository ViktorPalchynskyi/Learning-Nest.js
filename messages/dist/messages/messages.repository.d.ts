interface Message {
    content: string;
    id: string;
}
interface MessageStorage {
    id: Message;
}
export declare class MessagesRepository {
    findOne(id: string): Promise<Message>;
    findAll(): Promise<MessageStorage>;
    create(content: string): Promise<void>;
}
export {};
