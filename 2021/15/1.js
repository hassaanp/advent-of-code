const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split("").map((el) => Number(el)));

const riskMap = {};
const xMax = input[0].length - 1;
const yMax = input.length - 1;

console.log(xMax, yMax);

function findRisk(x, y, totalRisk, prevVisited) {
  if ((x === 0 && y === 0) || x > xMax || y > yMax) {
    return;
  }

  let visited = [...prevVisited];

  totalRisk += input[y][x];

  if (riskMap[`${y},${x}`] === undefined) riskMap[`${y},${x}`] = Infinity;

  riskMap[`${y},${x}`] = totalRisk;

  visited.push(`${y},${x}`);
  console.log(visited);

  if (y === 0) {
    !visited.includes(`${y},${x - 1}`) &&
      findRisk(x - 1, y, totalRisk, visited);
    !visited.includes(`${y},${x + 1}`) && x < xMax;
    findRisk(x + 1, y, totalRisk, visited);
    !visited.includes(`${y + 1},${x}`) &&
      findRisk(x, y + 1, totalRisk, visited);
  } else if (x === 0) {
    !visited.includes(`${y - 1},${x}`) &&
      findRisk(x, y - 1, totalRisk, visited);
    !visited.includes(`${y},${x + 1}`) &&
      findRisk(x + 1, y, totalRisk, visited);
    !visited.includes(`${y + 1},${x}`) &&
      y < yMax &&
      findRisk(x, y + 1, totalRisk, visited);
  } else if (x === xMax && y === yMax) {
    !visited.includes(`${y},${x - 1}`) &&
      findRisk(x - 1, y, totalRisk, visited);
    !visited.includes(`${y - 1},${x}`) &&
      findRisk(x, y - 1, totalRisk, visited);
  } else if (x === xMax) {
    !visited.includes(`${y},${x - 1}`) &&
      findRisk(x - 1, y, totalRisk, visited);
    !visited.includes(`${y - 1},${x}`) &&
      findRisk(x, y - 1, totalRisk, visited);
    !visited.includes(`${y + 1},${x}`) &&
      findRisk(x, y + 1, totalRisk, visited);
  } else if (y === yMax) {
    !visited.includes(`${y},${x - 1}`) &&
      findRisk(x - 1, y, totalRisk, visited);
    !visited.includes(`${y - 1},${x}`) &&
      findRisk(x, y - 1, totalRisk, visited);
    !visited.includes(`${y},${x + 1}`) &&
      findRisk(x + 1, y, totalRisk, visited);
  } else {
    !visited.includes(`${y},${x - 1}`) &&
      findRisk(x - 1, y, totalRisk, visited);
    !visited.includes(`${y - 1},${x}`) &&
      findRisk(x, y - 1, totalRisk, visited);
    !visited.includes(`${y},${x + 1}`) &&
      findRisk(x + 1, y, totalRisk, visited);
    !visited.includes(`${y + 1},${x}`) &&
      findRisk(x, y + 1, totalRisk, visited);
  }
}

findRisk(xMax, yMax, 0, []);

console.log(riskMap[`0,1`], riskMap[`1,0`]);
