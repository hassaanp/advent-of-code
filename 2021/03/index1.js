const { readFileSync } = require("fs");

const array = readFileSync("input.txt", "utf8").split("\n");

const gamma = [];
const epsilon = [];
const countOnes = Array(array[0].length).fill(0);
for (let i = 0; i < array.length; i++) {
  const digits = [...array[i]];
  for (let j = 0; j < digits.length; j++) {
    if (digits[j] == 1) {
      countOnes[j] += 1;
    }
  }
}

console.log(countOnes);
binaryArray = [];
for (let i = 0; i < countOnes.length; i++) {
  if (countOnes[i] < array.length / 2) {
    gamma.push(0);
    epsilon.push(1);
  } else {
    gamma.push(1);
    epsilon.push(0);
  }
}
console.log(gamma, epsilon);

const num1 = parseInt(gamma.join(""), 2);
const num2 = parseInt(epsilon.join(""), 2);
console.log(num1, num2, num1 * num2);
