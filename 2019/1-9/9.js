const inputRaw = require('./inputs/9');
const input = inputRaw.map(BigInt);

console.log("\nBOOST keycode is:");

const run = (program, input) => {
  const outputs = [];

  let instrPtr = 0;
  let relativeBase = 0;

  let opcode = Number(program[instrPtr]);

  while(opcode !== 99) {
    const [mode3, mode2, mode1, _, op] = String(opcode).padStart(5,'0').split('').map(Number)
    const [param1, param2, param3] = program.slice(instrPtr+1, instrPtr+4).map(param => param ? BigInt(param) : 0n);
    const value1 = BigInt([program[Number(param1)], param1, program[Number(param1) + relativeBase]][mode1] || 0n);
    const value2 = BigInt([program[Number(param2)], param2, program[Number(param2) + relativeBase]][mode2] || 0n);
    
    if ([1,2,7,8].includes(op)) {
      if (mode3 === 1) throw "Invalid immediate mode for write parameter"

      let result;
      switch (op) {
        case 1:
          result = value1 + value2;
          break;
        case 2:
          result = value1 * value2;
          break;
        case 7:
          result = (value1 < value2) ? 1n : 0n;
          break;
        case 8:
          result = (value1 === value2) ? 1n : 0n;
          break;
        default: 
          result = null;
      }
      if (result == null) {
        throw "Null operation result"
      }
      program[Number(param3) + (mode3 === 2 ? relativeBase : 0)] = result;
      
      instrPtr += 4;
    }
    else if (op === 3) {
      if (mode1 === 1) throw "Invalid immediate mode for write parameter"

      program[Number(param1) + (mode1 === 2 ? relativeBase : 0)] = input;
      
      instrPtr += 2;
    }
    else if (op === 4) {
      outputs.push(value1);

      instrPtr += 2;
    }
    else if (op === 9) {
      relativeBase += Number(value1);
      
      instrPtr += 2;
    }
    else if (op === 5) {
      if (value1 !== 0n) {
        instrPtr = Number(value2);
      } else {
        instrPtr += 3;
      } 
    }
    else if (op === 6) {
      if (value1 === 0n) {
        instrPtr = Number(value2);
      } else {
        instrPtr += 3;
      }
    }
    else {
      throw `Bad opcode (${opcode}) @ ${instrPtr}`;
    }

    opcode = Number(program[instrPtr]);
  }

  return outputs;
}

console.log(`
  ${run([...input], 1)}
`);

// * Your puzzle answer was 2789104029.

console.log("\nThe coordinates of the distress signal are:");

console.log(`
  ${run([...input], 2)}
`)

//* Your puzzle answer was 32869.
