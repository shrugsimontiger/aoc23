// NOT SOLVED, WIP

const { readFileSync } = require("fs");
const grid = readFileSync("input.txt", "utf-8").split("\n").map(row => row.split("").map(x => parseInt(x)));
const cols = grid[0].length;
const rows = grid.length;
const openSet = [{ i: 0, j: 0, k: 1, g: 0, prev: null }, { i: 0, j: 0, k: 2, g: 0, prev: null }];
const closedMap = Array(12).fill().map(_ => Array(rows).fill().map(_ => Array(cols).fill(null)));
let final;
while (openSet.length > 0) {
  let lowestG = null;
  for (const pos of openSet) {
    if (!lowestG || pos.g < lowestG.g) {
      lowestG = pos;
    }
  }
  const { i, j, k, g } = lowestG;
  const adj = adjacent(i, j, k%4);
  if (adj) {
    const { i: newI, j: newJ } = adj;
    for (let dir = 0; dir < 4; dir++) {
      if ((dir+2)%4 === k%4 || dir === k-8) {
        continue;
      }
      const newK = dir%4 === k%4 ? k+4 : dir;
      if (!closedMap[newK][newJ][newI]) {
        let found = null;
        for (const pos of openSet) {
          if (pos.i === newI && pos.j === newJ && pos.k === newK) {
            found = pos;
          }
        }
        if (!found) {
          openSet.push({ i: newI, j: newJ, k: newK, g: g+grid[newJ][newI], prev: lowestG });
        } else {
          found.g = g+grid[newJ][newI];
          found.prev = lowestG;
        }
      }
    }
  }
  openSet.splice(openSet.indexOf(lowestG), 1);
  closedMap[k][j][i] = lowestG;
  if (i === cols-1 && j === rows-1) {
    final = closedMap[k][j][i];
    break;
  }
}

let currentPos = final;
let sum = 0;
while (currentPos.prev) {
  const { i, j, prev } = currentPos;
  currentPos = prev;
  sum += grid[j][i];
  console.log({ i, j });
}
console.log(sum);

function adjacent(i, j, dir) {
  if (dir === 0 && j-1 >= 0) {
    return { i, j: j-1 };
  } else if (dir === 1 && i+1 < cols) {
    return { i: i+1, j };
  } else if (dir === 2 && j+1 < rows) {
    return { i, j: j+1 };
  } else if (dir === 3 && i-1 >= 0) {
    return { i: i-1, j };
  } else {
    return null;
  }
}