// NOT SOLVED, WIP

const { readFileSync } = require("fs");
let lines = readFileSync("input-test3.txt", "utf-8").split("\n");
const instructions = lines[0];
lines = lines.slice(2).map(line => line.split(" = "));
const lookup = {  };
for (const [a, b] of lines) {
  const [l, r] = b.split(", ");
  lookup[a] = { L: l.slice(1), R: r.slice(0, -1) };
}

let currentNodes = [];
for (const [a, b] of lines) {
  if (a[2] === "A") {
    currentNodes.push(a);
  }
}
const counts = Array(currentNodes.length).fill(0n);
for (let i = 0; i < currentNodes.length; i++) {
  const repeats = {  };
  let currentNode = currentNodes[i];
  outer: while (true) {
    for (let j = 0; j < instructions.length; j++) {
      const instruction = instructions[j];
      currentNode = lookup[currentNode][instruction];
      console.log(currentNode);
      counts[i]++;
      if (currentNode[2] === "Z") {
        if (!repeats[j]) {
          repeats[j] = counts[i];
        } else {
          counts[i] = { start: repeats[j], data: repeats[j], repeat: counts[i] - repeats[j], continuation: counts[i] };
          break outer;
        }
      }
    }
  }
}

console.log(counts);
let subtractCount = 0n;
while (true) {
  let allMultiple = true;
  for (const { data, repeat } of counts) {
    if (data % repeat !== 0n) {
      allMultiple = false;
    }
  }
  if (allMultiple) {
    break;
  }
  for (let i = 0; i < counts.length; i++) {
    counts[i].data--;
  }
  subtractCount++;
}

let product = counts[0].repeat;
let gcd = counts[0].repeat;
for (let i = 1; i < counts.length; i++) {
  product *= counts[i].repeat;
  let a = gcd;
  let b = counts[i].repeat;
  while (a !== 0n && b !== 0n) {
    if (a > b) {
      a = a % b;
    } else {
      b = b % a;
    }
  }
  if (a > b) {
    gcd = a;
  } else {
    gcd = b;
  }
}
const lcm = product / gcd;
console.log(lcm + subtractCount);

/*

MATH SECTION

000000000011111111112222222222333
012345678901234567890123456789012
...**...*.....*.....#.....*.....*
..*.*...*.......#.......*.......*
........t.......s...s...........e
................2...1............

Given:
s1 = 20
s2 = 16
r1 = 6
r2 = 8

Goal:
t = 8
e = 32

r = lcm(r1, r2)
n1 = s1 mod r
n2 = s2 mod r


*/