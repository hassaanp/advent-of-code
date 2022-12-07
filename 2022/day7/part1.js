const { readFileSync } = require("fs");

let commands = readFileSync("./input.txt", "utf-8").split("\n").splice(1);

const sizeMap = {};
const dirStack = ["/"];

function getOutputForList(listOfCommands) {
  let endOfList = 0;
  for (let i = 0; i < listOfCommands.length; i++) {
    if (listOfCommands[i].includes("$")) {
      endOfList = i;

      break;
    } else if (i === listOfCommands.length - 1) {
      return listOfCommands.splice(0);
    }
  }

  return listOfCommands.splice(0, endOfList);
}

function inspectOutput(output) {
  const dir = dirStack.join(":");
  sizeMap[dir] = 0;
  for (let i = 0; i < output.length; i++) {
    if (!output[i].includes("dir ")) {
      const [size] = output[i].split(" ");

      sizeMap[dir] += Number(size);
    }
  }
}
const sizeArray = [];

function traverseAndAggregate(obj) {
  const keys = Object.keys(obj).filter((key) => key !== "value");
  if (keys.length === 0) {
    return obj.value;
  }

  for (let key of keys) {
    obj.value += traverseAndAggregate(obj[key]);
  }
  return obj.value;
}

function traverse(obj) {
  for (var key in obj) {
    if (typeof obj[key] === "object") {
      traverse(obj[key]);
    } else {
      sizeArray.push(obj[key]);
    }
  }
}

function main() {
  let i = 0;
  while (i < commands.length) {
    let listOfCommands = [...commands];
    if (commands[i] === "$ ls") {
      let output = getOutputForList(listOfCommands.splice(i + 1));
      inspectOutput(output, dirStack[dirStack.length - 1]);
      i += output.length + 1;
    } else if (commands[i] === "$ cd ..") {
      dirStack.pop();
      i++;
    } else {
      const [$, command, directory] = commands[i].split(" ");
      if (command === "cd" && directory !== "..") {
        dirStack.push(directory);
      }

      i++;
    }
  }

  const finalTree = { value: 0 };

  const keys = Object.keys(sizeMap).sort((a, b) => a.length - b.length);
  for (let i = 0; i < keys.length; i++) {
    const split = keys[i].split(":");

    if (split.length === 1) {
      finalTree[split[0]] = {
        value: sizeMap[keys[i]],
      };
    }

    if (split.length > 1) {
      var propertyName = split.pop();
      var propertyParent = finalTree["/"];
      let j = 1;
      while (j < split.length) {
        propertyParent = propertyParent[split[j]];
        j++;
      }
      propertyParent[propertyName] = {
        value: sizeMap[keys[i]],
      };
    }
  }

  traverseAndAggregate(finalTree);
  traverse(finalTree);

  console.log(
    sizeArray
      .filter((val) => val <= 100000)
      .reduce((prev, curr) => (prev += curr))
  );
}

main();
