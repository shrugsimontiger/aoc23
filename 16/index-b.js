const { readFileSync } = require("fs");
const grid = readFileSync("input.txt", "utf-8").split("\n");
const cols = grid[0].length;
const rows = grid.length;

let worldRecord = 0;
for (let m = 0; m < 2*cols + 2*rows; m++) {
  let initI, initJ, initDI, initDJ;
  if (m < cols) {
    initI = m;
    initJ = 0;
    initDI = 0;
    initDJ = 1;
  } else if (m < cols+rows) {
    initI = cols-1;
    initJ = m-cols;
    initDI = -1;
    initDJ = 0;
  } else if (m < 2*cols + rows) {
    initI = m-cols-rows;
    initJ = rows-1;
    initDI = 0;
    initDJ = -1;
  } else {
    initI = 0;
    initJ = m - 2*cols - rows;
    initDI = 1;
    initDJ = 0;
  }
  const beams = [{ i: initI, j: initJ, di: initDI, dj: initDJ }];
  const beamsMap = {  };
  const visited = Array(rows).fill().map(_ => Array(cols).fill(false));
  visited[initJ][initI] = true;

  let streak = 0;
  while (true) {
    for (let n = beams.length-1; n >= 0; n--) {
      const beam = beams[n];
      let { i, j, di, dj } = beam;
      if (grid[j][i] === ".") {
      } else if (grid[j][i] === "\\") {
        beamsMap[i+","+j+","+di+","+dj] = false;
        beam.di = dj;
        beam.dj = di;
        beamsMap[beam.i+","+beam.j+","+beam.di+","+beam.dj] = true;
      } else if (grid[j][i] === "/") {
        beamsMap[i+","+j+","+di+","+dj] = false;
        beam.di = -dj;
        beam.dj = -di;
        beamsMap[beam.i+","+beam.j+","+beam.di+","+beam.dj] = true;
      } else if (grid[j][i] === "-") {
        if (dj !== 0) {
          beamsMap[i+","+j+","+di+","+dj] = false;
          beam.di = dj;
          beam.dj = 0;
          if (!beamsMap[beam.i+","+beam.j+","+(-beam.di)+","+beam.dj]) {
            beams.push({ i, j, di: -dj, dj: 0 });
          }
          beamsMap[beam.i+","+beam.j+","+beam.di+","+beam.dj] = true;
          beamsMap[beam.i+","+beam.j+","+(-beam.di)+","+beam.dj] = true;
        }
      } else if (grid[j][i] === "|") {
        if (di !== 0) {
          beamsMap[i+","+j+","+di+","+dj] = false;
          beam.di = 0;
          beam.dj = di;
          if (!beamsMap[beam.i+","+beam.j+","+beam.di+","+(-beam.dj)]) {
            beams.push({ i, j, di: 0, dj: -di });
          }
          beamsMap[beam.i+","+beam.j+","+beam.di+","+beam.dj] = true;
          beamsMap[beam.i+","+beam.j+","+beam.di+","+(-beam.dj)] = true;
        }
      }
    }
    let hasChanged = false;
    for (let n = beams.length-1; n >= 0; n--) {
      const beam = beams[n];
      const { i, j, di, dj } = beam;
      beamsMap[i+","+j+","+di+","+dj] = false;
      beam.i += di;
      beam.j += dj;
      if (beam.i < 0 || beam.i >= cols || beam.j < 0 || beam.j >= rows) {
        beams.splice(n, 1);
        continue;
      } else {
        beamsMap[beam.i+","+beam.j+","+beam.di+","+beam.dj] = true;
      }
      if (!visited[beam.j][beam.i]) {
        visited[beam.j][beam.i] = true;
        hasChanged = true;
      }
    }
    if (!hasChanged) {
      streak++;
    } else {
      streak = 0;
    }
    if (streak > Math.max(cols, rows)) {
      break;
    }
  }

  let count = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (visited[j][i]) {
        count++;
      }
    }
  }
  if (count > worldRecord) {
    worldRecord = count;
  }
}
console.log(worldRecord);