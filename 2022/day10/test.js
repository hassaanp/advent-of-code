const { readFileSync } = require("fs");

const instructions = readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map((line) => {
    const [command, number] = line.split(" ");
    return { command, number: Number(number) };
  });

let x = 1;

const toDraw = [[], [], [], [], [], []];

const main = () => {
  let currentInstruction = 0;
  let cycle = 0;
  let wait = 0;

  while (currentInstruction < instructions.length) {
    cycle++;
    const instruction = instructions[currentInstruction];

    const yD = Math.floor((cycle - 1) / 40);
    const xD = cycle - yD * 40 - 1;

    const isLit = Math.abs(xD - x) <= 1 ? true : false;
    toDraw[yD][xD] = isLit ? "#" : ".";

    if (wait > 0) {
      wait--;

      if (wait === 0) {
        x = x + instruction.number;
        currentInstruction++;
      }
    } else {
      if (instruction.command === "addx") {
        wait = 1;
      } else {
        currentInstruction++;
      }
    }
  }
};

main();
toDraw.forEach((line) => console.log(line.join("")));
