const { readFileSync } = require("fs");

const raw = readFileSync("input.txt", "utf-8").split("\n");

const input = raw.map((e) => e.split(" | ")[0]);
const output = raw.map((e) => e.split(" | ")[1]);

let sum = 0;
for (let k = 0; k < input.length; k++) {
  const patternMap = {};
  let digits = input[k].split(" ");
  for (i = 0; i < digits.length; i++) {
    if (digits[i].length === 2) {
      patternMap[1] = digits[i];
    } else if (digits[i].length === 3) {
      patternMap[7] = digits[i];
    } else if (digits[i].length === 4) {
      patternMap[4] = digits[i];
    } else if (digits[i].length === 7) {
      patternMap[8] = digits[i];
    }
  }

  for (i = 0; i < digits.length; i++) {
    if (digits[i].length === 5) {
      if (findDiff(digits[i], [...patternMap[7]]) === 0) {
        patternMap[3] = digits[i];
      } else if (findDiff(digits[i], [...patternMap[4]]) === 1) {
        patternMap[5] = digits[i];
      } else {
        patternMap[2] = digits[i];
      }
    } else if (digits[i].length === 6) {
      if (findDiff(digits[i], [...patternMap[4]]) === 0) {
        patternMap[9] = digits[i];
      } else if (findDiff(digits[i], [...patternMap[7]]) === 0) {
        patternMap[0] = digits[i];
      } else {
        patternMap[6] = digits[i];
      }
    }
  }

  const sortedMap = {};
  for (i = 0; i < 10; i++) {
    sortedMap[[...patternMap[i]].sort().join("")] = i;
  }
  console.log(sortedMap);
  let outputDigits = output[k].split(" ");
  let outputValueArray = [];
  for (i = 0; i < outputDigits.length; i++) {
    if (outputDigits[i].length === 2) {
      outputValueArray.push(1);
    } else if (outputDigits[i].length === 3) {
      outputValueArray.push(7);
    } else if (outputDigits[i].length === 4) {
      outputValueArray.push(4);
    } else if (outputDigits[i].length === 7) {
      outputValueArray.push(8);
    } else {
      outputValueArray.push(sortedMap[[...outputDigits[i]].sort().join("")]);
    }
  }
  sum += Number(outputValueArray.join(""));
}
console.log(sum);

function findDiff(pattern, toMatch) {
  let diff = 0;
  for (let i = 0; i < toMatch.length; i++) {
    if (!pattern.includes(toMatch[i])) diff++;
  }
  return diff;
}
