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

const starsArr = [];
const starsLookup = {  };
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
        if (lines[newJ][newI] === "*") {
          if (!starsLookup[newI+","+newJ]) {
            const star = { i: newI, j: newJ, numbers: [] };
            starsArr.push(star);
            starsLookup[newI+","+newJ] = star;
          }
          const star = starsLookup[newI+","+newJ];
          star.numbers.push(parseInt(number));
          isPart = true;
        }
      }
      for (let ioff = 0; ioff < number.length+2; ioff++) {
        const newI = i-ioff;
        const newJ = j+1;
        if (lines[newJ][newI] === "*") {
          if (!starsLookup[newI+","+newJ]) {
            const star = { i: newI, j: newJ, numbers: [] };
            starsArr.push(star);
            starsLookup[newI+","+newJ] = star;
          }
          const star = starsLookup[newI+","+newJ];
          star.numbers.push(parseInt(number));
          isPart = true;
        }
      }
      for (let ioff = 0; ioff < number.length+2; ioff++) {
        const newI = i-ioff;
        const newJ = j;
        if (lines[newJ][newI] === "*") {
          if (!starsLookup[newI+","+newJ]) {
            const star = { i: newI, j: newJ, numbers: [] };
            starsArr.push(star);
            starsLookup[newI+","+newJ] = star;
          }
          const star = starsLookup[newI+","+newJ];
          star.numbers.push(parseInt(number));
          isPart = true;
        }
      }
      number = "";
    }
  }
}

let sum = 0;
for (const star of starsArr) {
  if (star.numbers.length === 2) {
    sum += star.numbers[0] * star.numbers[1];
  }
}
console.log(sum);