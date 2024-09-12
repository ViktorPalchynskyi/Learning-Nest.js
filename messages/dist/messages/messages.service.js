"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const messages_repository_1 = require("./messages.repository");
class MessagesService {
    constructor(messageRepo = new messages_repository_1.MessagesRepository()) {
        this.messageRepo = messageRepo;
    }
    findOne(id) {
        return this.messageRepo.findOne(id);
    }
    findAll() {
        return this.messageRepo.findAll();
    }
    create(content) {
        return this.messageRepo.create(content);
    }
}
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map