// NOT SOLVED, WIP

const { readFileSync } = require("fs");
const paras = readFileSync("input.txt", "utf-8").split("\n\n").map(para => para.split("\n"));
const workflows = paras[0].map(workflow => workflow.slice(0, -1).split("{"))
                          .map(workflow => ({ name: workflow[0], rules: workflow[1].split(",")
                          .map(rule => rule.split(":"))
                          .map(rule => rule.length === 2 ? { condition: rule[0], goto: rule[1] } : { condition: "", goto: rule[0] }) }));
const parts = paras[1].map(part => part.slice(1, -1).split(",")
                      .map(value => value.split("="))
                      .map(value => [value[0], parseInt(value[1])]));

function findWorkflow(name) {
  for (const workflow of workflows) {
    if (workflow.name === name) {
      return workflow;
    }
  }
  return null;
}

function findValue(part, name) {
  for (const [name2, val] of part) {
    if (name2 === name) {
      return val;
    }
  }
  return null;
}

function parseCondition(condition) {
  const lessThan = condition.indexOf("<");
  const greaterThan = condition.indexOf(">");
  let a, b, comp;
  if (lessThan >= 0) {
    a = condition.slice(0, lessThan);
    b = condition.slice(lessThan+1);
    comp = "<";
  } else {
    a = condition.slice(0, greaterThan);
    b = condition.slice(greaterThan+1);
    comp = ">";
  }
  if (condition === "") {
    return null;
  }
  return { a, b, comp };
}

const importantXs = [];
const importantMs = [];
const importantAs = [];
const importantSs = [];
for (const { name, rules } of workflows) {
  for (const { condition } of rules) {
    const parsed = parseCondition(condition);
    if (parsed) {
      const { a, b, comp } = parsed;
      if (a === "x") {
        importantXs.push({ name, b, comp });
      } else if (a === "m") {
        importantMs.push({ name, b, comp });
      } else if (a === "a") {
        importantAs.push({ name, b, comp });
      } else if (a === "s") {
        importantSs.push({ name, b, comp });
      }
    }
  }
}
importantXs.push({ name: "", b: 0, comp: ">" });
importantMs.push({ name: "", b: 0, comp: ">" });
importantAs.push({ name: "", b: 0, comp: ">" });
importantSs.push({ name: "", b: 0, comp: ">" });
importantXs.push({ name: "", b: 4001, comp: "<" });
importantMs.push({ name: "", b: 4001, comp: "<" });
importantAs.push({ name: "", b: 4001, comp: "<" });
importantSs.push({ name: "", b: 4001, comp: "<" });

function weight({ name, b, comp }) {
  let nextValue = comp === "<" ? 4001 : 0;
  let relevant = true;
  for (const { name2, rules } of workflows) {
    for (const { condition } of rules) {
      const parsed = parseCondition(condition);
      if (parsed) {
        const { b: b2, comp: comp2 } = parsed;
        if (name === name2 && (b !== b2 || comp !== comp2) && ((comp2 === "<") ? (b < b2) : (b > b2))) {
          relevant = false;
        }
        if ((comp === "<") ? (b2 > nextValue && b2 < b) : (b2 < nextValue && b2 > b)) {
          nextValue = b2;
        }
      }
    }
  }
  return relevant ? Math.max(b, nextValue) - Math.min(b, nextValue) : 0;
}

let sum = 0;
for (const x of importantXs) {
  for (const m of importantMs) {
    for (const a of importantAs) {
      for (const s of importantSs) {
        const part = [["x", x.b], ["m", m.b], ["a", a.b], ["s", s.b]];
        let workflow = findWorkflow("in");
        let result;
        outer: while (true) {
          const { name, rules } = workflow;
          inner: for (const { condition, goto } of rules) {
            const parsed = parseCondition(condition);
            if (!parsed || ((parsed.comp === "<") ? (findValue(part, parsed.a) < parsed.b) : (findValue(part, parsed.a) > parsed.b))) {
              if (goto === "A" || goto === "R") {
                result = goto;
                break outer;
              } else {
                workflow = findWorkflow(goto);
                break inner;
              }
            }
          }
        }
        if (result === "A") {
          sum += (findValue(part, "x") + findValue(part, "m") + findValue(part, "a") + findValue(part, "s"))/* * weight(x) * weight(m) * weight(a) * weight(s)*/;
        }
      }
    }
  }
}
console.log(sum);