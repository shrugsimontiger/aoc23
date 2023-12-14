const { readFileSync } = require("fs");                                                                                                          // Base import statement
const lines = readFileSync("input.txt", "utf-8").split("\n");                                                                                    // List of lines
const grid = readFileSync("input.txt", "utf-8").split("\n");                                                                                     // Grid
const grid = readFileSync("input.txt", "utf-8").split("\n").map(row => row.split(""));                                                           // Mutable grid
const paras = readFileSync("input.txt", "utf-8").split("\n\n").map(para => para.split("\n"));                                                    // Paragraphs of lines
const grids = readFileSync("input.txt", "utf-8").split("\n\n").map(grid => grid.split("\n"));                                                    // Multiple grids
const grids = readFileSync("input.txt", "utf-8").split("\n\n").map(grid => grid.split("\n").map(row => row.split("\n")));                        // Multiple mutable grids
const lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(" "));                                                       // Lines of space-separated values
const lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(", "));                                                      // Lines of comma-separated values
const lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(": ")[0].split(", "));                                       // Lines of comma-separated values with headers
const lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(" ").map(x => parseInt(x)));                                 // Lines of space-separated integers
const lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(", ").map(x => parseInt(x)));                                // Lines of comma-separated integers
const lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(": ")[0].split(", ").map(x => parseInt(x)));                 // Lines of comma-separated integers with headers
const paras = readFileSync("input.txt", "utf-8").split("\n\n").map(para => para.split("\n").map(line => line.split(" ")));                       // Paragraphs of lines of space-separated values
const paras = readFileSync("input.txt", "utf-8").split("\n\n").map(para => para.split("\n").map(line => line.split(" ")).map(x => parseInt(x))); // Paragraphs of lines of space-separated integers