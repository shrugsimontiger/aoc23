// NOT SOLVED, WIP

const { readFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(" ")[2]).map(line => [parseInt(line[line.length-2], 16), parseInt(line.slice(2, -2), 16)]);
let currentI = 0;
let currentJ = 0;
let prevDir = lines[0][0];
let turns = 0;

for (const [dir, amount] of lines) {
  if (dir === 0) {
    currentJ -= amount;
  } else if (dir === 1) {
    currentI += amount;
  } else if (dir === 2) {
    currentJ += amount;
  } else if (dir === 3) {
    currentI -= amount;
  }
  checkTurn(dir, prevDir);
  prevDir = dir;
}
checkTurn(lines[0][0], lines[lines.length-1][0]);

function checkTurn(dir, prevDir) {
  const turn = (dir - prevDir + 6) % 4 - 2;
  if (turn === 1) {

  }
}

//console.log(Object.keys(grid).length + Object.keys(explored).length);