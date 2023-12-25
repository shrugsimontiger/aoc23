// NOT SOLVED, WIP

const { readFileSync } = require("fs");
let stones = readFileSync("input-test.txt", "utf-8").split("\n").map(stone => [stone.split(" @ ").map(coord => coord.split(", ").map(x => parseInt(x))).concat([0])]);

let chains = [];

let winner = null;
outer: for (let n = 1; n <= 1000; n++) {
  for (const stone of stones) {
    const [[x, y, z], [dx, dy, dz]] = stone[stone.length-1];
    stone.push([[x+dx, y+dy, z+dz], [dx, dy, dz], n]);
  }
  for (const stone of stones) {
    const [[x1, y1, z1]] = stone;
    for (const chain of chains) {
      let collinear = true;
      const [[x2, y2, z2]] = chain[0];
      for (const [[x3, y3, z3]] of chain) {
        if ((y2-y1)/(x2-x1) >= (y3-y1)/(x3-x1) - 0.00001 && (y2-y1)/(x2-x1) <= (y3-y1)/(x3-x1) + 0.00001
         || (z2-z1)/(y2-y1) >= (z3-z1)/(y3-y1) - 0.00001 && (z2-z1)/(y2-y1) <= (z3-z1)/(y3-y1) + 0.00001
         || (z2-z1)/(x2-x1) >= (z3-z1)/(x3-x1) - 0.00001 && (z2-z1)/(x2-x1) <= (z3-z1)/(x3-x1) + 0.00001) {
          collinear = false;
        }
      }
      if (collinear) {
        chain.push(stone[stone.length-1]);
      }
    }
  }
  for (let m = 0; m < n; m++) {
    for (const stone1 of stones) {
      for (const stone2 of stones) {
        if (stone1 !== stone2) {
          chains.push([stone1[m], stone2[n]]);
        }
      }
    }
  }
  console.log(chains[0]);
  //console.log(stones);
  for (const chain of chains) {
    let uniqueTimes = {  };
    for (const stone of chain) {
      if (!uniqueTimes[stone[2]]) {
        uniqueTimes[stone[2]] = true;
      }
    }
    if (Object.keys(uniqueTimes).length >= stones.length) {
      winner = chain;
      break outer;
    }
  }
}
const rockX = -winner[0][2] / (winner[1][2] - winner[0][2]) * (winner[1][0][0] - winner[0][0][0]) + winner[0][0][0];
const rockY = -winner[0][2] / (winner[1][2] - winner[0][2]) * (winner[1][0][1] - winner[0][0][1]) + winner[0][0][1];
const rockZ = -winner[0][2] / (winner[1][2] - winner[0][2]) * (winner[1][0][2] - winner[0][0][2]) + winner[0][0][2];
console.log(rockX + rockY + rockZ);