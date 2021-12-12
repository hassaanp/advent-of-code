const { input } = require("./input");

let sumArray = [];
const remainder = input.length % 3;
for (let i = 0; i < input.length - remainder; i++) {
  sumArray.push(input[i + 2] + input[i + 1] + input[i]);
}
let result = 0;
for (let i = 1; i < sumArray.length; i++) {
  if (sumArray[i - 1] < sumArray[i]) {
    result += 1;
  }
}

console.log(result);
