const { readFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf-8").split("\n");

let sum = 0;
for (const line of lines) {
  const [_, [winning, have]] = line.split(": ").map(x => x.split(" | ").map(y => y.split(" ").filter(z => z !== "")));
  let points = 0;
  for (const num1 of winning) {
    for (const num2 of have) {
      if (num1 === num2) {
        points++;
        break;
      }
    }
  }
  points = Math.floor(2 ** (points-1));
  sum += points;
}
console.log(sum);