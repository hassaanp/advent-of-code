const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8").split("\n");

const grid = new Array(200).fill(".").map((_) => new Array(200).fill("."));
let maxY = 0;
function buildGrid() {
  for (let i = 0; i < input.length; i++) {
    const coordinates = input[i].split(" -> ");
    for (let j = 1; j < coordinates.length; j++) {
      let [startX, startY] = coordinates[j - 1].split(",");
      let [endX, endY] = coordinates[j].split(",");
      maxY = Math.max(startY, maxY, endY);
      if (endX === startX) {
        //   move vertically
        const min = Math.min(endY, startY);
        const max = Math.max(endY, startY);
        for (let k = min; k <= max; k++) {
          grid[k][startX - 400] = "#";
        }
      } else if (startY === endY) {
        //   move horizontally
        const min = Math.min(endX, startX);
        const max = Math.max(endX, startX);
        for (let k = min; k <= max; k++) {
          grid[startY][k - 400] = "#";
        }
      }
    }
  }
}

function simulateFallingSand() {
  let intoTheAbyss = false;
  let currentLocation = {
    x: 100,
    y: 0,
  };

  let blocked = false;

  while (!blocked || !intoTheAbyss) {
    // check if end of the grid
    if (currentLocation.y === maxY) {
      intoTheAbyss = true;
      break;
    }

    if (grid[currentLocation.y + 1][currentLocation.x] === ".") {
      // fall down
      currentLocation = {
        x: currentLocation.x,
        y: currentLocation.y + 1,
      };
    } else if (grid[currentLocation.y + 1][currentLocation.x - 1] === ".") {
      // fall left diagonal
      currentLocation = {
        x: currentLocation.x - 1,
        y: currentLocation.y + 1,
      };
    } else if (grid[currentLocation.y + 1][currentLocation.x + 1] === ".") {
      // fall right diagonal
      currentLocation = {
        x: currentLocation.x + 1,
        y: currentLocation.y + 1,
      };
    } else {
      // blocked
      grid[currentLocation.y][currentLocation.x] = "o";
      blocked = true;
      break;
    }
  }

  return intoTheAbyss;
}

function main() {
  let intoTheAbyss = false;
  let sandParticles = 0;
  buildGrid();

  console.log(maxY);

  while (!intoTheAbyss) {
    intoTheAbyss = simulateFallingSand();
    sandParticles += 1;
  }
  console.log(sandParticles - 1);
}

main();
