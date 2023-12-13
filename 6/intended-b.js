const { readFileSync } = require("fs");
const [time, distance] = readFileSync("input.txt", "utf-8").split("\n").map(line => parseInt(line.split(" ").filter(x => x !== "").slice(1).reduce((a, b) => a+b)));
const x = (time - Math.sqrt(time**2 - 4*distance)) * 0.5;
const y = (time + Math.sqrt(time**2 - 4*distance)) * 0.5;
console.log(Math.floor(y) - Math.ceil(x) + 1);

/*

x(b-x) > c

FOR NOW
x(b-x) = c
bx - x^2 = c
(-1)x^2 + bx - c = 0

x = (b + sqrt(b^2 - 4c)) * 0.5
y = (b - sqrt(b^2 - 4c)) * 0.5

Answer: |y-x+1|

*/