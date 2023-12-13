const { readFileSync } = require("fs");
const [times, distances] = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(" ").filter(x => x !== "").slice(1).map(x => parseInt(x)));

let product = 1;
for (let i = 0; i < times.length; i++) {
  const [time, distance] = [times[i], distances[i]];
  let count = 0;
  for (let j = 0; j <= time; j++) {
    if (j*(time-j) > distance) {
      count++;
    }
  }
  product *= count;
}
console.log(product);