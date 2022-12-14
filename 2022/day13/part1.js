const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf-8").split("\n\n");

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
  const indices = [];
  for (let i = 0; i < input.length; i++) {
    const [left, right] = input[i].split("\n").map((item) => JSON.parse(item));
    indices.push(compare({ left, right }));
  }
  return indices.reduce((total, current, index) => {
    if (current.status === "correct") {
      total += index + 1;
    }
    return total;
  }, 0);
}

console.log(main());
