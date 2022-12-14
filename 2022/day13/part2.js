const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8")
  .split("\n")
  .filter((line) => line !== "");

function normalize({ left, right }) {
  // check if one is array
  if (!Array.isArray(left) && Array.isArray(right)) {
    left = [left];
    return normalize({ left, right });
  } else if (Array.isArray(left) && !Array.isArray(right)) {
    right = [right];
    return normalize({ left, right });
  }

  return { left, right };
}

function detectMixedTypes({ left, right }) {
  if (
    (!Array.isArray(left) && Array.isArray(right)) ||
    (Array.isArray(left) && !Array.isArray(right))
  )
    return true;
  return false;
}

function compare({ left, right }) {
  if (detectMixedTypes({ left, right })) {
    const normalized = normalize({ left, right });
    return compare({
      left: normalized.left,
      right: normalized.right,
    });
  }

  if (typeof left === "number" && typeof right === "number") {
    if (left > right) {
      return { status: "incorrect" };
    } else if (right > left) {
      return { status: "correct" };
    }
    return { status: "nothing" };
  }

  if (left.length > 0 && right.length === 0) {
    return { status: "incorrect" };
  } else if (right.length > 0 && left.length === 0) {
    return { status: "correct" };
  } else if (left.length === 0 && right.length === 0) {
    return { status: "nothing" };
  }

  let length = left.length > right.length ? right.length : left.length;

  for (let i = 0; i < length; i++) {
    const result = compare({
      left: left[i],
      right: right[i],
    });

    if (result.status === "correct" || result.status === "incorrect")
      return result;

    if (i === length - 1) {
      if (right.length === left.length) {
        return { status: "nothing" };
      } else if (right.length === length) {
        return { status: "incorrect" };
      } else if (left.length === length) {
        return { status: "correct" };
      }
    }
  }

  return { status: "nothing" };
}

function main() {
  const queue = [];
  input.push("[2]", "[6]");
  const total = input.length;
  while (queue.length != total || input.length > 0) {
    for (let i = 0; i < input.length; i++) {
      let results = 0;
      const left = JSON.parse(input[i]);
      for (let j = 0; j < input.length; j++) {
        if (i === j) {
          continue;
        }
        const right = JSON.parse(input[j]);
        let { status } = compare({ left, right });
        if (status === "correct") {
          results += 1;
        }
      }
      if (results === input.length - 1) {
        queue.push(left);
        input.splice(i, 1);
      }
    }
  }

  let indices = [];

  queue.forEach((item, index) => {
    if (JSON.stringify(item) === "[2]" || JSON.stringify(item) === "[6]") {
      indices.push(index);
    }
  });

  return indices
    .map((item) => item + 1)
    .reduce((total, current) => total * current, 1);
}

console.log(main());
