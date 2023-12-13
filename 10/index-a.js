const { readFileSync } = require("fs");
const ascii = readFileSync("input.txt", "utf-8").split("\n").map(row => row.split(""));
const connectivity = {
  ".": { up: false, right: false, down: false, left: false },
  "-": { up: false, right: true , down: false, left: true  },
  "|": { up: true , right: false, down: true , left: false },
  "L": { up: true , right: true , down: false, left: false },
  "F": { up: false, right: true , down: true , left: false },
  "7": { up: false, right: false, down: true , left: true  },
  "J": { up: true , right: false, down: false, left: true  },
  "S": null
}
const grid = ascii.map(row => row.map(char => connectivity[char]));
const cols = grid[0].length;
const rows = grid.length;
let startI = -1;
let startJ = -1;
let currentI = -1;
let currentJ = -1;
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < cols; i++) {
    if (!grid[j][i]) {
      const upNeighbor    = j-1 <  0    ? connectivity["."] : grid[j-1][i];
      const rightNeighbor = i+1 >= cols ? connectivity["."] : grid[j][i+1];
      const downNeighbor  = j+1 >= rows ? connectivity["."] : grid[j+1][i];
      const leftNeighbor  = i-1 <  0    ? connectivity["."] : grid[j][i-1];
      grid[j][i] = { up: upNeighbor.down, right: rightNeighbor.left, down: downNeighbor.up, left: leftNeighbor.right };
      startI = i;
      startJ = j;
      break;
    }
  }
}

currentI = startI;
currentJ = startJ;
let prevDir = "";
let steps = 0;
do {
  let newDir = "you shouldn't be seeing this";
  if (grid[currentJ][currentI].up && prevDir !== "down") {
    newDir = "up";
  } else if (grid[currentJ][currentI].right && prevDir !== "left") {
    newDir = "right";
  } else if (grid[currentJ][currentI].down && prevDir !== "up") {
    newDir = "down";
  } else if (grid[currentJ][currentI].left && prevDir !== "right") {
    newDir = "left";
  }
  console.log(newDir);
  if (newDir === "up") {
    currentJ--;
  } else if (newDir === "right") {
    currentI++;
  } else if (newDir === "down") {
    currentJ++;
  } else if (newDir === "left") {
    currentI--;
  }
  steps++;
  prevDir = newDir;
} while (currentI !== startI || currentJ !== startJ);
console.log(Math.floor(steps/2));