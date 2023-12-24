const { readFileSync } = require("fs");
const grid = readFileSync("input.txt", "utf-8").split("\n");
const cols = grid[0].length;
const rows = grid.length;

function search(currentI, currentJ, used, initialSteps=1) {
  let steps = 0;
  for (let n = 0; true; n++) {
    steps++;
    let valid = [];
    if (currentJ-1 >= 0 && (grid[currentJ-1][currentI] === "." || grid[currentJ-1][currentI] === "^") && !used[currentJ-1][currentI]) {
      valid.push(0);
    }
    if (currentI+1 < cols && (grid[currentJ][currentI+1] === "." || grid[currentJ][currentI+1] === ">") && !used[currentJ][currentI+1]) {
      valid.push(1);
    }
    if (currentJ+1 < rows && (grid[currentJ+1][currentI] === "." || grid[currentJ+1][currentI] === "v") && !used[currentJ+1][currentI]) {
      valid.push(2);
    }
    if (currentI-1 >= 0 && (grid[currentJ][currentI-1] === "." || grid[currentJ][currentI-1] === "<") && !used[currentJ][currentI-1]) {
      valid.push(3);
    }
    if (valid.length === 0) {
      return -1;
    } else if (valid.length === 1) {
      used[currentJ][currentI] = true;
      if (valid[0] === 0) {
        currentJ--;
      } else if (valid[0] === 1) {
        currentI++;
      } else if (valid[0] === 2) {
        currentJ++;
      } else if (valid[0] === 3) {
        currentI--;
      }
      if (currentJ === rows-1) {
        return n + initialSteps;
      }
    } else {
      const prevI = currentI;
      const prevJ = currentJ;
      let values = [];
      for (const choice of valid) {
        used[currentJ][currentI] = true;
        if (choice === 0) {
          currentJ--;
        } else if (choice === 1) {
          currentI++;
        } else if (choice === 2) {
          currentJ++;
        } else if (choice === 3) {
          currentI--;
        }
        values.push(search(currentI, currentJ, used.map(row => row.slice()), n+initialSteps+1));
        used[currentJ][currentI] = false;
        currentI = prevI;
        currentJ = prevJ;
      }
      let longest = 0;
      for (const value of values) {
        if (value > longest) {
          longest = value;
        }
      }
      return longest;
    }
  }
}

console.log(search(1, 0, Array(rows).fill().map(_ => Array(cols).fill(false))));