const { readFileSync } = require("fs");
let lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(" "));
const cardOrder = "AKQT98765432J";
lines = lines.map(([hand, bid]) => [hand.split(""), parseInt(bid)]);

function compareCards(a, b) {
  return cardOrder.indexOf(a) - cardOrder.indexOf(b);
}

function calculatePriority(uHand) {
  let hand = uHand.slice().sort(compareCards);
  let jokerCount = 0;
  for (const card of hand) {
    if (card === "J") {
      jokerCount++;
    }
  }
  if (jokerCount === 5) {
    return 0;
  }
  hand = hand.filter(card => card !== "J");
  let groups = [];
  let prevCard = "";
  for (const card of hand) {
    if (card !== prevCard) {
      groups.push(0);
    }
    groups[groups.length-1]++;
    prevCard = card;
  }
  groups.sort((a, b) => b - a);
  groups[0] += jokerCount;
  if (groups[0] === 5) {
    return 0;
  } else if (groups[0] === 4) {
    return 1;
  } else if (groups[0] === 3 && groups[1] === 2) {
    return 2;
  } else if (groups[0] === 3) {
    return 3;
  } else if (groups[0] === 2 && groups[1] === 2) {
    return 4;
  } else if (groups[0] === 2) {
    return 5;
  }
  return 6;
}

function compareHands(handA, handB) {
  const priorityDiff = calculatePriority(handA) - calculatePriority(handB);
  if (priorityDiff !== 0) return priorityDiff;
  for (let i = 0; i < 5; i++) {
    const cardComparison = compareCards(handA[i], handB[i]);
    if (cardComparison !== 0) return cardComparison;
  }
  return 0;
}

lines.sort((a, b) => compareHands(a[0], b[0]));
lines.reverse();
let sum = 0;
let rank = 0;
for (const [hand, bid] of lines) {
  rank++;
  //console.log({ hand, priority: calculatePriority(hand), bid, rank });
  sum += bid * rank;
}
console.log(sum);