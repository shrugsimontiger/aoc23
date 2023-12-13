const { readFileSync } = require("fs");
const input = readFileSync("input.txt", "utf-8");
const lines = input.split("\n");
const digits = "0123456789";

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
    }
  }
  sum += parseInt(firstDigit + lastDigit);
}
console.log(sum);