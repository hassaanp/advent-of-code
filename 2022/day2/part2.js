const { readFileSync } = require("fs");

const scoreMap = {
  A: 1,
  B: 2,
  C: 3,
};

const winMap = {
  A: "C",
  B: "A",
  C: "B",
};

const loseMap = {
  A: "B",
  B: "C",
  C: "A",
};

function main() {
  const rawInput = readFileSync("./input.txt", "utf-8").split("\n");

  const opponent = rawInput.map((row) => row.split(" ")[0]);
  const outcome = rawInput.map((row) => row.split(" ")[1]);
  let score = 0;

  for (let i = 0; i < opponent.length; i++) {
    if (outcome[i] === "Y") {
      score += scoreMap[opponent[i]] + 3;
    } else if (outcome[i] === "Z") {
      score += scoreMap[loseMap[opponent[i]]] + 6;
    } else {
      score += scoreMap[winMap[opponent[i]]];
    }
  }

  return score;
}

console.log(main());
