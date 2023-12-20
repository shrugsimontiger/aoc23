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

let sum = 0;
for (const part of parts) {
  let workflow = findWorkflow("in");
  let result;
  outer: while (true) {
    const { name, rules } = workflow;
    inner: for (const { condition, goto } of rules) {
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
      if (condition === "" || ((comp === "<") ? (findValue(part, a) < b) : (findValue(part, a) > b))) {
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
    sum += findValue(part, "x") + findValue(part, "m") + findValue(part, "a") + findValue(part, "s");
  }
}
console.log(sum);