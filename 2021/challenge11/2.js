const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split("").map((e) => Number(e)));

let flashed = [];
let epicenters = [];

function countFlashes() {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] > 9) {
        input[i][j] = 0;
        count++;
      }
    }
  }
  return count;
}

function stepIncrement(arr) {
  let epicenters = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] += 1;
      if (arr[i][j] > 9) {
        epicenters.push({ row: i, column: j });
      }
    }
  }
  return epicenters;
}

function flashes(row, column) {
  if (flashed.includes(`${row},${column}`)) return;

  flashed.push(`${row},${column}`);

  const up = {
    row: row - 1,
    column: column,
    value:
      input[row - 1]?.[column] != undefined ? input[row - 1]?.[column] + 1 : -1,
  };
  const down = {
    row: row + 1,
    column: column,
    value:
      input[row + 1]?.[column] != undefined ? input[row + 1]?.[column] + 1 : -1,
  };
  const left = {
    row: row,
    column: column - 1,
    value:
      input[row]?.[column - 1] != undefined ? input[row]?.[column - 1] + 1 : -1,
  };
  const right = {
    row: row,
    column: column + 1,
    value:
      input[row]?.[column + 1] != undefined ? input[row]?.[column + 1] + 1 : -1,
  };
  const diag1 = {
    row: row - 1,
    column: column - 1,
    value:
      input[row - 1]?.[column - 1] != undefined
        ? input[row - 1]?.[column - 1] + 1
        : -1,
  };
  const diag2 = {
    row: row - 1,
    column: column + 1,
    value:
      input[row - 1]?.[column + 1] != undefined
        ? input[row - 1]?.[column + 1] + 1
        : -1,
  };
  const diag3 = {
    row: row + 1,
    column: column + 1,
    value:
      input[row + 1]?.[column + 1] != undefined
        ? input[row + 1]?.[column + 1] + 1
        : -1,
  };
  const diag4 = {
    row: row + 1,
    column: column - 1,
    value:
      input[row + 1]?.[column - 1] != undefined
        ? input[row + 1]?.[column - 1] + 1
        : -1,
  };

  const adjacents = [up, down, left, right, diag1, diag2, diag3, diag4];

  adjacents.forEach((adj) => {
    if (adj.value !== -1) {
      input[adj.row][adj.column] = adj.value;
    }
  });

  adjacents.forEach((adj) => {
    if (adj.value > 9 && notInEpicenter(adj.row, adj.column)) {
      flashes(adj.row, adj.column);
    }
  });
  return;
}

function checkIfSynced() {
  let synced = true;
  for (let i = 0; i < input.length && synced == true; i++) {
    for (let j = 0; j < input[i].length && synced == true; j++) {
      if (input[i][j] !== 0) synced = false;
    }
  }
  return synced;
}

function notInEpicenter(row, col) {
  return (
    epicenters.filter((val) => {
      return val.row == row && val.column == col;
    }).length === 0
  );
}

let count = 0;
let synced = false;

for (let steps = 0; steps < 400; steps++) {
  flashed = [];
  epicenters = stepIncrement(input);
  epicenters.forEach((e) => {
    flashes(e.row, e.column);
  });

  count += countFlashes();
  if (checkIfSynced()) {
    synced = steps + 1;
    break;
  }
}

console.log("synced at", synced);
