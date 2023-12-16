const { readFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf-8").split(",");

let sum = 0;
for (const str of lines) {
  let hash = 0;
  for (const char of str) {
    hash += char.charCodeAt(0);
    hash *= 17;
    hash %= 256;
  }
  sum += hash;
}
console.log(sum);