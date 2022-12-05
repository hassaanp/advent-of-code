const { readFileSync } = require("fs");

const hexToBinMapping = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const input = readFileSync("input.txt", "utf-8").split("");

const binArray = [];
input.forEach((hex) => {
  binArray.push(hexToBinMapping[hex]);
});

const binary = binArray.join("");

const versions = [];

processBITS(binary);
let sum = 0;
versions.forEach((v) => {
  sum += v;
});

console.log(sum);

function getNumbers(binArray, numbers) {
  if (binArray.length === 0) return;
  const isEnd = binArray.shift() === "0" ? true : false;

  let significantBit = -1;
  let literalNumber = [];

  for (let i = 1; i < binArray.length; i++) {
    if (binArray[i - 1] === "1" && significantBit === -1) {
      significantBit = i;
    }

    literalNumber.push(binArray[i - 1]);

    if (significantBit > -1 && literalNumber.length % 4 === 0) break;
  }

  const number = literalNumber.join("");
  numbers.push(number);
  const remainder = binArray.slice(literalNumber.length);

  if (isEnd) {
    return { numbers, remainder };
  }

  return getNumbers(remainder, numbers);
}

function processBITS(binary) {
  if (binary.length < 10) return;
  const version = binary.splice(0, 3);
  versions.push(version);
  const typeId = binary.splice(0, 3);
  const remainder = [...binary.slice(6)];

  if (typeId === "100") {
    const { remainder: finalRemainder } = getNumbers(remainder, []);
    if (finalRemainder.length > 9) {
      processBITS(finalRemainder.join(""));
    }
    return;
  } else {
    const lengthId = remainder.shift();

    if (lengthId === "0") {
      const totalLengthInBits = remainder.slice(0, 15);
      const endOfPacket = remainder.slice(totalLengthInBits.length);
      const totalLength = parseInt(totalLengthInBits.join(""), 2);
      const truncatedPacket = endOfPacket.slice(0, totalLength).join("");
      const afterTruncatedPacket = endOfPacket.slice(totalLength).join("");
      processBITS(afterTruncatedPacket);
      processBITS(truncatedPacket);
    } else {
      const numberOfSubPacketsInBits = remainder.slice(0, 11);
      const numberOfSubPackets = parseInt(numberOfSubPacketsInBits.join(""), 2);
      const endOfPacket = remainder.slice(numberOfSubPacketsInBits.length);
      processBITS(endOfPacket.join(""));
    }
  }
}
