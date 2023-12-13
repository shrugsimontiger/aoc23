const { readFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf-8").split("\n");

let sum = 0;
for (const game of lines) {
  //const tokens = game.split(", ").split("; ").split(": ").flat();
  const tokens = game.split(/[,:;] /);
  let maxRed = 0;
  let maxGreen = 0;
  let maxBlue = 0;
  for (const token of tokens) {
    let [number, color] = token.split(" ");
    if (number !== "Game") {
      number = parseInt(number);
      if (number > maxRed && color === "red") {
        maxRed = number;
      }
      if (number > maxGreen && color === "green") {
        maxGreen = number;
      }
      if (number > maxBlue && color === "blue") {
        maxBlue = number;
      }
    }
  }
  sum += maxRed * maxGreen * maxBlue;
}
console.log(sum);