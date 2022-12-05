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
    if (crates2D[i][j] !== "") {
      top[j + 1] = i;
    }
  }
}

crates2D = crates2D.concat(extraArray);

for (let i = 0; i < instructions.length; i++) {
  const breakDown = instructions[i].split(" ");
  let from = breakDown[3];
  let to = breakDown[5];
  const toMove = Number(breakDown[1]);

  moveCrate(from, to, toMove);
}

console.log(generateString());

// Utility Functions
function moveCrate(from, to, size) {
  const rowToGetFrom = top[from];
  let rowToPlace = top[to];
  top[to] += size;
  top[from] -= size;
  for (let i = size - 1; i > -1; i--) {
    crate = crates2D[rowToGetFrom - i][from - 1];
    crates2D[rowToGetFrom - i][from - 1] = "";
    crates2D[rowToPlace + 1][to - 1] = crate;
    rowToPlace += 1;
  }
}

function generateString() {
  const arrayOfTops = Object.keys(top).map(
    (key) => crates2D[top[key]][key - 1]
  );

  return arrayOfTops.join("").replace(/[\[\]']+/g, "");
}
