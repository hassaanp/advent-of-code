const { readFileSync, writeFileSync } = require("fs");

const [part1, part2] = readFileSync("input.txt", "utf-8")
  .split("\n\n")
  .map((e) => e.split("\n"));

const input = part1.map((e) => {
  const [x, y] = e.split(",");
  return { x: parseInt(x), y: parseInt(y) };
});

const instructions = part2.map((e) => {
  const [coordinate, value] = e.split(" ")[2].split("=");
  return { coordinate, value: parseInt(value) };
});

const { largestX, largestY } = findLargest(input);

let paper = createSquareArrayOfDots(largestX, largestY);

for (let i = 0; i < input.length; i++) {
  paper[input[i].y][input[i].x] = "#";
}

for (let i = 0; i < instructions.length; i++) {
  if (instructions[i].coordinate === "x") {
    paper = foldAlongX(paper, instructions[i].value);
  } else {
    paper = foldAlongY(paper, instructions[i].value);
  }
  console.log(countDots(paper));
}
console.log(paper);

writeFileSync("result.txt", paper.join("\n"), "utf-8");

// function definitions

function findLargest(mapArray) {
  let largestX = -Infinity;
  let largestY = -Infinity;
  mapArray.forEach((map) => {
    if (map.x > largestX) largestX = map.x;
    if (map.y > largestY) largestY = map.y;
  });
  return { largestX: largestX + 1, largestY: largestY + 1 };
}

function createSquareArrayOfDots(sizeX, sizeY) {
  return Array(sizeY)
    .fill(".")
    .map(() => Array(sizeX).fill("."));
}

function foldAlongY(array, y) {
  const array1 = array.splice(0, y);
  const array2 = array.splice(1, array.length).reverse();
  const size1 = array1.length;
  const size2 = array2.length;
  if (size1 >= size2) {
    const diff = size1 - size2;
    for (let i = 0; i < array2.length; i++) {
      for (let j = 0; j < array2[i].length; j++) {
        if (array2[i][j] === "#") array1[i + diff][j] = "#";
      }
    }
    return array1;
  } else if (size1 < size2) {
    const diff = size2 - size1;
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array1[i].length; j++) {
        if (array1[i][j] === "#") array2[i + diff][j] = "#";
      }
    }
    return array2;
  }
}

function foldAlongX(array, x) {
  const copyArray = [...array];
  const transposedArray = transpose(copyArray);
  const folded = foldAlongY(transposedArray, x);
  return transpose(folded);
}

function countDots(array) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] == "#") count += 1;
    }
  }
  return count;
}

function transpose(array) {
  const sizeX = array.length;
  const sizeY = array[0].length;
  const transposedArray = Array(sizeY)
    .fill(".")
    .map(() => Array(sizeX).fill("."));
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      transposedArray[j][i] = array[i][j];
    }
  }
  return transposedArray;
}
