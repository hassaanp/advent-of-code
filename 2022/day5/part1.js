const { readFileSync } = require("fs");

const [cratesConfig, instructionsRaw] = readFileSync(
  "./input.txt",
  "utf-8"
).split("\n\n");

const instructions = instructionsRaw.split("\n");
const crates = cratesConfig.split("\n");
const size = crates.splice(crates.length - 1, 1)[0].split("  ").length;
let crates2D = crates.map((row) =>
  row
    .match(/.{1,4}/g)
    .map((item) => item.trim().split(" "))
    .flat()
);

const extraArray = Array(100)
  .fill("")
  .map((x) => Array(size).fill(""));

crates2D = crates2D.reverse();

const top = {};

for (let i = 0; i < crates2D.length; i++) {
  for (let j = 0; j < size; j++) {
    if (j === size - 1) console.log(crates2D[i][j]);
    if (crates2D[i][j] !== "") {
      top[j + 1] = i;
    }
  }
}

crates2D = crates2D.concat(extraArray);

for (let i = 0; i < instructions.length; i++) {
  console.log(top);
  const breakDown = instructions[i].split(" ");
  console.log(breakDown);
  let from = breakDown[3];
  let to = breakDown[5];
  const toMove = breakDown[1];

  for (let j = 0; j < toMove; j++) {
    moveCrate(from, to);
  }
}

console.log(generateString());

// Utility Functions

function moveCrate(from, to) {
  const rowToGetFrom = top[from];
  const rowToPlace = top[to];
  top[to] += 1;
  top[from] -= 1;
  crate = crates2D[rowToGetFrom][from - 1];
  crates2D[rowToGetFrom][from - 1] = "";
  crates2D[rowToPlace + 1][to - 1] = crate;
}

function generateString() {
  const arrayOfTops = Object.keys(top).map(
    (key) => crates2D[top[key]][key - 1]
  );
  return arrayOfTops.join("").replace(/[\[\]']+/g, "");
}
