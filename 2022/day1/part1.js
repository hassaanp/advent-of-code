const { readFileSync } = require("fs");

function main() {
  const input = readFileSync("./input.txt", "utf8").split("\n");
  let max = -1;
  let current = 0;
  input.forEach((val) => {
    if (val === "") {
      current = 0;
    } else {
      current += Number(val);

      if (current > max) max = current;
    }
  });

  console.log(max);
}

main();
