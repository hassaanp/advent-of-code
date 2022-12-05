const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8").split("\n");

function calculatePriority(arr) {
  return arr.reduce((total, char) => {
    const ascii = char.charCodeAt(0);
    if (ascii > 96) {
      total += ascii - 96;
    } else {
      total += ascii - 38;
    }

    return total;
  }, 0);
}

function main() {
  let commonItems = [];
  let map = {};
  for (let i = 0; i < input.length; i++) {
    map = {};
    let common = "";
    const list = input[i];

    for (let j = 0; j < list.length / 2; j++) {
      map[list[j]] = true;
    }

    for (let j = list.length / 2; j < list.length; j++) {
      if (map[list[j]]) common = list[j];
    }
    commonItems.push(common);
  }

  return calculatePriority(commonItems);
}

console.log(main());
