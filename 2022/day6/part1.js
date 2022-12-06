const { readFileSync } = require("fs");

const message = readFileSync("./input.txt", "utf-8");

function main() {
  for (let i = 0; i < message.length - 4; i++) {
    const remainder = message.split("").splice(i, message.length);
    if (detectSequence(remainder) === 4) return i + 4;
  }
}

function detectSequence(arr) {
  const map = {};
  map[arr[0]] = true;

  for (let i = 1; i < 4; i++) {
    map[arr[i]] = true;
  }

  return Object.keys(map).length;
}

console.log(main());
