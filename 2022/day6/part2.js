const { readFileSync } = require("fs");

const message = readFileSync("./input.txt", "utf-8");

function main() {
  const startOfMessage = detectStartOfMessage();

  return startOfMessage;
}

function detectStartOfMessage() {
  for (let i = 0; i < message.length - 14; i++) {
    const remainder = message.split("").splice(i, message.length);
    if (detectSequence(remainder, 14) === 14) return i + 14;
  }
}

function detectSequence(arr, length) {
  const map = {};
  map[arr[0]] = true;

  for (let i = 1; i < length; i++) {
    map[arr[i]] = true;
  }

  return Object.keys(map).length;
}

console.log(main());
