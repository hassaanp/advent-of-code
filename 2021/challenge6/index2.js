const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8")
  .split(",")
  .map((e) => Number(e));

let dict = {};

for (let i = 0; i < 9; i++) {
  dict[i] = 0;
}

for (let i = 0; i < input.length; i++) {
  dict[input[i]] += 1;
}

let days = 0;
while (days < 256) {
  let newToAdd = dict[0];
  for (key in [0, 1, 2, 3, 4, 5, 6, 7]) {
    dict[key] = dict[Number(key) + 1];
  }
  dict[6] += newToAdd;
  dict[8] = newToAdd;
  days++;
}

let sum = 0;

Object.keys(dict).forEach((key) => (sum += dict[key]));

console.log(sum);
