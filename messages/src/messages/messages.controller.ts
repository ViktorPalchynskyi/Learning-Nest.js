// nest generate controller messages/messages --flat
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    messageService: MessagesService;

    constructor() {
        this.messageService = new MessagesService();
    }

    @Get()
    listMessages() {
        return this.messageService.findAll();
    }

    @Post()
    createMessages(@Body() body: CreateMessageDto) {
        return this.messageService.create(body.content);
    }

    @Get('/:id')
    getMessage(@Param('id') id: string) {
        return this.messageService.findOne(id);
    }
}
