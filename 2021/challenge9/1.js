const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split("").map((e) => Number(e)));

const minArray = [];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    let up = input[i - 1]?.[j] != undefined ? input[i - 1][j] : Infinity;
    let down = input[i + 1]?.[j] != undefined ? input[i + 1][j] : Infinity;
    let left = input[i][j - 1] != undefined ? input[i][j - 1] : Infinity;
    let right = input[i][j + 1] != undefined ? input[i][j + 1] : Infinity;
    let current = input[i][j];
    if (current < left && current < right && current < up && current < down) {
      minArray.push(current);
    }
  }
}

console.log(minArray.reduce((a, b) => a + b + 1, 0));
