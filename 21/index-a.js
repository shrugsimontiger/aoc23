const { readFileSync } = require("fs");
let grid = readFileSync("input.txt", "utf-8").split("\n");
const rows = grid[0].length;
const cols = grid.length;

for (let n = 0; n < 64; n++) {
  const newGrid = grid.map(row => row.split(""));
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (grid[j][i] === "S") {
        if (j-1 >= 0 && grid[j-1][i] !== "#") {
          newGrid[j-1][i] = "S";
        }
        if (i+1 < cols && grid[j][i+1] !== "#") {
          newGrid[j][i+1] = "S";
        }
        if (j+1 < rows && grid[j+1][i] !== "#") {
          newGrid[j+1][i] = "S";
        }
        if (i-1 >= 0 && grid[j][i-1] !== "#") {
          newGrid[j][i-1] = "S";
        }
        newGrid[j][i] = ".";
      }
    }
  }
  grid = newGrid.map(row => row.join(""));
}
let count = 0;
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < cols; i++) {
    if (grid[j][i] === "S") {
      count++;
    }
  }
}
console.log(count);