const { readFileSync } = require("fs");
const sequences = readFileSync("input.txt", "utf-8").split("\n").map(sqc => sqc.split(" ").map(n => parseInt(n)));

function newSequence(sqc) {
  const newSqc = [];
  for (let i = 0; i < sqc.length-1; i++) {
    newSqc.push(sqc[i+1] - sqc[i]);
  }
  return newSqc;
}

let sum = 0;
for (const sqc of sequences) {
  let subsequences = [sqc];
  let currentSqc = sqc;
  while (true) {
    let allZero = true;
    for (let i = 0; i < currentSqc.length; i++) {
      if (currentSqc[i] !== 0) {
        allZero = false;
      }
    }
    if (allZero) {
      break;
    }
    currentSqc = newSequence(currentSqc);
    subsequences.push(currentSqc);
  }
  subsequences[subsequences.length-1].unshift(0);
  for (let i = subsequences.length-2; i >= 0; i--) {
    const sqcA = subsequences[i];
    const sqcB = subsequences[i+1];
    sqcA.unshift(sqcA[0] - sqcB[0]);
  }
  const finalSqc = subsequences[0];
  sum += finalSqc[0];
}
console.log(sum);