// use nest generate <type> <name> to generate files. e.g. generate module messages
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';

@Module({
    controllers: [MessagesController],
})
export class MessagesModule {}
