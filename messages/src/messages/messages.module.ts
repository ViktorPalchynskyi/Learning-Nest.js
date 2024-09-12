// use nest generate <type> <name> to generate files. e.g. generate module messages
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
    controllers: [MessagesController],
    providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
