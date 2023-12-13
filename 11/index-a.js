const { readFileSync } = require("fs");
const grid = readFileSync("input.txt", "utf-8").split("\n").map(row => row.split(""));
let rows = grid.length;
let cols = grid[0].length;

for (let j = rows-1; j >= 0; j--) {
  let isGalaxy = false;
  for (let i = 0; i < cols; i++) {
    if (grid[j][i] === "#") {
      isGalaxy = true;
    }
  }
  if (!isGalaxy) {
    grid.splice(j, 0, grid[j]);
    rows++;
  }
}
for (let i = cols-1; i >= 0; i--) {
  let isGalaxy = false;
  for (let j = 0; j < rows; j++) {
    if (grid[j][i] === "#") {
      isGalaxy = true;
    }
  }
  if (!isGalaxy) {
    for (const row of grid) {
      row.splice(i, 0, ".");
    }
    cols++;
  }
}

const galaxies = [];
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < cols; i++) {
    if (grid[j][i] === "#") {
      galaxies.push({ i, j });
    }
  }
}

let sum = 0;
for (let m = 0; m < galaxies.length; m++) {
  for (let n = m+1; n < galaxies.length; n++) {
    const { i: i1, j: j1 } = galaxies[m];
    const { i: i2, j: j2 } = galaxies[n];
    sum += Math.abs(i2-i1) + Math.abs(j2-j1);
  }
}
console.log(sum);