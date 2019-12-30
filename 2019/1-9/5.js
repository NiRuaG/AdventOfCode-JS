const input = require('./inputs/5');

console.log("\nDiagnostic code is:");

const run = (program, input) => {
  const output = [];

  let instrPtr = 0;
  let opcode = program[instrPtr];

  while(opcode !== 99) {
    const [mode3, mode2, mode1, _, op] = String(opcode).padStart(5,'0').split('').map(Number)
    const [param1, param2, param3] = program.slice(instrPtr+1, instrPtr+4);
    const value1 = mode1 === 1 ? param1 : program[param1];
    const value2 = mode2 === 1 ? param2 : program[param2];

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
          result = (value1 < value2) & 1;
          break;
        case 8:
          result = (value1 === value2) & 1;
          break;
        default: 
          result = null;
      }
      if (result == null) {
        throw "Null operation result"
      }
      program[param3] = result;
      
      instrPtr += 4;
    }
    else if (op === 3) {
      if (mode1 === 1) throw "Invalid immediate mode for write parameter"

      program[param1] = input;
      
      instrPtr += 2;
    }
    else if (op === 4) {
      output.push(value1);

      instrPtr += 2;
    }
    else if (op === 5){
      if (value1 !== 0) {
        instrPtr = value2;
      } else {
        instrPtr += 3;
      } 
    }
    else if (op === 6) {
      if (value1 === 0) {
        instrPtr = value2;
      } else {
        instrPtr += 3;
      }
    }
    else {
      throw `Bad opcode (${opcode}) @ ${instrPtr}`;
    }

    opcode = program[instrPtr];
  }

  return output;
}

let [diagCode, ...tests] = run([...input], 1).reverse();
if (tests.some(test => test !== 0)) {
  throw `Tests did not all pass ${tests}`
}
console.log(`
  ${diagCode}
`)

// * Your puzzle answer was 4511442.

console.log("\nDiagnostic code for System ID 5 is:");

diagCode = run([...input], 5)[0];

console.log(`
  ${diagCode}
`)

// //* Your puzzle answer was 12648139.
