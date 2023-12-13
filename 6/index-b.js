const { readFileSync } = require("fs");
const [time, distance] = readFileSync("input.txt", "utf-8").split("\n").map(line => parseInt(line.split(" ").filter(x => x !== "").slice(1).reduce((a, b) => a+b)));

let product = 1;
let count = 0;
for (let j = 0; j <= time; j++) {
  if (j*(time-j) > distance) {
    count++;
  }
}
product *= count;
console.log(product);