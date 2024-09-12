export interface Message {
    content: string;
    id: string;
}
export interface MessageStorage {
    id: Message;
}
export declare class MessagesRepository {
    findOne(id: string): Promise<Message>;
    findAll(): Promise<MessageStorage>;
    create(content: string): Promise<void>;
}
