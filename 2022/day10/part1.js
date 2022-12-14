const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8").split("\n");

function processOperationArray(operationArray, previousOperation) {
  const operation = operationArray.pop();
  if (previousOperation === "addx") {
    triggerOperation();
  }
}

let currentValue = 1;
let cycleMap = { 0: 1 };
let currentCycle = 0;
let valueStack = [];

function cycle(operation, previousOperation, value) {
  if (operation === "addx") {
    if (previousOperation === "addx") {
      console.log(valueStack[0]);
      currentValue += valueStack.shift();
      console.log(valueStack);
    }
    valueStack.push(parseInt(value));
    console.log(valueStack);
    currentCycle += 1;
    cycleMap[currentCycle] = currentValue;
    currentCycle += 1;
    cycleMap[currentCycle] = currentValue;
  } else {
    if (previousOperation === "addx") {
      currentValue += valueStack.shift();
    }
    currentCycle += 1;
    cycleMap[currentCycle] = currentValue;
  }
}

function main() {
  let previous = null;
  for (let i = 0; i < input.length; i++) {
    const [operation, value] = input[i].split(" ");
    console.log(valueStack);
    cycle(operation, previous, value);
    previous = operation;
  }
}

function findSum() {
  return (
    cycleMap["20"] * 20 +
    cycleMap["60"] * 60 +
    cycleMap["100"] * 100 +
    cycleMap["140"] * 140 +
    cycleMap["180"] * 180 +
    cycleMap["220"] * 220
  );
}

main();

console.log(findSum());
