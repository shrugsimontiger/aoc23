const { readFileSync } = require("fs");
const grid = readFileSync("input.txt", "utf-8").split("\n").map(row => row.split(""));
const cols = grid[0].length;
const rows = grid.length;

function fall(dir) {
  if (dir === 0) {
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
  } else if (dir === 1) {
    for (let j = 0; j < rows; j++) {
      for (let i = 1; i < cols; i++) {
        if (grid[j][i] === "O") {
          let rockI = i;
          while (rockI > 0 && grid[j][rockI-1] === ".") {
            grid[j][rockI] = ".";
            grid[j][rockI-1] = "O";
            rockI--;
          }
        }
      }
    }
  } else if (dir === 2) {
    for (let j = rows-2; j >= 0; j--) {
      for (let i = 0; i < cols; i++) {
        if (grid[j][i] === "O") {
          let rockJ = j;
          while (rockJ < rows-1 && grid[rockJ+1][i] === ".") {
            grid[rockJ][i] = ".";
            grid[rockJ+1][i] = "O";
            rockJ++;
          }
        }
      }
    }
  } else if (dir === 3) {
    for (let j = 0; j < rows; j++) {
      for (let i = rows-2; i >= 0; i--) {
        if (grid[j][i] === "O") {
          let rockI = i;
          while (rockI < cols-1 && grid[j][rockI+1] === ".") {
            grid[j][rockI] = ".";
            grid[j][rockI+1] = "O";
            rockI++;
          }
        }
      }
    }
  }
}

let prevGrids = [];
let N, K;
outer: for (let n = 0; n < 1000000000; n++) {
  for (let k = 0; k < prevGrids.length; k++) {
    const prevGrid = prevGrids[k];
    let same = true;
    inner: for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        if (grid[j][i] !== prevGrid[j][i]) {
          same = false;
          break inner;
        }
      }
    }
    if (same) {
      N = n;
      K = k;
      break outer;
    }
  }
  prevGrids.push(grid.map(row => row.slice()));
  for (let k = 0; k < 4; k++) {
    fall(k);
  }
}

const additionalCycles = (1000000000 - K) % (N - K);
for (let n = 0; n < additionalCycles; n++) {
  for (let k = 0; k < 4; k++) {
    fall(k);
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