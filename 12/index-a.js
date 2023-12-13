const { readFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(" "));

let count = 0;
let idx = -1;
for (let [row, requiredGroups] of lines) {
  idx++;
  row = row.split("");
  requiredGroups = requiredGroups.split(",").map(x => parseInt(x));
  const unknowns = [];
  for (let i = 0; i < row.length; i++) {
    if (row[i] === "?") {
      unknowns.push(i);
    }
  }
  for (let i = 0; i < 2**unknowns.length; i++) {
    const combination = i.toString(2).padStart(unknowns.length, "0");
    const newRow = row.slice();
    for (let j = 0; j < unknowns.length; j++) {
      newRow[unknowns[j]] = Number(combination[j]) ? "#" : ".";
    }
    const groups = [0];
    let prevChar = "";
    for (const char of newRow) {
      if (char === "#") {
        if (prevChar === ".") {
          groups.push(0);
        }
        groups[groups.length-1]++;
      }
      prevChar = char;
    }
    if (groups[0] === 0) {
      groups.shift();
    }
    // if (newRow[0] !== "#" && newRow[1] !== "#") {
    //   console.log({ row, requiredGroups, newRow, groups });
    // }
    let same = true;
    if (groups.length !== requiredGroups.length) {
      same = false;
      continue;
    }
    for (let j = 0; j < groups.length; j++) {
      if (groups[j] !== requiredGroups[j]) {
        same = false;
      }
    }
    if (same) {
      count++;
    }
  }
}
console.log(count);