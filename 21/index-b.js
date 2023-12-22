// NOT SOLVED, WIP

const { readFileSync } = require("fs");
let grid = readFileSync("input-test.txt", "utf-8").split("\n").map(row => row.split("").map(x => x === "#" ? null : (x === "." ? {  } : { "0,0": true })));
const rows = grid[0].length;
const cols = grid.length;

function getPage(pageI, pageJ) {
  return grid.map(row => row.map(x => x === null ? "#" : (x[pageI+","+pageJ] ? "O" : ".")));
}

function samePage(pageA, pageB) {
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (pageA[j][i] !== pageB[j][i]) {
        return false;
      }
    }
  }
  return true;
}

/*
O.O.O.O.O.O
.O.O.###.#.
O###O##.O#O
.O#O#O.O#..
O.O.#.#....
.##O.O####.
O##.O#...#.
.O.O.O.##..
O##.#.####.
.##O.##.##.
O.O........

....O.O.O.O
.....###.#.
.###.##.O#O
.O#O#O.O#O.
O.O.#.#.O.O
.##O.O####.
O##.O#O.O#O
.O.O.O.##O.
O##.#.####O
.##O.##O##.
O.O.O.O.O.O
*/
let maxPageI = 0;
let pages = [[]];
let N;
for (let n = 0; n < 28; n++) {
  const newGrid = grid.map(row => row.map(x => x === null ? null : {  }));
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (grid[j][i] !== null) {
        for (const page of Object.keys(grid[j][i])) {
          const [pageI, pageJ] = page.split(",").map(x => parseInt(x));
          if (grid[(j+rows-1)%rows][i] !== null) {
            if (j-1 >= 0) {
              newGrid[j-1][i][page] = true;
            } else {
              newGrid[rows-1][i][pageI+","+(pageJ-1)] = true;
            }
          }
          if (grid[j][(i+1)%cols] !== null) {
            if (i+1 < cols) {
              newGrid[j][i+1][page] = true;
            } else {
              newGrid[j][0][(pageI+1)+","+pageJ] = true;
              if (pageI+1 > maxPageI) {
                maxPageI++;
              }
            }
          }
          if (grid[(j+1)%rows][i] !== null) {
            if (j+1 < rows) {
              newGrid[j+1][i][page] = true;
            } else {
              newGrid[0][i][pageI+","+(pageJ+1)] = true;
            }
          }
          if (grid[j][(i+cols-1)%cols] !== null) {
            if (i-1 >= 0) {
              newGrid[j][i-1][page] = true;
            } else {
              newGrid[j][cols-1][(pageI-1)+","+pageJ] = true;
            }
          }
        }
      }
    }
  }
  grid = newGrid;
  if (pages.length < maxPageI+1) {
    pages.push([]);
  }
  pages[maxPageI].push(getPage(maxPageI, maxPageI));
  const setsOfPages = pages.length;
  const pagesPerSet = pages[setsOfPages-1].length;
  console.log(pages.map(pageSet => pageSet.length));
  if (pages.length > 1 && pagesPerSet <= pages[setsOfPages-2].length && samePage(pages[setsOfPages-1][pagesPerSet-1], pages[setsOfPages-2][pagesPerSet-1])) {
    N = n;
    break;
  }
}

const period = pages[pages.length-2].length;
const additionalIterations = pages.length * period + (26501365 - N) % period;
for (let n = 0; n < additionalIterations; n++) {
  const newGrid = grid.map(row => row.map(x => x === null ? null : {  }));
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (grid[j][i] !== null) {
        for (const page of Object.keys(grid[j][i])) {
          const [pageI, pageJ] = page.split(",").map(x => parseInt(x));
          if (grid[(j+rows-1)%rows][i] !== null) {
            if (j-1 >= 0) {
              newGrid[j-1][i][page] = true;
            } else {
              newGrid[rows-1][i][pageI+","+(pageJ-1)] = true;
            }
          }
          if (grid[j][(i+1)%cols] !== null) {
            if (i+1 < cols) {
              newGrid[j][i+1][page] = true;
            } else {
              newGrid[j][0][(pageI+1)+","+pageJ] = true;
            }
          }
          if (grid[(j+1)%rows][i] !== null) {
            if (j+1 < rows) {
              newGrid[j+1][i][page] = true;
            } else {
              newGrid[0][i][pageI+","+(pageJ+1)] = true;
            }
          }
          if (grid[j][(i+cols-1)%cols] !== null) {
            if (i-1 >= 0) {
              newGrid[j][i-1][page] = true;
            } else {
              newGrid[j][cols-1][(pageI-1)+","+pageJ] = true;
            }
          }
        }
      }
    }
  }
  grid = newGrid;
}

console.log(grid.map(row => row.map(x => x === null ? "#" : (x["1,0"] ? "O" : ".")).join("")).join("\n") + "\n");
function countOs(pageI, pageJ) {
  const page = getPage(pageI, pageJ);
  let count = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (page[j][i] === "O") {
        count++;
      }
    }
  }
  return count;
}
const currentPageWidth = 6;
const targetPageWidth = Math.floor(26501365 / period);
let finalCount = 0;
for (let pageI = -currentPageWidth; pageI <= currentPageWidth; pageI++) {
  for (let pageJ = -currentPageWidth; pageJ <= currentPageWidth; pageJ++) {
    finalCount += countOs(pageI, pageJ);
  }
}
finalCount += countOs(currentPageWidth-1, 0) * (Math.floor(targetPageWidth/2) - Math.ceil(currentPageWidth/2));
finalCount += countOs(currentPageWidth-2, 0) * ((Math.ceil(targetPageWidth/2)*2-1)/2 - (Math.floor(currentPageWidth/2)*2-1)/2);