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
      minArray.push([i, j]);
    }
  }
}
let basin = [];
minArray.forEach((e, i) => {
  basin.push([]);
  countLowPoints(e[0], e[1], basin[i]);
});

function countLowPoints(i, j, basin) {
  if (basin.includes(`${i}${j}`)) {
    return;
  }
  basin.push(`${i}${j}`);
  let up = input[i - 1]?.[j] != undefined ? input[i - 1][j] : 9;
  let down = input[i + 1]?.[j] != undefined ? input[i + 1][j] : 9;
  let left = input[i][j - 1] != undefined ? input[i][j - 1] : 9;
  let right = input[i][j + 1] != undefined ? input[i][j + 1] : 9;
  if (up != 9) {
    countLowPoints(i - 1, j, basin);
  }
  if (down != 9) {
    countLowPoints(i + 1, j, basin);
  }
  if (right != 9) {
    countLowPoints(i, j + 1, basin);
  }
  if (left != 9) {
    countLowPoints(i, j - 1, basin);
  }
  return;
}
console.log(findThreeLargest(basin));
function findThreeLargest(arr) {
  return arr
    .map((el) => el.length)
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce((a, b) => a * b, 1);
}
