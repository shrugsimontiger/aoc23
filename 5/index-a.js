const { readFileSync } = require("fs");
const paragraphs = readFileSync("input.txt", "utf-8").split("\n\n").map(para => para.split("\n").map(line => line.split(" ")));
const seeds = paragraphs[0][0].slice(1).map(n => parseInt(n));
const conversions = [];
for (let i = 1; i < paragraphs.length; i++) {
  const para = paragraphs[i];
  const aToB = [];
  for (let j = 1; j < para.length; j++) {
    const line = para[j];
    const aRangeStart = parseInt(line[1]);
    const bDiff = parseInt(line[0]) - aRangeStart;
    const aRangeEnd = aRangeStart + parseInt(line[2]);
    aToB.push({ aRangeStart, bDiff, aRangeEnd });
  }
  conversions.push(aToB);
}

let lowestCurrent = Infinity;
let lowestSeed = Infinity;
for (const seed of seeds) {
  let current = seed;
  for (const aToB of conversions) {
    for (const { aRangeStart, bDiff, aRangeEnd } of aToB) {
      if (current >= aRangeStart && current < aRangeEnd) {
        current += bDiff;
        break;
      }
    }
  }
  if (current < lowestCurrent) {
    lowestCurrent = current;
    lowestSeed = seed;
  }
}
console.log(lowestCurrent);