const { readFileSync } = require("fs");

const [templateArray, mappingArray] = readFileSync("input.txt", "utf-8").split(
  "\n\n"
);

const template = [...templateArray];
const mapping = {};
mappingArray.split("\n").forEach((el) => {
  const [pattern, value] = el.split(" -> ");
  mapping[pattern] = value;
});

let current = [...template];
for (let steps = 1; steps < 11; steps++) {
  let next = [];
  for (let i = 0; i < current.length - 1; i++) {
    let toAdd = mapping[`${current[i]}${current[i + 1]}`];
    next.push(`${current[i]}${toAdd}`);
  }
  current = [...next.join(""), current[current.length - 1]];
}

let countMap = {};
current.forEach((el) => {
  if (!countMap[el]) countMap[el] = 0;
  countMap[el] += 1;
});

console.log(countMap);

let max = -Infinity;
let min = Infinity;
Object.keys(countMap).forEach((key) => {
  if (countMap[key] > max) max = countMap[key];
  if (countMap[key] < min) min = countMap[key];
});

console.log(max, min, max - min);
