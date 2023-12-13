const { readFileSync } = require("fs");
const grid = readFileSync("input.txt", "utf-8").split("\n").map(row => row.split(""));
const rows = grid.length;
const cols = grid[0].length;
const millionRows = {  };
const millionCols = {  };

for (let j = rows-1; j >= 0; j--) {
  let isGalaxy = false;
  for (let i = 0; i < cols; i++) {
    if (grid[j][i] === "#") {
      isGalaxy = true;
    }
  }
  if (!isGalaxy) {
    millionRows[j] = true;
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
    millionCols[i] = true;
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
    let millionColCount = 0;
    let millionRowCount = 0;
    for (let newI = Math.min(i1, i2)+1; newI < Math.max(i1, i2); newI++) {
      if (millionCols[newI]) {
        millionColCount++;
      }
    }
    for (let newJ = Math.min(j1, j2)+1; newJ < Math.max(j1, j2); newJ++) {
      if (millionRows[newJ]) {
        millionRowCount++;
      }
    }
    sum += Math.abs(i2-i1) + Math.abs(j2-j1) + millionColCount*999999 + millionRowCount*999999;
  }
}
console.log(sum);