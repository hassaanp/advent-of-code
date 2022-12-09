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
  if (
    Math.abs(coordinatesOfHead.y - coordinatesOfTail.y) > 1 &&
    Math.abs(coordinatesOfHead.x - coordinatesOfTail.x) > 1
  ) {
    // this is a diagonal movement i.e +1 is y and +1 in x
    if (coordinatesOfHead.y - coordinatesOfTail.y < 0) {
      coordinatesOfTail.y -= 1;
    } else if (coordinatesOfHead.y - coordinatesOfTail.y > 0) {
      coordinatesOfTail.y += 1;
    }

    if (coordinatesOfHead.x - coordinatesOfTail.x < 0) {
      coordinatesOfTail.x -= 1;
    } else if (coordinatesOfHead.x - coordinatesOfTail.x > 0) {
      coordinatesOfTail.x += 1;
    }
  } else {
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
}

function moveHead(instruction, trail) {
  const [direction, times] = instruction.split(" ");
  let i = 0;
  while (i < times) {
    moveInDirection(direction, trail[0]);
    for (let j = 1; j < trail.length; j++) {
      if (!checkIfNeighbour(trail[j - 1], trail[j])) {
        moveToNeighbour(trail[j - 1], trail[j]);
      }
      if (trail[j].tail) {
        setOfVisitedCoordinates.add(`${trail[j].x}:${trail[j].y}`);
      }
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
  const one = { x: 0, y: 0 };
  const two = { x: 0, y: 0 };
  const three = { x: 0, y: 0 };
  const four = { x: 0, y: 0 };
  const five = { x: 0, y: 0 };
  const six = { x: 0, y: 0 };
  const seven = { x: 0, y: 0 };
  const eight = { x: 0, y: 0 };
  const tail = { x: 0, y: 0, tail: true };
  const trail = [head, one, two, three, four, five, six, seven, eight, tail];

  for (let i = 0; i < input.length; i++) {
    moveHead(input[i], trail);
  }

  console.log(setOfVisitedCoordinates.size);
}

main();
