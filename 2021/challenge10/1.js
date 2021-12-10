const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8").split("\n");
let pairMap = {
  "{": "}",
  "[": "]",
  "<": ">",
  "(": ")",
};
const illegalScore = {
  "]": 57,
  ")": 3,
  "}": 1197,
  ">": 25137,
};
let corrupted = [];
for (let i = 0; i < input.length; i++) {
  let stack = [];
  let charArray = [...input[i]];

  for (let j = 0; j < charArray.length; j++) {
    if (["(", "{", "[", "<"].includes(charArray[j])) {
      stack.push(charArray[j]);
    } else {
      if (j !== 0 && pairMap[stack[stack.length - 1]] === charArray[j]) {
        stack.pop();
      } else {
        corrupted.push(charArray[j]);
        break;
      }
    }
  }
}

let sum = 0;
corrupted.forEach((c) => {
  sum += illegalScore[c];
});

console.log(sum);
