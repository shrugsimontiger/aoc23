const { readFileSync } = require("fs");
let lines = readFileSync("input-test.txt", "utf-8").split("\n");
lines = lines.map(line => line.split(": ").map(x => x.split(" | ").map(y => y.split(" ").filter(z => z !== ""))));
const copiesArr = Array(lines.length).fill(1);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [_, [winning, have]] = line;
  const copies = copiesArr[i];
  let points = 0;
  for (const num1 of winning) {
    for (const num2 of have) {
      if (num1 === num2) {
        points++;
        break;
      }
    }
  }
  for (let j = i+1; j < i+1+points; j++) {
    copiesArr[j] += copies;
  }
}
let sum = 0;
for (const copies of copiesArr) {
  sum += copies;
}
console.log(sum);