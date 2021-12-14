const { readFileSync } = require("fs");

const [templateArray, mappingArray] = readFileSync("input.txt", "utf-8").split(
  "\n\n"
);

const template = [...templateArray];
const mapping = {};
let patternCount = {};
const countMap = {};
mappingArray.split("\n").forEach((el) => {
  const [pattern, value] = el.split(" -> ");
  const [first, second] = [...pattern];
  mapping[pattern] = {
    value,
    children: [`${first}${value}`, `${value}${second}`],
  };
});

for (let i = 0; i < template.length - 1; i++) {
  const key = `${template[i]}${template[i + 1]}`;
  if (!patternCount[key]) patternCount[key] = 0;
  patternCount[key] += 1;
}

template.forEach((el) => {
  if (!countMap[el]) countMap[el] = 0;
  countMap[el] += 1;
});

for (step = 1; step < 41; step++) {
  let temp = {};
  Object.keys(patternCount).forEach((key) => {
    const timesToAdd = patternCount[key];
    const [child1, child2] = mapping[key].children;
    const newLetter = mapping[key].value;
    if (!temp[child1]) temp[child1] = 0;
    if (!temp[child2]) temp[child2] = 0;
    if (!countMap[newLetter]) countMap[newLetter] = 0;

    countMap[newLetter] += 1 * timesToAdd;
    temp[child1] += 1 * timesToAdd;
    temp[child2] += 1 * timesToAdd;
  });
  patternCount = temp;
}

let max = -Infinity;
let min = Infinity;
Object.keys(countMap).forEach((key) => {
  if (countMap[key] > max) max = countMap[key];
  if (countMap[key] < min) min = countMap[key];
});

console.log(max, min, max - min);
