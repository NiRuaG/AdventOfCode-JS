const input = require('./inputs/2');

console.log("\nAfter the program halts, the value left at position 0 is:");


const run = program => {
  let instrPtr = 0;
  let opcode = program[instrPtr];

  while(opcode !== 99) {
    const [addr1, addr2, addrTarget] = program.slice(instrPtr+1, instrPtr+4);
    const [op1, op2] = [addr1, addr2].map(addr => program[addr])
    
    if (opcode === 1) {
      program[addrTarget] = op1 + op2;
    } else if (opcode === 2) {
      program[addrTarget] = op1 * op2;
    }
    else {
      throw `Bad opcode (${opcode}) @ ${instrPtr}`;
    }

    instrPtr += 4;
    opcode = program[instrPtr];
  }

  return program;
}

const program = [...input];

program[1] = 12;
program[2] = 2;

console.log(`
  ${run(program)[0]}
`)

//* Your puzzle answer was 5290681.

const targetOutput = 19690720;

console.log(`\nThe input noun and verb that cause the program to produce the output ${targetOutput} are:`);

const { noun, verb } = (_ => {
  let noun, verb;

  for (noun = 0; noun <= 99; ++noun) {
    for (verb = 0; verb <= 99; ++verb) {
      const program = [...input];

      program[1] = noun;
      program[2] = verb;

      if (run(program)[0] === targetOutput)
        return { noun, verb };
    }
  }
})();

console.log(`
  ${noun} and ${verb} respectively
`);

console.log(`The value of 100 * noun + verb is:
  ${100 * noun + verb}
`);

//* Your puzzle answer was 5741.