const { readFileSync } = require("fs");

const rawInput = readFileSync("input.txt", "utf-8").split("\n");
const input = rawInput.map((row) =>
  row.split(" -> ").map((col) => col.split(","))
);
console.log(input[0]);
const grid = Array(1000)
  .fill(0)
  .map(() => Array(1000).fill(0));

let sum = 0;
for (let i = 0; i < input.length; i++) {
  // x1 = x2
  if (input[i][0][0] === input[i][1][0]) {
    markInGrid(
      "vertical",
      Number(input[i][0][0]),
      Number(input[i][0][1]),
      Number(input[i][1][1])
    );
  }

  // y1 = y2
  if (input[i][0][1] === input[i][1][1]) {
    markInGrid(
      "horizontal",
      Number(input[i][0][1]),
      Number(input[i][0][0]),
      Number(input[i][1][0])
    );
  }
}

function markInGrid(direction, fixedCoordinate, val1, val2) {
  let start = -1;
  let end = -1;
  if (val1 > val2) {
    start = val2;
    end = val1;
  } else {
    start = val1;
    end = val2;
  }
  for (let i = start; i <= end; i++) {
    if (direction == "horizontal") {
      grid[fixedCoordinate][i] += 1;
    } else {
      grid[i][fixedCoordinate] += 1;
    }
  }
}

for (let i = 0; i < grid.length; i++) {
  for (j = 0; j < grid.length; j++) {
    if (grid[i][j] > 1) {
      sum += 1;
    }
  }
}

console.log(sum);
