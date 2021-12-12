const { readFileSync } = require("fs");

const input = readFileSync("input.txt", "utf-8").split("\n");

const connectionsMap = {};

for (let i = 0; i < input.length; i++) {
  const [el1, el2] = input[i].split("-");
  connectionsMap[el1] = [];
  connectionsMap[el2] = [];
}

for (let i = 0; i < input.length; i++) {
  const [el1, el2] = input[i].split("-");
  connectionsMap[el1].push(el2);
  connectionsMap[el2].push(el1);
}

let connections = connectionsMap["start"];
let count = 0;
for (i = 0; i < connections.length; i++) {
  let visited = ["start"];
  count += traversePath(connections[i], visited);
}

console.log(count);

function traversePath(entry, prevVisited) {
  let visited = [...prevVisited];
  if (entry !== "end" && visited.includes(entry)) return 0;
  if (entry === "end") return 1;
  if (entry.charCodeAt(0) >= 97) {
    visited.push(entry);
  }
  return connectionsMap[entry]
    .map((key) => traversePath(key, visited))
    .reduce((a, b) => a + b, 0);
}
