const { readFileSync } = require("fs");

let rawData = readFileSync("./input.txt", "utf-8").split("\n");
let grid = rawData.map((row) => row.split(""));
let invertedGrid = transpose(grid);

function transpose(matrix) {
  const transposed = [];
  matrix.forEach((row, i) => {
    row.forEach((val, j) => {
      // If the transposed matrix does not have a row at this index, create one
      if (!transposed[j]) transposed[j] = [];
      // Add the value to the transposed matrix
      transposed[j][i] = val;
    });
  });

  return transposed;
}

let visible = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    // check if edge
    if (
      j === 0 ||
      j === grid[i].length - 1 ||
      i === 0 ||
      i === grid.length - 1
    ) {
      visible++;
      continue;
    } else {
      // check row and column
      let current = grid[i][j];
      let top = [...invertedGrid[j]].splice(0, i).sort((a, b) => b - a)[0];
      let bottom = [...invertedGrid[j]].splice(i + 1).sort((a, b) => b - a)[0];
      let left = [...grid[i]].splice(0, j).sort((a, b) => b - a)[0];
      let right = [...grid[i]].splice(j + 1).sort((a, b) => b - a)[0];

      if (
        current > top ||
        current > left ||
        current > right ||
        current > bottom
      ) {
        visible++;
      }
    }
  }
}

console.log(visible);
