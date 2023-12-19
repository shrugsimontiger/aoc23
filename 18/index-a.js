const { readFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(" ")).map(line => [line[0], parseInt(line[1])]);
const grid = { "0,0": true };
let currentI = 0;
let currentJ = 0;
// let dirs = ["U", "R", "D", "L"];
// let prevDir = lines[0][0];
// let turns = 0;

for (const [dir, amount] of lines) {
  for (let n = 0; n < amount; n++) {
    if (dir === "U") {
      currentJ--;
    } else if (dir === "R") {
      currentI++;
    } else if (dir === "D") {
      currentJ++;
    } else if (dir === "L") {
      currentI--;
    }
    grid[currentI+","+currentJ] = true;
  }
}

// Copied from day 10
const explored = {  };
const stack = [{ i: 1, j: 1 }];
while (stack.length > 0) {
  const { i, j } = stack.pop();
  if (grid[i+","+j] || explored[i+","+j]) {
    continue;
  }
  explored[i+","+j] = true;
  stack.push({ i, j: j-1 });
  stack.push({ i: i+1, j });
  stack.push({ i, j: j+1 });
  stack.push({ i: i-1, j });
}
console.log(Object.keys(grid).length + Object.keys(explored).length);