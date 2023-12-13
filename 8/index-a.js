const { readFileSync } = require("fs");
let lines = readFileSync("input.txt", "utf-8").split("\n");
const instructions = lines[0];
lines = lines.slice(2).map(line => line.split(" = "));
const lookup = {  };
for (const [a, b] of lines) {
  const [l, r] = b.split(", ");
  lookup[a] = { L: l.slice(1), R: r.slice(0, -1) };
}

let currentNode = "AAA";
let count = 0;
while (currentNode !== "ZZZ") {
  for (const instruction of instructions) {
    currentNode = lookup[currentNode][instruction];
    count++;
    if (currentNode === "ZZZ") {
      break;
    }
  }
}
console.log(count);