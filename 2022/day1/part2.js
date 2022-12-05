const { readFileSync } = require("fs");

function main() {
  const input = readFileSync("./input.txt", "utf8").split("\n");
  let sums = [];
  let current = 0;
  input.forEach((val) => {
    if (val === "") {
      sums.push(current);
      current = 0;
    } else {
      current += Number(val);
    }
  });

  const result = sums
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce((prev, current) => prev + current, 0);

  console.log(result);
}

main();
