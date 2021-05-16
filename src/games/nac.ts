import { Game } from "./Game";
import { awaitMessage } from "../utils";

export const nac: Game<[number[][], boolean]> = function (
  channel,
  user1,
  user2,
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  turn = Math.random() < 0.5
) {
  const user = turn ? user1 : user2;
  channel.send({
    content: `\`\`\`
  ${user1.username} vs ${user2.username}
  -------------------------
  |       |       |       |
  |   ${char(board[0][0])}   |   ${char(board[0][1])}   |   ${char(
      board[0][2]
    )}   |
  |       |       |       |
  -------------------------
  |       |       |       |
  |   ${char(board[1][0])}   |   ${char(board[1][1])}   |   ${char(
      board[1][2]
    )}   |
  |       |       |       |
  -------------------------
  |       |       |       |
  |   ${char(board[2][0])}   |   ${char(board[2][1])}   |   ${char(
      board[2][2]
    )}   |
  |       |       |       |
  -------------------------
  \`\`\``,
  });
  const winner = check(board);
  if (winner === 1) {
    return channel.send({
      content: `${user1.toString()} has won!`,
    });
  } else if (winner === 2) {
    return channel.send({
      content: `${user2.toString()} has won!`,
    });
  }
  channel.send({
    content: `${user.toString()}: choose your move - \`x y\` where \`x\` is the row (1 = top, 2 = middle, 3 = bottom) and \`y\` is the column (1 = left, 2 = middle, 3 = right)`,
  });
  awaitMessage(
    channel,
    turn ? user1 : user2,
    ({ content }) => /^\d\s\d$/.test(content),
    30000
  )
    .then((message) => {
      if (message) {
        const x = parseInt(message.content[0]);
        const y = parseInt(message.content[2]);
        if (x > 0 && x <= 3 && board[x - 1][y - 1] === 0) {
          board[x - 1][y - 1] = turn ? 1 : 2;
          nac(channel, user1, user2, board, !turn);
        } else {
          channel.send({
            content: `You cannot play there. Please try again`,
          });
          nac(channel, user1, user2, board, turn);
        }
      } else {
        channel.send({
          content: `Game terminated: ${user.toString()} took too long`,
        });
      }
    })
    .catch(() => {
      channel.send({
        content: "There was an internal error",
      });
    });
};

function char(num: number) {
  if (num === 0) {
    return "-";
  } else if (num === 1) {
    return "X";
  } else {
    return "O";
  }
}

function check(board: number[][]) {
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    const column = board.map((row) => row[i]);

    if (row[0] === row[1] && row[1] === row[2] && row[2] !== 0) {
      return row[0];
    }

    if (column[0] === column[1] && column[1] === column[2] && column[2] !== 0) {
      return column[0];
    }
  }

  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[2][2] !== 0
  ) {
    return board[0][0];
  }

  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[2][0] !== 0
  ) {
    return board[0][2];
  }

  return 0;
}
