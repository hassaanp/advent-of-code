const { readFileSync } = require("fs");

const array = readFileSync("input.txt", "utf8").split("\n");

function findNext(index, arr, common) {
  if (index === array[0].length || arr.length === 1) return arr;
  let countOnes = 0;
  for (let i = 0; i < arr.length; i++) {
    const digits = [...arr[i]];
    if (digits[index] == 1) {
      countOnes += 1;
    }
  }

  let numStr = countOnes >= arr.length / 2 ? "1" : "0";
  common.push(numStr);
  const result = arr.filter((element) => {
    let substring = [...element].splice(0, index + 1).join("");
    if (common.join("") == substring) {
      return element;
    }
  });
  index += 1;
  return findNext(index, result, common);
}

const result = findNext(0, array, []);
console.log(parseInt(result[0], 2));
