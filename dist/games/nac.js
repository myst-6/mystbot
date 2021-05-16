"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nac = void 0;
var utils_1 = require("../utils");
var nac = function (channel, user1, user2, board, turn) {
    if (board === void 0) { board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]; }
    if (turn === void 0) { turn = Math.random() < 0.5; }
    var user = turn ? user1 : user2;
    channel.send({
        content: "```\n  " + user1.username + " vs " + user2.username + "\n  -------------------------\n  |       |       |       |\n  |   " + char(board[0][0]) + "   |   " + char(board[0][1]) + "   |   " + char(board[0][2]) + "   |\n  |       |       |       |\n  -------------------------\n  |       |       |       |\n  |   " + char(board[1][0]) + "   |   " + char(board[1][1]) + "   |   " + char(board[1][2]) + "   |\n  |       |       |       |\n  -------------------------\n  |       |       |       |\n  |   " + char(board[2][0]) + "   |   " + char(board[2][1]) + "   |   " + char(board[2][2]) + "   |\n  |       |       |       |\n  -------------------------\n  ```",
    });
    var winner = check(board);
    if (winner === 1) {
        return channel.send({
            content: user1.toString() + " has won!",
        });
    }
    else if (winner === 2) {
        return channel.send({
            content: user2.toString() + " has won!",
        });
    }
    channel.send({
        content: user.toString() + ": choose your move - `x y` where `x` is the row (1 = top, 2 = middle, 3 = bottom) and `y` is the column (1 = left, 2 = middle, 3 = right)",
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
                exports.nac(channel, user1, user2, board, !turn);
            }
            else {
                channel.send({
                    content: "You cannot play there. Please try again",
                });
                exports.nac(channel, user1, user2, board, turn);
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
};
exports.nac = nac;
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
            return { value: row[0] };
        }
        if (column[0] === column[1] && column[1] === column[2] && column[2] !== 0) {
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
        return board[0][0];
    }
    if (board[0][2] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[2][0] !== 0) {
        return board[0][2];
    }
    return 0;
}
