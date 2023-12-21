// NOT SOLVED, WIP

const { readFileSync } = require("fs");
const modules = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(" -> ")).map(line => ({ type: line[0][0], name: line[0].slice(1), outputs: line[1].split(", "), storage: line[0][0] === "&" ? {  } : -1 }));
const modulesMap = {  }
for (const module of modules) {
  modulesMap[module.name] = module;
}
for (const { type, name: name1, storage } of modules) {
  if (type === "&") {
    for (const { name: name2, outputs } of modules) {
      for (const name3 of outputs) {
        if (name1 === name3) {
          storage[name2] = -1;
        }
      }
    }
  }
}

const logGen = 0;
for (let n = 0; true; n++) {
  let pulseQueue = [];
  for (const module of modules) {
    if (module.type === "b") {
      pulseQueue.push({ type: -1, moduleFrom: null, moduleTo: module });
      break;
    }
  }
  while (pulseQueue.length > 0) {
    const { type: pulseType, moduleFrom, moduleTo } = pulseQueue.shift();
    const { type: moduleType, name, outputs, storage } = moduleTo;
    if (name === "rx" && pulseType < 0) {
      console.log(n);
      break;
    }
    if (moduleType === "%" && pulseType < 0) {
      moduleTo.storage = -storage;
      for (const output of outputs) {
        // if (n === logGen) {
        //   console.log(`${name} -${moduleTo.storage < 0 ? "low" : "high"}-> ${output}`);
        // }
        if (modulesMap[output]) {
          pulseQueue.push({ type: moduleTo.storage, moduleFrom: moduleTo, moduleTo: modulesMap[output] });
        }
      }
    } else if (moduleType === "&") {
      moduleTo.storage[moduleFrom.name] = pulseType;
      let allHigh = true;
      for (const bit of Object.values(storage)) {
        if (bit < 0) {
          allHigh = false;
        }
      }
      for (const output of outputs) {
        // if (n === logGen) {
        //   console.log(`${name} -${allHigh ? "low" : "high"}-> ${output}`);
        // }
        if (modulesMap[output]) {
          pulseQueue.push({ type: allHigh ? -1 : 1, moduleFrom: moduleTo, moduleTo: modulesMap[output] });
        }
      }
    } else if (moduleType === "b") {
      for (const output of outputs) {
        // if (n === logGen) {
        //   console.log(`${name} -${pulseType < 0 ? "low" : "high"}-> ${output}`);
        // }
        if (modulesMap[output]) {
          pulseQueue.push({ type: pulseType, moduleFrom: moduleTo, moduleTo: modulesMap[output] });
        }
      }
    }
  }
}