const { readFileSync } = require("fs");
const grids = readFileSync("input.txt", "utf-8").split("\n\n").map(grid => grid.split("\n").map(row => row.split("")));

function determineReflection(grid, omitIsHorizontal=false, omitReflection=-1) {
  const cols = grid[0].length;
  const rows = grid.length;
  let isHorizontal = false;
  let reflection = -1;
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
    if (valid && (omitIsHorizontal || omitReflection !== lineI)) {
      isHorizontal = false;
      reflection = lineI;
      break;
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
    if (valid && (!omitIsHorizontal || omitReflection !== lineJ)) {
      isHorizontal = true;
      reflection = lineJ;
      break;
    }
  }
  if (reflection < 0) {
    return null;
  }
  return { isHorizontal, reflection };
}

let reflections = 0;
for (const grid of grids) {
  const cols = grid[0].length;
  const rows = grid.length;
  const oldReflection = determineReflection(grid);
  if (!oldReflection) {
    continue;
  }
  const { isHorizontal: isHorizontal1, reflection: reflection1 } = oldReflection;
  outer3: for (let smudgeJ = 0; smudgeJ < rows; smudgeJ++) {
    for (let smudgeI = 0; smudgeI < cols; smudgeI++) {
      const newGrid = grid.map(row => row.slice());
      newGrid[smudgeJ][smudgeI] = newGrid[smudgeJ][smudgeI] === "#" ? "." : "#";
      const newReflection = determineReflection(newGrid, isHorizontal1, reflection1);
      if (newReflection) {
        const { isHorizontal: isHorizontal2, reflection: reflection2 } = newReflection;
        reflections += (isHorizontal2 ? 100 : 1) * reflection2;
        break outer3;
      }
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