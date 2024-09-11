import { CreateMessageDto } from './dtos/create-message.dto';
export declare class MessagesController {
    listMessages(): void;
    createMessages(body: CreateMessageDto): void;
    getMessage(id: string): void;
}
