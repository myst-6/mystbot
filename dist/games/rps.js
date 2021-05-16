"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rps = void 0;
var utils_1 = require("../utils");
var internal_1 = require("../utils/internal");
var names = { r: "rock", p: "paper", s: "scissors" };
var rps = function (channel, user1, user2) {
    channel.send({
        content: user1.toString() + " and " + user2.toString() + ", check your DMs to choose your weapon",
    });
    var options = ["", ""];
    var promise1 = getOption(channel, user1, function (option) { return (options[0] = option); });
    var promise2 = getOption(channel, user2, function (option) { return (options[1] = option); });
    Promise.all([promise1, promise2]).then(function () {
        if (options[0] && options[1]) {
            channel.send({
                content: user1.toString() + " chose " + names[options[0]] + " and " + user2.toString() + " chose " + names[options[1]],
            });
            var winner = check(options[0], options[1]);
            if (winner === 0) {
                channel.send({
                    content: "It was a draw!",
                });
            }
            else if (winner === 1) {
                channel.send({
                    content: user1.toString() + " has won!",
                });
            }
            else if (winner === 2) {
                channel.send({
                    content: user2.toString() + " has won!",
                });
            }
        }
        else {
            internal_1.internal(channel);
        }
    });
};
exports.rps = rps;
function getOption(channel, user, success) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!user.dmChannel) return [3 /*break*/, 2];
                    return [4 /*yield*/, user.createDM().catch(function (error) {
                            console.error(error);
                            internal_1.internal(channel);
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    user.dmChannel.send({
                        content: "Please choose either rock (r), paper (p) or scissors (s)",
                    });
                    return [2 /*return*/, utils_1.awaitMessage(user.dmChannel, user, function (_a) {
                            var content = _a.content;
                            return /^[rps]$/.test(content);
                        }, 30000)
                            .then(function (message) {
                            if (message) {
                                user.dmChannel.send({
                                    content: "OK. Locked in with " + names[message.content],
                                });
                                channel.send("Received response from " + user.toString());
                                success(message.content);
                            }
                            else {
                                channel.send(user.toString() + " took too long to reply");
                            }
                        })
                            .catch(function (error) {
                            console.error(error);
                            internal_1.internal(channel);
                        })];
            }
        });
    });
}
function check(option1, option2) {
    if ((option1 === "r" && option2 === "s") ||
        (option1 === "p" && option2 === "r") ||
        (option1 === "s" && option2 === "p")) {
        return 1;
    }
    if ((option2 === "r" && option1 === "s") ||
        (option2 === "p" && option1 === "r") ||
        (option2 === "s" && option1 === "p")) {
        return 2;
    }
    return 0;
}
