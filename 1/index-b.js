const { readFileSync } = require("fs");
const input = readFileSync("input.txt", "utf-8");
const lines = input.split("\n");
const digits = "0123456789";
const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

let sum = 0;
for (const line of lines) {
  let firstDigit = "";
  let lastDigit = "";
  for (let i = 0; i < line.length; i++) {
    if (digits.includes(line[i])) {
      if (firstDigit === "") {
        firstDigit = line[i];
      }
      lastDigit = line[i];
      continue;
    }
    if (i >= 2) {
      for (let len = 3; len <= 5; len++) {
        const substr = line.slice(i-len+1, i+1);
        const idx = words.indexOf(substr);
        if (idx >= 0) {
          if (firstDigit === "") {
            firstDigit = "" + idx;
          }
          lastDigit = "" + idx;
        }
      }
    }
  }
  sum += parseInt(firstDigit + lastDigit);
}
console.log(sum);