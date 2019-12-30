const input = require('./inputs/4');

console.log("\nThe number of different passwords is:");

const hasTwoAdjacent = (a, b, c, d, e, f) => (
  a === b || b === c || c === d || d === e || e === f
)

const inRange = (a,b,c,d,e,f) => {
  const n = Number([a,b,c,d,e,f].join(''));
  return n >= lowerBound && n <= upperBound;
};

let [lowerBound, upperBound] = input.split('-').map(Number);
let [a,A] = [lowerBound, upperBound].map(b => Math.floor(b/1e5))

let matches = 0;

for (; a <= A; ++a) {
  for (let b = a; b <= 9; ++b) {
    for (let c = b; c <= 9; ++c) {
      for (let d = c; d <= 9; ++d) {
        for (let e = d; e <= 9; ++e) {
          for (let f = e; f <= 9; ++f) {
            if (hasTwoAdjacent(a, b, c, d, e, f) && inRange(a,b,c,d,e,f)) {
              ++matches;
            }
          }
        }
      }
    }
  }
}

console.log(`
  ${matches}
`)

// * Your puzzle answer was 2090.

console.log("\nThe number of different passwords is:");

const hasStrictTwoAdj = (a,b,c,d,e,f) => (
  (         a===b && b!==c) ||
  (a!==b && b===c && c!==d) ||
  (b!==c && c===d && d!==e) ||
  (c!==d && d===e && e!==f) ||
  (d!==e && e===f         )
);

matches = 0;
a = Math.floor(lowerBound/1e5);

for (; a <= A; ++a) {
  for (let b = a; b <= 9; ++b) {
    for (let c = b; c <= 9; ++c) {
      for (let d = c; d <= 9; ++d) {
        for (let e = d; e <= 9; ++e) {
          for (let f = e; f <= 9; ++f) {
            if (hasStrictTwoAdj(a, b, c, d, e, f) && inRange(a,b,c,d,e,f)) {
              ++matches;
            }
          }
        }
      }
    }
  }
}

console.log(`
  ${matches}
`)

//* Your puzzle answer was 1419.