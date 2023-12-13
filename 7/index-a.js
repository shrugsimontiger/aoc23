const { readFileSync } = require("fs");
let lines = readFileSync("input.txt", "utf-8").split("\n").map(line => line.split(" "));
const cardOrder = "AKQJT98765432";
lines = lines.map(([hand, bid]) => [hand.split(""), parseInt(bid)]);

function compareCards(a, b) {
  return cardOrder.indexOf(a) - cardOrder.indexOf(b);
}

function priority0(uHand) {
  const hand = uHand.slice().sort(compareCards);
  return hand[0] === hand[1]
      && hand[0] === hand[2]
      && hand[0] === hand[3]
      && hand[0] === hand[4];
}

function priority1(uHand) {
  const hand = uHand.slice().sort(compareCards);
  return hand[0] === hand[1]
      && hand[0] === hand[2]
      && hand[0] === hand[3]
      || hand[1] === hand[2]
      && hand[1] === hand[3]
      && hand[1] === hand[4];
}

function priority2(uHand) {
  const hand = uHand.slice().sort(compareCards);
  return hand[0] === hand[1]
      && hand[0] === hand[2]
      && hand[3] === hand[4]
      || hand[0] === hand[1]
      && hand[2] === hand[3]
      && hand[2] === hand[4];
}

function priority3(uHand) {
  const hand = uHand.slice().sort(compareCards);
  return hand[0] === hand[1]
      && hand[0] === hand[2]
      || hand[1] === hand[2]
      && hand[1] === hand[3]
      || hand[2] === hand[3]
      && hand[2] === hand[4];
}

function priority4(uHand) {
  const hand = uHand.slice().sort(compareCards);
  return hand[0] === hand[1]
      && hand[2] === hand[3]
      || hand[0] === hand[1]
      && hand[3] === hand[4]
      || hand[1] === hand[2]
      && hand[3] === hand[4];
}

function priority5(uHand) {
  const hand = uHand.slice().sort(compareCards);
  return hand[0] === hand[1]
      || hand[1] === hand[2]
      || hand[2] === hand[3]
      || hand[3] === hand[4];
}

function calculatePriority(hand) {
  if (priority0(hand)) return 0;
  if (priority1(hand)) return 1;
  if (priority2(hand)) return 2;
  if (priority3(hand)) return 3;
  if (priority4(hand)) return 4;
  if (priority5(hand)) return 5;
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
  sum += bid * rank;
}
console.log(sum);