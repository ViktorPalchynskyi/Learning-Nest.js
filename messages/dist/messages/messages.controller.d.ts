import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
export declare class MessagesController {
    messageService: MessagesService;
    constructor();
    listMessages(): Promise<import("./messages.repository").MessageStorage>;
    createMessages(body: CreateMessageDto): Promise<void>;
    getMessage(id: string): Promise<import("./messages.repository").Message>;
}
