"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dustyyute = void 0;
var dustyyute = function (_a) {
    var channel = _a.channel, guild = _a.guild;
    var user;
    while ((user = guild === null || guild === void 0 ? void 0 : guild.members.cache.random())) {
        if (user.permissionsIn(channel).has("VIEW_CHANNEL") && !user.user.bot) {
            break;
        }
    }
    channel.send({
        content: "Wagwan you dusty yute " + (user === null || user === void 0 ? void 0 : user.user.toString()),
    });
};
exports.dustyyute = dustyyute;
