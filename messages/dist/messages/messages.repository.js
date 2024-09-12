"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesRepository = void 0;
const promises_1 = require("node:fs/promises");
class MessagesRepository {
    async findOne(id) {
        const contents = await (0, promises_1.readFile)('messages.json', 'utf8');
        const messages = JSON.parse(contents);
        return messages[id];
    }
}
exports.MessagesRepository = MessagesRepository;
//# sourceMappingURL=messages.repository.js.map