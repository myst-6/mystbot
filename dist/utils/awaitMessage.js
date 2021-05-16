"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitMessage = void 0;
var awaitMessage = function (channel, user, predicate, time) {
    if (predicate === void 0) { predicate = function () { return true; }; }
    if (time === void 0) { time = 15000; }
    return channel
        .awaitMessages(function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        return messages.some(function (message) {
            var _a, _b;
            return ((_a = message === null || message === void 0 ? void 0 : message.channel) === null || _a === void 0 ? void 0 : _a.id) === channel.id &&
                ((_b = message === null || message === void 0 ? void 0 : message.author) === null || _b === void 0 ? void 0 : _b.id) === user.id &&
                predicate(message);
        });
    }, {
        time: time,
        max: 1,
    })
        .then(function (messages) {
        if (messages.size === 0) {
            return null;
        }
        else {
            return messages.array()[0];
        }
    })
        .catch(function (error) {
        throw error;
    });
};
exports.awaitMessage = awaitMessage;
