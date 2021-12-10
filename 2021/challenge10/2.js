const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8").split("\n");
let pairMap = {
  "{": "}",
  "[": "]",
  "<": ">",
  "(": ")",
};
const scoreMap = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};
let incomplete = [];
for (let i = 0; i < input.length; i++) {
  let corrupted = false;
  let stack = [];
  let charArray = [...input[i]];

  for (let j = 0; j < charArray.length; j++) {
    if (["(", "{", "[", "<"].includes(charArray[j])) {
      stack.push(charArray[j]);
    } else {
      if (j !== 0 && pairMap[stack[stack.length - 1]] === charArray[j]) {
        stack.pop();
      } else {
        corrupted = true;
        break;
      }
    }
  }
  if (!corrupted) {
    incomplete.push(stack);
  }
}

let scores = Array(incomplete.length).fill(0);
for (let i = 0; i < incomplete.length; i++) {
  const arr = incomplete[i];
  arr.reverse();
  for (let j = 0; j < arr.length; j++) {
    scores[i] = scores[i] * 5 + scoreMap[arr[j]];
  }
}

const sortedScores = scores.sort((a, b) => b - a);
const middleIndex = (sortedScores.length + 1) / 2 - 1;
console.log(sortedScores[middleIndex]);
