import { MessageService } from './message.service';
export declare class MessageController {
    private readonly appService;
    constructor(appService: MessageService);
    getMessages(): string;
    postMessages(): string;
    getMessageById(): string;
}
