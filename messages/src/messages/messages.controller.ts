// nest generate controller messages/messages --flat
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages(): void {}

    @Post()
    createMessages(@Body() body: CreateMessageDto): void {
        console.log(body);
    }

    @Get('/:id')
    getMessage(@Param('id') id: string): void {
        console.log(id);
    }
}
