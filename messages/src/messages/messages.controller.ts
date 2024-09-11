// nest generate controller messages/messages --flat
import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages(): void {}

    @Post()
    createMessages(): void {}

    @Get('/:id')
    getMessage(): void {}
}
