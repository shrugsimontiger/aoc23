const { readFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf-8").split("\n");

let sum = 0;
for (const game of lines) {
  //const tokens = game.split(", ").split("; ").split(": ").flat();
  const tokens = game.split(/[,:;] /);
  let possible = true;
  for (const token of tokens) {
    let [number, color] = token.split(" ");
    if (number !== "Game") {
      number = parseInt(number);
      if (number > 12 && color === "red" || number > 13 && color === "green" || number > 14 && color === "blue") {
        possible = false;
        break;
      }
    }
  }
  if (possible) {
    let [name, number] = tokens[0].split(" ");
    sum += parseInt(number);
  }
}
console.log(sum);