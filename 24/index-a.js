const { readFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(" @ ").map(coord => coord.split(", ").map(x => parseInt(x))));
const testMin = 200000000000000;
const testMax = 400000000000000;

let count = 0;
for (let j = 0; j < lines.length; j++) {
  const [[x1, y1], [dx1, dy1]] = lines[j];
  for (let i = j+1; i < lines.length; i++) {
    const [[x3, y3], [dx3, dy3]] = lines[i];
    const [x2, y2] = [x1+dx1, y1+dy1];
    const [x4, y4] = [x3+dx3, y3+dy3];
    // const ix = ((x1*y2 - y1*x2) * (x3 - x4) - (x1 - x2) * (x3*y4 - y3*x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    // const iy = ((x1*y2 - y1*x2) * (y3 - y4) - (y1 - y2) * (x3*y4 - y3*x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    const ix = x1 + t * (x2 - x1);
    const iy = y1 + t * (y2 - y1);
    if (t >= 0 && u >= 0 && ix >= testMin && ix <= testMax && iy >= testMin && iy <= testMax) {
      count++;
    }
  }
}
console.log(count);