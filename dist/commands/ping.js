"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
var ping = function (_a) {
    var channel = _a.channel, createdTimestamp = _a.createdTimestamp;
    channel.send({
        content: "Pong! " + (Date.now() - createdTimestamp) + "ms",
    });
};
exports.ping = ping;
