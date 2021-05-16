import { awaitMessage } from "../utils";
import { internal } from "../utils/internal";
import { Game } from "./Game";

export const chopsticks: Game<[number[][], boolean]> = function (
  channel,
  user1,
  user2,
  material = [
    [1, 1],
    [1, 1],
  ],
  turn = true
) {
  if (material[0][0] >= 5) {
    material[0][0] = 0;
  }

  if (material[0][1] >= 5) {
    material[0][1] = 0;
  }

  if (material[1][0] >= 5) {
    material[1][0] = 0;
  }

  if (material[1][1] >= 5) {
    material[1][1] = 0;
  }

  const user = turn ? user1 : user2;
  channel.send({
    content: `
\`\`\`
${user1.username} vs ${user2.username}
---------------------
|         |         |
|${lines(material[user ? 1 : 0][0])}|${lines(material[user ? 1 : 0][1])}|
|         |         |
---------------------
|         |         |
|${lines(material[user ? 0 : 1][0])}|${lines(material[user ? 0 : 1][1])}|
|         |         |
---------------------
\`\`\`
`,
  });
  const winner = check(material);
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
    content: `${user.toString()}: attack (a) or split (s)?`,
  });
  awaitMessage(
    channel,
    turn ? user1 : user2,
    ({ content }) => /^[as]$/.test(content),
    60000
  )
    .then((message) => {
      if (message) {
        if (message.content === "a") {
          channel.send({
            content: `${user.toString()}: choose your move - \`a b\` where \`a\` is the finger you're attacking with (1 = left, 2 = right) and \`b\` is the finger you're attacking (1 = left, 2 = right)`,
          });
          awaitMessage(
            channel,
            turn ? user1 : user2,
            ({ content }) => /^\d\s\d$/.test(content),
            60000
          )
            .then((message) => {
              if (message) {
                const a = parseInt(message.content[0]) - 1;
                const b = parseInt(message.content[2]) - 1;
                if (material[turn ? 0 : 1][a] === 0) {
                  channel.send({
                    content: `${user.toString()}, you cannot attack with that finger as it has no material`,
                  });
                  chopsticks(channel, user1, user2, material, turn);
                } else if (material[turn ? 1 : 0][b] === 0) {
                  channel.send({
                    content: `${user.toString()}, you cannot attack that finger as it has no material`,
                  });
                  chopsticks(channel, user1, user2, material, turn);
                } else {
                  material[turn ? 1 : 0][b] += material[turn ? 0 : 1][a];
                  chopsticks(channel, user1, user2, material, !turn);
                }
              } else {
                channel.send({
                  content: `Game terminated: ${user.toString()} took too long`,
                });
              }
            })
            .catch(() => {
              internal(channel);
            });
        } else {
          channel.send({
            content: `${user.toString()}: choose your move - \`a b\` where \`a\` is the finger you're taking material from (1 = left, 2 = right) and \`b\` is the amount you're transferring`,
          });
          awaitMessage(
            channel,
            turn ? user1 : user2,
            ({ content }) => /^\d\s\d$/.test(content),
            60000
          )
            .then((message) => {
              if (message) {
                const a = parseInt(message.content[0]) - 1;
                const b = parseInt(message.content[2]);
                if (b > 0) {
                  if (material[turn ? 0 : 1][a] >= b) {
                    if (
                      material[turn ? 0 : 1][a] ===
                      material[turn ? 0 : 1][(a + 1) % 2] + b
                    ) {
                      channel.send({
                        content: `${user.toString()}, you cannot swap the material in your fingers`,
                      });
                      chopsticks(channel, user1, user2, material, turn);
                    } else {
                      material[turn ? 0 : 1][a] -= b;
                      material[turn ? 0 : 1][(a + 1) % 2] += b;
                      chopsticks(channel, user1, user2, material, !turn);
                    }
                  } else {
                    channel.send({
                      content: `${user.toString()}, your ${
                        ["left", "right"][a]
                      } finger has ${
                        material[turn ? 0 : 1][a]
                      } material which is not enough to transfer ${b} material over`,
                    });
                    chopsticks(channel, user1, user2, material, turn);
                  }
                } else {
                  channel.send({
                    content: `${user.toString()}, you cannot swap 0 or less material`,
                  });
                  chopsticks(channel, user1, user2, material, turn);
                }
              } else {
                channel.send({
                  content: `Game terminated: ${user.toString()} took too long`,
                });
              }
            })
            .catch(() => {
              internal(channel);
            });
        }
      } else {
        channel.send({
          content: `Game terminated: ${user.toString()} took too long`,
        });
      }
    })
    .catch(() => {
      internal(channel);
    });
};

function lines(num: number) {
  const space = 9 - num;
  const spaceLeft = Math.ceil(space / 2);
  let str = "";
  for (let i = 0; i < 9; i++) {
    if (i < spaceLeft) {
      str += " ";
    } else if (i - spaceLeft < num) {
      str += "|";
    } else {
      str += " ";
    }
  }
  return str;
}

function check(material: number[][]) {
  if (material[0][0] === 0 && material[0][1] === 0) {
    return 2;
  }

  if (material[1][0] === 0 && material[1][1] === 0) {
    return 1;
  }

  return 0;
}
