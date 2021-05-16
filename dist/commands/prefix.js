"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefix = void 0;
var prefix = function (_a, prefix) {
    var channel = _a.channel;
    channel.send({
        content: "Hello, my prefix is " + prefix + ". Run " + prefix + "help for a list of commands",
    });
};
exports.prefix = prefix;
