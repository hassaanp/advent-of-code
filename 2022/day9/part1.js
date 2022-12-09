const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8").split("\n");
const setOfVisitedCoordinates = new Set();

function checkIfNeighbour(coordinatesOfHead, coordinatesOfTail) {
  if (
    Math.abs(coordinatesOfHead.x - coordinatesOfTail.x) <= 1 &&
    Math.abs(coordinatesOfHead.y - coordinatesOfTail.y) <= 1
  )
    return true;
  return false;
}

function moveToNeighbour(coordinatesOfHead, coordinatesOfTail) {
  if (coordinatesOfHead.y - coordinatesOfTail.y > 1) {
    // check if need to move vertical
    coordinatesOfTail.y += 1;
    coordinatesOfTail.x = coordinatesOfHead.x;
  } else if (coordinatesOfHead.y - coordinatesOfTail.y < -1) {
    coordinatesOfTail.y -= 1;
    coordinatesOfTail.x = coordinatesOfHead.x;
  }

  // check if need to move horizontal
  if (coordinatesOfHead.x - coordinatesOfTail.x > 1) {
    coordinatesOfTail.x += 1;
    coordinatesOfTail.y = coordinatesOfHead.y;
  } else if (coordinatesOfHead.x - coordinatesOfTail.x < -1) {
    coordinatesOfTail.x -= 1;
    coordinatesOfTail.y = coordinatesOfHead.y;
  }
}

function moveHead(instruction, coordinatesOfHead, coordinatesOfTail) {
  const [direction, times] = instruction.split(" ");
  let i = 0;
  while (i < times) {
    moveInDirection(direction, coordinatesOfHead);
    if (!checkIfNeighbour(coordinatesOfHead, coordinatesOfTail)) {
      moveToNeighbour(coordinatesOfHead, coordinatesOfTail);
      setOfVisitedCoordinates.add(
        `${coordinatesOfTail.x}:${coordinatesOfTail.y}`
      );
    }
    i++;
  }
}

function moveInDirection(direction, coordinates) {
  if (direction === "L") {
    coordinates.x -= 1;
  } else if (direction === "R") {
    coordinates.x += 1;
  } else if (direction === "U") {
    coordinates.y -= 1;
  } else if (direction === "D") {
    coordinates.y += 1;
  }
}

function main() {
  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };

  for (let i = 0; i < input.length; i++) {
    moveHead(input[i], head, tail);
  }

  console.log(setOfVisitedCoordinates.size);
}

main();
