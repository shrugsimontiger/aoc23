// NOT SOLVED, WIP

const { readFileSync } = require("fs");
const grid = readFileSync("input.txt", "utf-8").split("\n");
const cols = grid[0].length;
const rows = grid.length;

function search(currentI, currentJ, targetI, targetJ, used_) {
  const used = used_.map(row => row.slice());
  const choicePoints = [];
  for (let n = 1; true; n++) {
    let valid = [];
    if (currentJ-1 >= 0 && (grid[currentJ-1][currentI] === "#") && !used[currentJ-1][currentI]) {
      valid.push(0);
    }
    if (currentI+1 < cols && (grid[currentJ][currentI+1] === "#") && !used[currentJ][currentI+1]) {
      valid.push(1);
    }
    if (currentJ+1 < rows && (grid[currentJ+1][currentI] === "#") && !used[currentJ+1][currentI]) {
      valid.push(2);
    }
    if (currentI-1 >= 0 && (grid[currentJ][currentI-1] === "#") && !used[currentJ][currentI-1]) {
      valid.push(3);
    }
    if (valid.length <= 1) {
      used[currentJ][currentI] = n;
      if (valid[0] === 0) {
        currentJ--;
      } else if (valid[0] === 1) {
        currentI++;
      } else if (valid[0] === 2) {
        currentJ++;
      } else if (valid[0] === 3) {
        currentI--;
      }
      if (currentI === currentJ && targetI === targetJ) {
        return { used, currentI, currentJ };
      }
    } else {
      let searches = [];
      for (const choice of valid) {
        used[currentJ][currentI] = n;
        if (choice === 0) {
          currentJ--;
        } else if (choice === 1) {
          currentI++;
        } else if (choice === 2) {
          currentJ++;
        } else if (choice === 3) {
          currentI--;
        }
        searches.push(search(currentI, currentJ, targetI, targetJ, used, searches));
        used[currentJ][currentI] = 0;
        currentI = prevI;
        currentJ = prevJ;
      }
      const { currentI: newTargetI, currentJ: newTargetJ } = searches[searches.length-1];
      for (const { used } of searches) {
        let newTargetN;
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            //if ()
          }
        }
      }
      return search(currentI, currentJ, newTargetI, newTargetJ, used);
    }
  }
}
//Array(rows).fill().map(_ => Array(cols).fill(0));