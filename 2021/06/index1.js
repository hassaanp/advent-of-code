const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8")
  .split(",")
  .map((e) => Number(e));

function processElement(index) {
  let value = input[index];
  if (value === 0) {
    input.push(8);
    input[index] = 6;
  } else {
    input[index] = value - 1;
  }
}

let days = 0;
while (days < 80) {
  const currentLenght = input.length;
  for (let i = 0; i < currentLenght; i++) {
    processElement(i);
  }
  days++;
}

console.log(input.length);
