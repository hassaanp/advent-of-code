const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8").split("\n");

let currentValue = 1;
let currentCycle = 1;
let valueStack = [];
let pixel = 0;
let overlap = [];

function cycleThrough(operation, previousOperation, value) {
  if (operation === "addx") {
    if (previousOperation === "addx") {
      currentValue += valueStack.shift() || 0;
    }

    if (currentCycle % 40 === 0) {
      console.log("breaking at 1", currentCycle);
      currentValue = currentCycle + 1;
    }

    valueStack.push(parseInt(value));

    if (Math.abs(currentValue - pixel) <= 1) {
      overlap.push("#");
    } else {
      overlap.push(".");
    }

    currentCycle += 1;
    pixel += 1;

    if (currentCycle % 40 === 0) {
      console.log("breaking at 2", currentCycle);
      valueStack.pop();
      currentValue = currentCycle + 1;
    }

    if (Math.abs(currentValue - pixel) <= 1) {
      overlap.push("#");
    } else {
      overlap.push(".");
    }

    currentCycle += 1;
    pixel += 1;
  } else {
    if (previousOperation === "addx") {
      currentValue += valueStack.shift() || 0;
    }

    if (currentCycle % 40 === 0) {
      console.log("breaking at 3", currentCycle);

      currentValue = currentCycle + 1;
    }

    if (Math.abs(currentValue - pixel) <= 1) {
      overlap.push("#");
    } else {
      overlap.push(".");
    }

    currentCycle += 1;
    pixel += 1;
  }
}

function main() {
  let previous = null;
  for (let i = 0; i < input.length; i++) {
    console.log(input[i]);
    const [operation, value] = input[i].split(" ");
    cycleThrough(operation, previous, value);
    previous = operation;
  }
}

main();

function splitToChunks(array) {
  let result = [];
  for (let i = 6; i > 0; i--) {
    result.push(array.splice(0, 40).join("  "));
  }
  return result;
}

console.log(splitToChunks(overlap));
