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

console.log(crates2D);
