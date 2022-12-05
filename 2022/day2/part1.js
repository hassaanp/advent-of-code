const { readFileSync } = require("fs");

const scoreMap = {
  X: 1,
  Y: 2,
  Z: 3,
};

const equalityMap = {
  A: "X",
  B: "Y",
  C: "Z",
};

const winMap = {
  X: "Z",
  Y: "X",
  Z: "Y",
};

function main() {
  const rawInput = readFileSync("./input.txt", "utf-8").split("\n");

  const opponent = rawInput.map((row) => equalityMap[row.split(" ")[0]]);
  const play = rawInput.map((row) => row.split(" ")[1]);
  let score = 0;
  for (let i = 0; i < opponent.length; i++) {
    if (opponent[i] === play[i]) {
      score += scoreMap[play[i]] + 3;
    } else if (winMap[play[i]] === opponent[i]) {
      score += scoreMap[play[i]] + 6;
    } else {
      score += scoreMap[play[i]];
    }
  }

  return score;
}

const result = main();
console.log(result);
