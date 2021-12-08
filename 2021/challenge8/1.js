const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((e) => e.split(" | ")[1]);
console.log(input);

let map = {
  2: 2,
  4: 4,
  3: 3,
  7: 7,
};
let sum = 0;
for (let i = 0; i < input.length; i++) {
  let digits = input[i].split(" ");
  digits.forEach((el) => {
    if (map[el.length]) sum++;
  });
}

console.log(sum);
