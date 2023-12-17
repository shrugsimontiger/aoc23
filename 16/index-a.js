const { readFileSync } = require("fs");
const grid = readFileSync("input.txt", "utf-8").split("\n");
const cols = grid[0].length;
const rows = grid.length;
const beams = [{ i: 0, j: 0, di: 1, dj: 0 }];
const visited = Array(rows).fill().map(_ => Array(cols).fill(false));
visited[0][0] = true;

for (let k = 0; k < 670; k++) {
  for (let n = beams.length-1; n >= 0; n--) {
    const beam = beams[n];
    let { i, j, di, dj } = beam;
    if (grid[j][i] === ".") {
    } else if (grid[j][i] === "\\") {
      beam.di = dj;
      beam.dj = di;
    } else if (grid[j][i] === "/") {
      beam.di = -dj;
      beam.dj = -di;
    } else if (grid[j][i] === "-") {
      if (dj !== 0) {
        beam.di = dj;
        beam.dj = 0;
        beams.push({ i, j, di: -dj, dj: 0 });
      }
    } else if (grid[j][i] === "|") {
      if (di !== 0) {
        beam.di = 0;
        beam.dj = di;
        beams.push({ i, j, di: 0, dj: -di });
      }
    }
  }
  for (let n = beams.length-1; n >= 0; n--) {
    const beam = beams[n];
    const { i, j, di, dj } = beam;
    beam.i += di;
    beam.j += dj;
    if (beam.i < 0 || beam.i >= cols || beam.j < 0 || beam.j >= rows) {
      beams.splice(n, 1);
      continue;
    }
    visited[beam.j][beam.i] = true;
  }
}

console.log(visited.map(row => row.map(x => x ? "#" : ".").join("")).join("\n"));

let count = 0;
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < cols; i++) {
    if (visited[j][i]) {
      count++;
    }
  }
}
console.log(count);