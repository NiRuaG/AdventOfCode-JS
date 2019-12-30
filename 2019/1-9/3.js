const input = require('./inputs/3');

console.log("\nThe Manhattan distance from the central port to the closest intersection is:");

const [wire1, wire2] = input.map(pathText => pathText.split(','));

const horizRuns = {};
const vertRuns = {};
let [currX, currY] = [0,0];
let currSteps = 0;

for(const leg of wire1) {
  const dir = leg[0];
  const length = Number(leg.slice(1));

  const distance = length * (dir === 'R' || dir === 'U' ? 1 : -1);
  
  if (dir === 'R' || dir === 'L') {
    // const run = distance < 0 
      // ? [currX+distance, currX, currSteps]
      // : [currX, currX+distance, currSteps]
    const run = [currX, currX+distance, currSteps];

    if (horizRuns[currY] === undefined) {
      horizRuns[currY] = [[...run]]
    } else {
      horizRuns[currY].push([...run])
    }

    currX += distance;
  }
  else if (dir === 'U' || dir === 'D') {
    // const run  = distance < 0
      // ? [currY+distance, currY, currSteps]
      // : [currY, currY+distance, currSteps]

    const run = [currY, currY+distance, currSteps]

    if (vertRuns[currY] === undefined) {
      vertRuns[currX] = [[...run]]
    } else {
      vertRuns[currX].push([...run])
    }

    currY += distance;
  }
  else {
    throw `unknown direction in wire1 ${dir}`
  }

  currSteps += Math.abs(distance);
}

//* Wire 2
[currX, currY] = [0,0];
currSteps = 0;
let bestManhDist = Infinity;
let fewestSteps = Infinity;

const horizKeys = Object.keys(horizRuns);
const vertKeys = Object.keys(vertRuns);

for(const leg of wire2) {
  const dir = leg[0];
  const length = Number(leg.slice(1));

  const distance = length * (dir === 'R' || dir === 'U' ? 1 : -1);

  if (dir === 'R' || dir === 'L') {
    const [left, right]  = distance < 0 ? [currX+distance, currX] : [currX, currX+distance]

    for(const vKey of vertKeys) {
      const vert = Number(vKey);
      if (vert < left || vert > right) continue;

      const runs = vertRuns[vKey];
      for(const [begin, end, stepStart] of runs) {
        const [bottom, top] = begin < end ? [begin, end] : [end, begin];
        
        if (currY >= bottom && currY <= top) {
          const manhDist = Math.abs(vert) + Math.abs(currY);

          if (manhDist < bestManhDist) {
            bestManhDist = manhDist;
          }

          const steps1 = stepStart + Math.abs(currY - begin);
          const steps2 = currSteps + Math.abs(vert - currX);
          const steps = steps1 + steps2;
          if (steps < fewestSteps) {
            fewestSteps = steps;
          }
        }
      }
    }

    currX += distance;
  }
  else if (dir === 'U' || dir === 'D') {
    const [bottom, top]  = distance < 0 ? [currY+distance, currY] : [currY, currY+distance]

    for(const hKey of horizKeys) {
      const horiz = Number(hKey);
      if (horiz < bottom || horiz > top) continue;

      const runs = horizRuns[hKey];
      for(const [begin, end, stepStart] of runs) {
        const [left, right] = begin < end ? [begin, end] : [end, begin];

        if (currX >= left && currX <= right) {
          const manhDist = Math.abs(horiz) + Math.abs(currX);

          if (manhDist < bestManhDist) {
            bestManhDist = manhDist;
          }

          const steps1 = stepStart + Math.abs(currX - begin);
          const steps2 = currSteps + Math.abs(horiz - currY);
          const steps = steps1 + steps2;
          if (steps < fewestSteps) {
            fewestSteps = steps;
          }
        }
      }
    }

    currY += distance;
  }
  else {
    throw `unknown direction in wire2 ${dir}`
  }

  currSteps += Math.abs(distance);
}

console.log(`
  ${bestManhDist}
`)

//* Your puzzle answer was 1195.

console.log(`\nThe fewest combined steps to reach an intersection is:\n
  ${fewestSteps}
`)

//* Your puzzle answer was 91518.