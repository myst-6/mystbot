"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nac = void 0;
var utils_1 = require("../utils");
var nac = function (_a) {
    var author = _a.author, channel = _a.channel, mentions = _a.mentions;
    var user = mentions.users.array()[0];
    if (author.id === user.id) {
        return channel.send({
            content: user.toString() + ", you cannot challenge yourself",
        });
    }
    if (user) {
        channel.send({
            content: user.toString() + ", " + author.toString() + " is challenging you to a game of naughts and crosses. Type 'yes' to accept or 'no' to deny",
        });
        utils_1.awaitMessage(channel, user)
            .then(function (message) {
            if (message) {
                if (message.content.toLowerCase().includes("y")) {
                    channel.send({
                        content: "OK. Starting game between " + author.toString() + " and " + user.toString(),
                    });
                    play(channel, author, user, [
                        [0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0],
                    ], Math.random() < 0.5);
                }
                else {
                    channel.send({
                        content: author.toString() + ", challenge declined by " + user.toString(),
                    });
                }
            }
            else {
                channel.send({
                    content: user.toString() + " took too long to reply",
                });
            }
        })
            .catch(function () {
            channel.send({
                content: "There was an internal error",
            });
        });
    }
    else {
        channel.send({
            content: "Please mention a user, and not a role",
        });
    }
};
exports.nac = nac;
function play(channel, user1, user2, board, turn) {
    var user = turn ? user1 : user2;
    channel.send({
        content: "```\n" + user1.username + " vs " + user2.username + "\n-------------------------\n|       |       |       |\n|   " + char(board[0][0]) + "   |   " + char(board[0][1]) + "   |   " + char(board[0][2]) + "   |\n|       |       |       |\n-------------------------\n|       |       |       |\n|   " + char(board[1][0]) + "   |   " + char(board[1][1]) + "   |   " + char(board[1][2]) + "   |\n|       |       |       |\n-------------------------\n|       |       |       |\n|   " + char(board[2][0]) + "   |   " + char(board[2][1]) + "   |   " + char(board[2][2]) + "   |\n|       |       |       |\n-------------------------\n```",
    });
    var won = check(board);
    if (won === 1) {
        return channel.send({
            content: user1.toString() + " has won!",
        });
    }
    else if (won === 2) {
        return channel.send({
            content: user2.toString() + " has won!",
        });
    }
    channel.send({
        content: user.toString() + ": choose your move - write 'a b' where a is the row number and b is the column number",
    });
    utils_1.awaitMessage(channel, turn ? user1 : user2, function (_a) {
        var content = _a.content;
        return /^\d\s\d$/.test(content);
    }, 30000)
        .then(function (message) {
        if (message) {
            var x = parseInt(message.content[0]);
            var y = parseInt(message.content[2]);
            if (x > 0 && x <= 3 && board[x - 1][y - 1] === 0) {
                board[x - 1][y - 1] = turn ? 1 : 2;
                play(channel, user1, user2, board, !turn);
            }
            else {
                channel.send({
                    content: "You cannot play there. Please try again",
                });
                play(channel, user1, user2, board, turn);
            }
        }
        else {
            channel.send({
                content: "Game terminated: " + user.toString() + " took too long",
            });
        }
    })
        .catch(function () {
        channel.send({
            content: "There was an internal error",
        });
    });
}
function char(num) {
    if (num === 0) {
        return "-";
    }
    else if (num === 1) {
        return "X";
    }
    else {
        return "O";
    }
}
function check(board) {
    var _loop_1 = function (i) {
        var row = board[i];
        var column = board.map(function (row) { return row[i]; });
        if (row[0] === row[1] && row[1] === row[2] && row[2] !== 0) {
            console.log("row " + i);
            return { value: row[0] };
        }
        if (column[0] === column[1] && column[1] === column[2] && column[2] !== 0) {
            console.log("column " + i);
            return { value: column[0] };
        }
    };
    for (var i = 0; i < board.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    if (board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[2][2] !== 0) {
        console.log("diag 1");
        return board[0][0];
    }
    if (board[0][2] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[2][0] !== 0) {
        console.log("diag 2");
        return board[0][2];
    }
    return 0;
}
