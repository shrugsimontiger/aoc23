const { readFileSync } = require("fs");
const lines = readFileSync("input.txt", "utf-8").split(",");
const boxes = Array(256).fill().map(_ => []);

for (const str of lines) {
  let label;
  if (str.includes("-")) {
    label = str.slice(0, -1);
  } else if (str.includes("=")) {
    label = str.slice(0, -2);
  }
  let hash = 0;
  for (const char of label) {
    hash += char.charCodeAt(0);
    hash *= 17;
    hash %= 256;
  }
  const box = boxes[hash];
  if (str.includes("-")) {
    label = str.slice(0, -1);
    for (let i = box.length-1; i >= 0; i--) {
      if (box[i].slice(0, -2) === label) {
        box.splice(i, 1);
        break;
      }
    }
  } else if (str.includes("=")) {
    label = str.slice(0, -2);
    const focalLength = str[4];
    let found = false;
    for (let i = box.length-1; i >= 0; i--) {
      if (box[i].slice(0, -2) === label) {
        box.splice(i, 1, str);
        found = true;
        break;
      }
    }
    if (!found) {
      box.push(str);
    }
  }
}

let sum = 0;
for (let i = 0; i < boxes.length; i++) {
  const box = boxes[i];
  for (let j = 0; j < box.length; j++) {
    const focalLength = parseInt(box[j][box[j].length - 1]);
    sum += (i+1) * (j+1) * focalLength;
  }
}
console.log(sum);