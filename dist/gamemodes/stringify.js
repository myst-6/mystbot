"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = void 0;
var stringify = function (_a) {
    var code = _a.code, name = _a.name;
    return code + " (" + name + ")";
};
exports.stringify = stringify;
