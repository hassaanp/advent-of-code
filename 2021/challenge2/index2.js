const { readFileSync } = require("fs");

var array = readFileSync("input.txt", "utf8").split("\n");

let horizontal = 0;
let depth = 0;
let aim = 0;
for (let i = 0; i < array.length; i++) {
  let [command, value] = array[i].split(" ");
  value = Number(value);
  if (command === "forward") {
    horizontal += value;
    depth += aim * value;
  } else if (command === "down") {
    aim += value;
  } else {
    aim -= value;
  }
}

console.log(horizontal, depth, horizontal * depth);
