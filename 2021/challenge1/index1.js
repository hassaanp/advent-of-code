const { input } = require("./input");

let result = 0;

for (let i = 1; i < input.length; i++) {
  if (input[i - 1] < input[i]) {
    result += 1;
  }
}

console.log(result);
