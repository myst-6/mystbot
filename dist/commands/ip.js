"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ip = void 0;
var axios_1 = __importDefault(require("axios"));
var ip = function (_a) {
    var channel = _a.channel;
    axios_1.default
        .get("https://api64.ipify.org?format=json")
        .then(function (_a) {
        var data = _a.data;
        if (data.ip) {
            channel.send({
                content: "My IP is " + data.ip,
            });
        }
        else
            throw "Response object missing IP";
    })
        .catch(function (error) {
        console.error(error);
        channel.send({
            content: "There was an error.",
        });
    });
};
exports.ip = ip;
