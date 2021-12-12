const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8").split("\n");

const connectionsMap = {};

// populate the map
for (let i = 0; i < input.length; i++) {
  const [el1, el2] = input[i].split("-");
  if (!connectionsMap[el1]) connectionsMap[el1] = [];
  if (!connectionsMap[el2]) connectionsMap[el2] = [];
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
  let visited = [...prevVisited]; // prevents passing by reference
  if (entry !== "end" && visited.includes(entry)) return 0;
  if (entry === "end") return 1;
  if (entry.charCodeAt(0) >= 97) {
    visited.push(entry);
  }
  return connectionsMap[entry]
    .map((key) => traversePath(key, visited))
    .reduce((a, b) => a + b, 0);
}
