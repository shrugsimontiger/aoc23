const { readFileSync } = require("fs");
const grid = readFileSync("input.txt", "utf-8").split("\n").map(row => row.split(""));
const cols = grid[0].length;
const rows = grid.length;

for (let j = 1; j < rows; j++) {
  for (let i = 0; i < cols; i++) {
    if (grid[j][i] === "O") {
      let rockJ = j;
      while (rockJ > 0 && grid[rockJ-1][i] === ".") {
        grid[rockJ][i] = ".";
        grid[rockJ-1][i] = "O";
        rockJ--;
      }
    }
  }
}

let load = 0;
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < cols; i++) {
    if (grid[j][i] === "O") {
      load += rows-j;
    }
  }
}
console.log(load);