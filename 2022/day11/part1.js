const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8").split("\n\n");

const monkeyTracker = {};

function buildMonkeyTracker() {
  const monkeyArray = input.map((item) =>
    item.split("\n").map((_) => _.trim())
  );
  monkeyArray.forEach((monkeyObject, monkeyNumber) => {
    monkeyObject.forEach((line, index) => {
      if (index === 0) {
        monkeyTracker[line.split(" ")[1].split(":")[0].trim()] = {
          inspected: 0,
        };
      } else if (index === 1) {
        monkeyTracker[monkeyNumber].items = line
          .split(": ")[1]
          .split(", ")
          .map((val) => parseInt(val));
      } else if (index === 2) {
        const [_, operator, operand] = line.split("= ")[1].split(" ");
        monkeyTracker[monkeyNumber].operation = {
          operator,
          operand: operand,
        };
      } else if (index === 3) {
        monkeyTracker[monkeyNumber].divisibleBy = parseInt(line.split(" ")[3]);
      } else if (index === 4) {
        monkeyTracker[monkeyNumber].monkeyIfTestTrue = parseInt(
          line.split(" ")[5]
        );
      } else if (index === 5) {
        monkeyTracker[monkeyNumber].monkeyIfTestFalse = parseInt(
          line.split(" ")[5]
        );
      }
    });
  });
}

function performOperation({ operator, operand, input }) {
  let result = 0;

  if (operand === "old") operand = input;
  operand = parseInt(operand);

  if (operator === "*") {
    result = input * operand;
  } else if (operator === "+") {
    result = input + operand;
  } else if (operator === "-") {
    result = input - operand;
  } else if (operator === "/") {
    result = input / operand;
  }

  return result;
}

function conductTestAndThrowToMonkey({
  divisibleBy,
  monkeyIfTestTrue,
  monkeyIfTestFalse,
  input,
}) {
  const worryLevelAfterBored = Math.floor(input / 3);
  const result = worryLevelAfterBored % divisibleBy;
  if (result === 0) {
    monkeyTracker[monkeyIfTestTrue].items.push(worryLevelAfterBored);
  } else {
    monkeyTracker[monkeyIfTestFalse].items.push(worryLevelAfterBored);
  }
}

function round(numberOfRounds) {
  const monkeys = Object.keys(monkeyTracker);
  for (let i = 0; i < numberOfRounds; i++) {
    for (let j = 0; j < monkeys.length; j++) {
      const totalItems = monkeyTracker[j].items.length;
      for (let k = 0; k < totalItems; k++) {
        let item = monkeyTracker[j].items.shift();
        const { operator, operand } = monkeyTracker[j].operation;
        const { divisibleBy, monkeyIfTestFalse, monkeyIfTestTrue } =
          monkeyTracker[j];
        const worry = performOperation({ input: item, operand, operator });
        conductTestAndThrowToMonkey({
          monkeyIfTestFalse,
          monkeyIfTestTrue,
          divisibleBy,
          input: worry,
        });
        monkeyTracker[j].inspected += 1;
      }
    }
  }
}

function findLevelOfMonkeyBusiness() {
  const inspectedArray = Object.keys(monkeyTracker)
    .map((monkey) => monkeyTracker[monkey].inspected)
    .sort((a, b) => b - a);

  return inspectedArray[0] * inspectedArray[1];
}

function main() {
  buildMonkeyTracker();
  round(20);
  return findLevelOfMonkeyBusiness();
}

console.log(main());
