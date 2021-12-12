const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8").split("\n");

const connectionsMap = {};
const smallCavesMap = {};

// populate the maps
for (let i = 0; i < input.length; i++) {
  const [el1, el2] = input[i].split("-");
  connectionsMap[el1] = [];
  connectionsMap[el2] = [];
  populateSmallCavesMap(el1);
  populateSmallCavesMap(el2);
}

// identify the connections
for (let i = 0; i < input.length; i++) {
  const [el1, el2] = input[i].split("-");
  connectionsMap[el1].push(el2);
  connectionsMap[el2].push(el1);
}

let connections = connectionsMap["start"];
let count = 0;
// run against start node only
for (i = 0; i < connections.length; i++) {
  let visited = ["start"];
  count += traversePath(connections[i], visited);
}

console.log("paths", count);

// function definitions

function traversePath(entry, prevVisited) {
  let visited = [...prevVisited];
  if (entry === "end") return 1; // found a valid path

  if (entry === "start") return 0; // edge case

  if (entry !== "end" && visited.includes(entry) && checkSmallCaves(visited)) {
    return 0;
  }

  // identified a small cave
  if (entry.charCodeAt(0) >= 97) {
    visited.push(entry);
  }

  return connectionsMap[entry]
    .map((key) => traversePath(key, visited))
    .reduce((a, b) => a + b, 0);
}

// verify if visit limit has been reached
function checkSmallCaves(arr) {
  let visitLimit = false;
  Object.keys(smallCavesMap).forEach((key) => {
    let count = arr.filter((el) => el === key).length;
    if (count > 1) visitLimit = true;
  });
  return visitLimit;
}

// populate small cave map for optimized/memoized processing
function populateSmallCavesMap(entry) {
  if (entry.charCodeAt(0) >= 97 && entry !== "start" && entry !== "end") {
    smallCavesMap[entry] = true;
  }
}
