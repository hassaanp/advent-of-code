const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8")
  .split(",")
  .map((e) => Number(e));

function sumOfAP(val1, val2) {
  let nlast = Math.abs(val2 - val1);
  return (nlast / 2) * (1 + nlast);
}

let map = {};

let max = -Infinity;

input.forEach((el) => {
  if (el > max) max = el;
});

for (let i = 0; i < max; i++) {
  let sum = 0;
  for (let j = 0; j < input.length; j++) {
    sum += sumOfAP(i, input[j]);
  }
  map[i] = sum;
}

let minimum = Infinity;
Object.keys(map).forEach((key) => {
  if (map[key] < minimum) {
    minimum = map[key];
  }
});

console.log(map, minimum);
