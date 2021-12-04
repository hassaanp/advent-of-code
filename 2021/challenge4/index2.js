const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf8").split(",");
const boardSet = readFileSync("board.txt", "utf8").split("\n\n");
const boards = Array(boardSet.length)
  .fill(0)
  .map(() =>
    Array(5)
      .fill(0)
      .map(() => Array(5).fill(0))
  );
const boardsTranspose = Array(boardSet.length)
  .fill(0)
  .map(() =>
    Array(5)
      .fill(0)
      .map(() => Array(5).fill(0))
  );

for (let i = 0; i < boardSet.length; i++) {
  let rows = boardSet[i].split("\n");
  for (let j = 0; j < 5; j++) {
    boards[i][j] = rows[j].split(" ").filter((element) => element != "");
    boardsTranspose[i] = transpose(boards[i]);
  }
}
function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}
let doneMap = {};
let doneSequence = [];
for (let i = 0; i < input.length; i++) {
  for (let k = 0; k < boards.length; k++) {
    if (doneMap[k] === undefined) {
      for (let j = 0; j < 5; j++) {
        let index1 = boards[k][j].indexOf(input[i]);
        if (index1 > -1) {
          boards[k][j][index1] = "x";
          checkIfDone(boards[k][j], k, input[i]);
        }
        let index2 = boardsTranspose[k][j].indexOf(input[i]);
        if (index2 > -1) {
          boardsTranspose[k][j][index2] = "x";
          checkIfDone(boardsTranspose[k][j], k, input[i]);
        }
      }
    }
  }
}

function checkIfDone(set, boardNumber, inputNumber) {
  if (set.join("") === "xxxxx") {
    if (!doneMap[boardNumber]) {
      doneSequence.push(boardNumber);
      doneMap[boardNumber] = inputNumber;
    }
  }
}

const lastBoard = doneSequence.pop();

let sum = 0;
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    if (boards[lastBoard][i][j] !== "x") {
      sum += Number(boards[lastBoard][i][j]);
    }
  }
}

console.log(sum * doneMap[lastBoard]);
