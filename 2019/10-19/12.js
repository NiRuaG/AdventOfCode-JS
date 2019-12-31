const input = require('./inputs/12');

console.log("\nThe system's total energy is:");

const { length } = input;

let positions = input.map(inp => inp.split(',').map(a => parseInt(a.split('=')[1])));
let velocities = Array.from({ length }, _ => [0, 0, 0]);

for (let time = 0; time < 1000; ++time) {
  for (let p1 = 0; p1 < length; ++p1) {
    for (let p2 = p1 + 1; p2 < length; ++p2) {
      const pos1 = positions[p1];
      const pos2 = positions[p2];

      pos1.forEach((dim, i) => {
        const sign = Math.sign(pos2[i] - dim);
        velocities[p1][i] += sign;
        velocities[p2][i] += -sign;
      })
    }
  }

  positions = positions.map((pos, i) =>
    pos.map((axis, j) => axis + velocities[i][j]))
}

let totalEnergy = 0;
for (let p = 0; p < length; ++p) {
  const [pot, vel] = [positions, velocities].map(energy =>
    energy[p].reduce((acc, axis) => acc + Math.abs(axis), 0));

  totalEnergy += pot * vel;
}

console.log(`
  ${totalEnergy}
`);

// * Your puzzle answer was 12070.

console.log("\nThe system's state timestep period is:");

const periods = [0,1,2].map((axis, axisI) => {
  let positions = input.map(inp => parseInt(inp.split(',')[axisI].split('=')[1]));
  let velocities = Array(length).fill(0);

  let time=0;
  const positionsSeen = new Set();

  while(!positionsSeen.has(String(positions.concat(velocities)))) {
    positionsSeen.add(String(positions.concat(velocities)))
    ++time;
    for (let p1 = 0; p1 < length; ++p1) {
      for (let p2 = p1 + 1; p2 < length; ++p2) {
        const pos1 = positions[p1];
        const pos2 = positions[p2];
  
        const sign = Math.sign(pos2 - pos1);
        velocities[p1] += sign;
        velocities[p2] += -sign;
      }
    }
  
    positions = positions.map((pos, i) => pos + velocities[i])
  }

  return time;
})


const gcd2 = (x,y) => {
  while (y) {
    [x, y] = [y, x % y];
  }
  return x;
}
const lcm2 = (x,y) => (x/gcd2(x,y))*y;
const lcm = (...x) => x.reduce(lcm2, 1n);


console.log(`
  ${lcm(...periods.map(BigInt))}
`)

//* Your puzzle answer was 500903629351944.
