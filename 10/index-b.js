const { readFileSync } = require("fs");
const ascii = readFileSync("input.txt", "utf-8").split("\n").map(row => row.split(""));
const connectivity = {
  ".": { up: false, right: false, down: false, left: false },
  "-": { up: false, right: true , down: false, left: true  },
  "|": { up: true , right: false, down: true , left: false },
  "L": { up: true , right: true , down: false, left: false },
  "F": { up: false, right: true , down: true , left: false },
  "7": { up: false, right: false, down: true , left: true  },
  "J": { up: true , right: false, down: false, left: true  },
  "S": null
}
const grid = ascii.map(row => row.map(char => connectivity[char]));
const cols = grid[0].length;
const rows = grid.length;
let startI = -1;
let startJ = -1;
let currentI = -1;
let currentJ = -1;
outer: for (let j = 0; j < rows; j++) {
  for (let i = 0; i < cols; i++) {
    if (!grid[j][i]) {
      const upNeighbor    = j-1 <  0    ? connectivity["."] : grid[j-1][i];
      const rightNeighbor = i+1 >= cols ? connectivity["."] : grid[j][i+1];
      const downNeighbor  = j+1 >= rows ? connectivity["."] : grid[j+1][i];
      const leftNeighbor  = i-1 <  0    ? connectivity["."] : grid[j][i-1];
      grid[j][i] = { up: upNeighbor.down, right: rightNeighbor.left, down: downNeighbor.up, left: leftNeighbor.right };
      startI = i;
      startJ = j;
      break outer;
    }
  }
}

currentI = startI;
currentJ = startJ;
let prevDir = "";
let loop = Array(rows*2-1).fill().map(_ => Array(cols*2-1).fill(false));
do {
  let newDir = "you shouldn't be seeing this";
  if (grid[currentJ][currentI].up && prevDir !== "down") {
    newDir = "up";
  } else if (grid[currentJ][currentI].right && prevDir !== "left") {
    newDir = "right";
  } else if (grid[currentJ][currentI].down && prevDir !== "up") {
    newDir = "down";
  } else if (grid[currentJ][currentI].left && prevDir !== "right") {
    newDir = "left";
  }
  //console.log(newDir);
  if (newDir === "up") {
    loop[currentJ*2-1][currentI*2] = true;
    currentJ--;
  } else if (newDir === "right") {
    loop[currentJ*2][currentI*2+1] = true;
    currentI++;
  } else if (newDir === "down") {
    loop[currentJ*2+1][currentI*2] = true;
    currentJ++;
  } else if (newDir === "left") {
    loop[currentJ*2][currentI*2-1] = true;
    currentI--;
  }
  loop[currentJ*2][currentI*2] = true;
  prevDir = newDir;
} while (currentI !== startI || currentJ !== startJ);

// Literal stack overflow solution :P
// function explore(i, j, explored) {
//   if (loop[j][i] || explored[j][i]) {
//     return;
//   }
//   explored[j][i] = true;
//   if (j-1 >= 0) {
//     explore(i, j-1, explored);
//   }
//   if (i+1 < cols*2-1) {
//     explore(i+1, j, explored);
//   }
//   if (j+1 < rows*2-1) {
//     explore(i, j+1, explored);
//   }
//   if (i-1 >= 0) {
//     explore(i-1, j, explored);
//   }
// }

function explore(startI, startJ, explored) {
  let stack = [{ i: startI, j: startJ }];
  while (stack.length > 0) {
    const { i, j } = stack.pop();
    if (loop[j][i] || explored[j][i]) {
      continue;
    }
    explored[j][i] = true;
    if (j-1 >= 0) {
      stack.push({ i, j: j-1 });
    }
    if (i+1 < cols*2-1) {
      stack.push({ i: i+1, j });
    }
    if (j+1 < rows*2-1) {
      stack.push({ i, j: j+1 });
    }
    if (i-1 >= 0) {
      stack.push({ i: i-1, j });
    }
  }
}

let enclosed = 0;
let enclosedDebug = Array(rows).fill().map(_ => Array(cols).fill(false));
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < cols; i++) {
    if (loop[j*2][i*2]) {
      continue;
    }
    let explored = Array(rows*2-1).fill().map(_ => Array(cols*2-1).fill(false));
    explore(i*2, j*2, explored);
    //console.log(explored.map((row, j3) => row.map((x, i3) => i3 === i && j3 === j ? "*" : (loop[j3][i3] ? "L" : (x ? "#" : "."))).join("")));
    let isEnclosed = true;
    for (let i2 = 0; i2 < cols*2-1; i2++) {
      if (explored[0][i2] || explored[rows*2-2][i2]) {
        isEnclosed = false;
      }
    }
    for (let j2 = 0; j2 < rows*2-1; j2++) {
      if (explored[j2][0] || explored[j2][cols*2-2]) {
        isEnclosed = false;
      }
    }
    if (isEnclosed) {
      enclosedDebug[j][i] = true;
      enclosed++;
    }
  }
}
//console.log(enclosedDebug.map((row, j3) => row.map((x, i3) => loop[j3*2][i3*2] ? (x ? "?" : ascii[j3][i3]) : (x ? "#" : ".")).join("")).join("\n"));
console.log(enclosed);