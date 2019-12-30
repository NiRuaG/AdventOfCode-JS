const input = require('./inputs/6');

console.log("\nThe total # of in/direct orbits is:");

const orbitPairs = 
  input
  .split('\n')
  .map(orbit => orbit.split(')'))

let orbitMap = new Map();
const orbitInvMap = new Map();

for(const [orbitee, orbiter] of orbitPairs) {
  const orbiters = orbitMap.get(orbitee);
  
  if (orbiters) {
    orbiters.push(orbiter);
  }
  else {
    orbitMap.set(orbitee, [orbiter]);
  }

  orbitInvMap.set(orbiter, orbitee)
}

const countFrom = (node, depth=0) => {
  
  if (!orbitMap.has(node)) {
    return depth;
  }
  
  const orbiters = orbitMap.get(node);
  return  orbiters.reduce(
    (acc, orbiter) => acc + countFrom(orbiter, depth+1),
    depth
  )
}

console.log(`
  ${countFrom('COM')}
`);

// * Your puzzle answer was 308790.

console.log("\nThe minimum number of orbital transfers required is:");

const myOrbitee = orbitInvMap.get('YOU');
const santaOrbitee = orbitInvMap.get('SAN');

const distanceBetween = (node1, node2) => {
  const map1 = new Map([
    [node1, 0]
  ]);
  const map2 = new Map([
    [node2, 0]
  ]);
  let dist1 = 0;
  let dist2 = 0;
  while(node1 || node2) {
    if (map1.has(node2)) return map1.get(node2) + map2.get(node2);
    if (map2.has(node1)) return map2.get(node1) + map1.get(node1);
    if (node1) {
      node1 = orbitInvMap.get(node1);
      map1.set(node1, ++dist1);
    }
    if (node2) {
      node2 = orbitInvMap.get(node2);      
      map2.set(node2, ++dist2);
    }
  }
  
  return false;
}

console.log(`
  ${distanceBetween(myOrbitee, santaOrbitee)}
`)

//* Your puzzle answer was 472.
