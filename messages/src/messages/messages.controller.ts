// nest generate controller messages/messages --flat
import { Controller, Get, Param, Post, Body } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages(): void {}

    @Post()
    createMessages(@Body() body: any): void {
        console.log(body);
    }

    @Get('/:id')
    getMessage(@Param('id') id: string): void {
        console.log(id);
    }
}
