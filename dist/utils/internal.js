"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internal = void 0;
var internal = function (channel) {
    channel.send({
        content: "There was an internal error",
    });
};
exports.internal = internal;
