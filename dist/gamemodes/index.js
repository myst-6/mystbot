"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamemodes = void 0;
__exportStar(require("./GameOptions"), exports);
__exportStar(require("./Gamemode"), exports);
var nac_1 = __importDefault(require("./nac"));
var rps_1 = __importDefault(require("./rps"));
var chopsticks_1 = __importDefault(require("./chopsticks"));
exports.gamemodes = [nac_1.default, rps_1.default, chopsticks_1.default];
