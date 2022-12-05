const { readFileSync } = require("fs");

const rawInput = readFileSync("./input.txt", "utf-8").split("\n");
const input = rawInput.map((entry) => entry.split(","));
let score = 0;

for (let i = 0; i < input.length; i++) {
  const range1 = input[i][0].split("-");
  const range2 = input[i][1].split("-");
  const minOfRange1 = Number(range1[0]);
  const minOfRange2 = Number(range2[0]);
  const maxOfRange1 = Number(range1[1]);
  const maxOfRange2 = Number(range2[1]);

  if (
    (minOfRange1 >= minOfRange2 && maxOfRange1 <= maxOfRange2) ||
    (minOfRange2 >= minOfRange1 && maxOfRange2 <= maxOfRange1)
  ) {
    console.log(minOfRange1, minOfRange2, maxOfRange1, maxOfRange2);
    score++;
  }
}

console.log(score);
