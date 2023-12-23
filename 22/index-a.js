const { readFileSync } = require("fs");
const bricks = readFileSync("input.txt", "utf-8").split("\n").map(brick => brick.split("~").map(point => point.split(",").map(coord => parseInt(coord))));
const cols = 10;
const rows = 10;
const lays = 400;
bricks.sort((a, b) => a[0][2] - b[0][2]);

function getBrickMap(bricks, ignoreBrick=null) {
  const brickMap = Array(lays).fill().map(_ => Array(rows).fill().map(_ => Array(cols).fill(false)));
  for (const brick of bricks) {
    if (brick === ignoreBrick) {
      continue;
    }
    for (let k = brick[0][2]; k <= brick[1][2]; k++) {
      for (let j = brick[0][1]; j <= brick[1][1]; j++) {
        for (let i = brick[0][0]; i <= brick[1][0]; i++) {
          brickMap[k][j][i] = true;
        }
      }
    }
  }
  return brickMap;
}

function isSupported(brick, brickMap) {
  if (brick[0][2] === 0) {
    return true;
  }
  let supported = false;
  for (let j = brick[0][1]; j <= brick[1][1]; j++) {
    for (let i = brick[0][0]; i <= brick[1][0]; i++) {
      if (brickMap[brick[0][2]-1][j][i]) {
        supported = true;
      }
    }
  }
  return supported;
}

for (const brick of bricks) {
  const brickMap = getBrickMap(bricks);
  while (brick[0][2] > 0) {
    brick[0][2]--;
    brick[1][2]--;
    const supported = isSupported(brick, brickMap);
    if (supported) {
      break;
    }
  }
}

let count = 0;
outer: for (const brick of bricks) {
  const brickMap = getBrickMap(bricks, brick);
  for (const brick2 of bricks) {
    const supported = isSupported(brick2, brickMap);
    if (!supported) {
      continue outer;
    }
  }
  count++;
}
console.log(count);