const { readFileSync } = require("fs");

const grid = readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(""));

function getAllStartingPoints(grid) {
  const startPoints = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "a" || grid[i][j] === "S")
        startPoints.push({ x: i, y: j });
    }
  }
  return startPoints;
}

function checkValid(current, adjacent) {
  if (current === "S") return true;
  if (adjacent === "E") adjacent = "z";
  if (adjacent.charCodeAt(0) - current.charCodeAt(0) <= 1) return true;

  return false;
}

function shortestPath(grid, start) {
  const rows = grid.length;
  const cols = grid[0].length;
  // initialize the queue with the starting position and the distance set to 0
  const queue = [[start.x, start.y, 0]];
  // initialize a set to store the visited positions
  const visited = new Set();

  // while there are still positions in the queue
  while (queue.length > 0) {
    // dequeue the first position in the queue and destruct the values
    const [x, y, d] = queue.shift();
    // // if the position is out of bounds or is not a valid path, continue
    // if (
    //   x < 0 ||
    //   y < 0 ||
    //   x >= grid.length ||
    //   y >= grid[0].length ||
    //   grid[x][y] === 0
    // )
    //   continue;

    // if the position is the destination, return the distance
    if (grid[x][y] === "E") return d;

    // if the position has not been visited, add it to the visited set
    if (!visited.has(x + "," + y)) {
      visited.add(x + "," + y);
      // enqueue the adjacent positions with an updated distance
      if (x + 1 < rows && checkValid(grid[x][y], grid[x + 1][y]))
        queue.push([x + 1, y, d + 1]);
      if (x - 1 > -1 && checkValid(grid[x][y], grid[x - 1][y]))
        queue.push([x - 1, y, d + 1]);
      if (y + 1 < cols && checkValid(grid[x][y], grid[x][y + 1]))
        queue.push([x, y + 1, d + 1]);
      if (y - 1 > -1 && checkValid(grid[x][y], grid[x][y - 1]))
        queue.push([x, y - 1, d + 1]);
    }
  }

  // if the destination is not reached, return -1
  return -1;
}

function findPoint(grid, point) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === point) return { x: i, y: j };
    }
  }
}

function main() {
  const startingPoints = getAllStartingPoints(grid);
  const shortest = startingPoints
    .map((start) => shortestPath(grid, start))
    .filter((val) => val != -1)
    .sort((a, b) => a - b)[0];

  return shortest;
}

console.log(main());
