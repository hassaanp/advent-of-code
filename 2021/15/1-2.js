const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split("").map((el) => Number(el)));

const riskMap = {};
const yMax = input.length - 1;
const xMax = yMax;

for (let i = 0; i <= yMax; i++) {
  for (let j = i; j <= yMax; j++) {
    console.log(yMax - i, yMax - j, yMax - j, yMax - i);
    setLowestRisk(yMax - i, yMax - j);
    setLowestRisk(yMax - j, yMax - i);
  }
}

function setLowestRisk(x, y) {
  console.log(input[y][x]);
  if (y === yMax && x === xMax) {
    riskMap[`${x},${y}`] = input[y][x];
  } else if (y === yMax) {
    riskMap[`${x},${y}`] = input[y][x] + riskMap[`${x + 1},${y}`];
  } else if (x === xMax) {
    riskMap[`${x},${y}`] = input[y][x] + riskMap[`${x},${y + 1}`];
  } else {
    riskMap[`${x},${y}`] =
      input[y][x] +
      Math.min(riskMap[`${x},${y + 1}`], riskMap[`${x + 1},${y}`]);
  }
}

console.log(riskMap);
