const input = require('./inputs/1');

const fuelRequired = mass => Math.floor(mass / 3) - 2;

console.log("\nThe sum of the fuel requirements for all of the modules on the spacecraft is:");

console.log(`
  ${input.reduce((sum, curr) => sum + fuelRequired(curr), 0)}
`)

//* Your puzzle answer was 3159380.

console.log("\nThe sum of the fuel requirements for all of the modules on the spacecraft when also taking into account the mass of the added fuel is:");

const totalFuel = mod => {
  let mass = mod;
  let sum = 0;

  while(mass > 0) {
    const fuel = Math.max(0, fuelRequired(mass));
    sum += fuel;
    mass = fuel;
  }

  return sum;
}
console.log(`
  ${input.reduce((sum, curr) => sum + totalFuel(curr), 0 )}
`)

//* Your puzzle answer was 4736213.
