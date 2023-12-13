const { readFileSync } = require("fs");
const paragraphs = readFileSync("input.txt", "utf-8").split("\n\n").map(para => para.split("\n").map(line => line.split(" ")));
const seeds = paragraphs[0][0].slice(1).map(n => parseInt(n));
const conversions = [];
const importantSeeds = [0, 9999999999];
for (let i = 1; i < paragraphs.length; i++) {
  const para = paragraphs[i];
  const aToB = [];
  for (let j = 1; j < para.length; j++) {
    const line = para[j];
    const aRangeStart = parseInt(line[1]);
    const bDiff = parseInt(line[0]) - aRangeStart;
    const aRangeEnd = aRangeStart + parseInt(line[2]);
    const bRangeStart = parseInt(line[0]);
    const aDiff = parseInt(line[1]) - bRangeStart;
    const bRangeEnd = bRangeStart + parseInt(line[2]);
    aToB.push({ aRangeStart, bDiff, aRangeEnd, bRangeStart, aDiff, bRangeEnd });
    importantSeeds.push(reverse(aRangeStart - 1));
    importantSeeds.push(reverse(aRangeStart));
    importantSeeds.push(reverse(aRangeEnd - 1));
    importantSeeds.push(reverse(aRangeEnd));
  }
  conversions.push(aToB);
}
let lowestCurrent = Infinity;
let lowestSeed = Infinity;
for (const seed of importantSeeds) {
//for (let seed = 0; seed < 99; seed++) {
  let valid = false;
  for (let i = 0; i < seeds.length; i += 2) {
    if (seed >= seeds[i] && seed < seeds[i] + seeds[i+1]) {
      valid = true;
      break;
    }
  }
  if (!valid) {
    continue;
  }
  const current = forward(seed);
  if (current < lowestCurrent) {
    lowestCurrent = current;
    lowestSeed = seed;
  }
}
console.log(lowestCurrent);

function forward(seed) {
  let current = seed;
  //console.log();
  //console.log(seed);
  for (const aToB of conversions) {
    for (const { aRangeStart, bDiff, aRangeEnd } of aToB) {
      if (current >= aRangeStart && current < aRangeEnd) {
        current += bDiff;
        //console.log(current, aRangeStart, aRangeEnd);
        break;
      }
    }
  }
  return current;
}

function reverse(current) {
  let seed = current;
  //console.log();
  //console.log(seed);
  for (let i = conversions.length-1; i >= 0; i--) {
    const aToB = conversions[i];
    for (let j = aToB.length-1; j >= 0; j--) {
      const { bRangeStart, aDiff, bRangeEnd } = aToB[j];
      if (seed >= bRangeStart && seed < bRangeEnd) {
        seed += aDiff;
        //console.log(current, aRangeStart, aRangeEnd);
        break;
      }
    }
  }
  return seed;
}