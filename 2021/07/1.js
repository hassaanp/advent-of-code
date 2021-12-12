const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8")
  .split(",")
  .map((e) => Number(e));

let map = {};

let max = -Infinity;

input.forEach((el) => {
  if (el > max) max = el;
});

for (let i = 0; i < max; i++) {
  let sum = 0;
  for (let j = 0; j < input.length; j++) {
    sum += Math.abs(input[j] - input[i]);
  }
  map[i] = sum;
}

let minimum = Infinity;
Object.keys(map).forEach((key) => {
  if (map[key] < minimum) {
    minimum = map[key];
  }
});

console.log(minimum);
