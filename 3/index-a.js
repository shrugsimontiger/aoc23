const { readFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf-8").split("\n");
let rows = lines.length;
let cols = lines[0].length;
const digits = "0123456789";
lines.unshift(".".repeat(cols));
lines.push(".".repeat(cols));
for (let j = 0; j < rows+2; j++) {
  lines[j] = "." + lines[j] + ".";
}
rows += 2;
cols += 2;

let sum = 0;
for (let j = 0; j < rows; j++) {
  let number = "";
  for (let i = 0; i < cols; i++) {
    if (digits.includes(lines[j][i])) {
      number += lines[j][i];
    } else if (number !== "") {
      let isPart = false;
      for (let ioff = 0; ioff < number.length+2; ioff++) {
        const newI = i-ioff;
        const newJ = j-1;
        if (!digits.includes(lines[newJ][newI]) && lines[newJ][newI] !== ".") {
          isPart = true;
          break;
        }
      }
      for (let ioff = 0; ioff < number.length+2; ioff++) {
        const newI = i-ioff;
        const newJ = j+1;
        if (!digits.includes(lines[newJ][newI]) && lines[newJ][newI] !== ".") {
          isPart = true;
          break;
        }
      }
      for (let ioff = 0; ioff < number.length+2; ioff++) {
        const newI = i-ioff;
        const newJ = j;
        if (!digits.includes(lines[newJ][newI]) && lines[newJ][newI] !== ".") {
          isPart = true;
          break;
        }
      }
      if (isPart) {
        sum += parseInt(number);
      }
      number = "";
    }
  }
}
console.log(sum);