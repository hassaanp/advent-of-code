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
  let badges = [];
  for (let i = 0; i < input.length; i = i + 3) {
    const set1 = [...input[i]];
    const set2 = [...input[i + 1]];
    const set3 = [...input[i + 2]];

    badges.push(
      set1
        .filter((val) => set2.includes(val))
        .filter((val) => set3.includes(val))[0]
    );
  }

  return calculatePriority(badges);
}

console.log(main());
