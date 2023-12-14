const { readFileSync } = require("fs");
const grids = readFileSync("input.txt", "utf-8").split("\n\n").map(grid => grid.split("\n"));

let reflections = 0;
for (const grid of grids) {
  const cols = grid[0].length;
  const rows = grid.length;
  for (let lineI = 1; lineI < cols; lineI++) {
    let valid = true;
    outer1: for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const reflectI = 2*lineI - i - 1;
        if (reflectI >= 0 && reflectI < cols && grid[j][i] !== grid[j][reflectI]) {
          valid = false;
          break outer1;
        }
      }
    }
    if (valid) {
      reflections += lineI;
    }
  }
  for (let lineJ = 1; lineJ < rows; lineJ++) {
    let valid = true;
    outer2: for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const reflectJ = 2*lineJ - j - 1;
        if (reflectJ >= 0 && reflectJ < rows && grid[j][i] !== grid[reflectJ][i]) {
          valid = false;
          break outer2;
        }
      }
    }
    if (valid) {
      reflections += 100 * lineJ;
    }
  }
}
console.log(reflections);

/*

MATH ZONE
<       
012345678
0123456789

*/