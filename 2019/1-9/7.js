const input = require('./inputs/7');

console.log("\nThe highest signal that can be sent to the thrusters is:");

const run = (program, inputs) => {
  const outputs = [];
  let inputIdx = -1;

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

      program[param1] = inputs[++inputIdx];
      
      instrPtr += 2;
    }
    else if (op === 4) {
      outputs.push(value1);

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

  return outputs;
}

const permutations = 
[
  [0,1,2,3,4], [0,1,2,4,3], [0,1,3,2,4], [0,1,3,4,2], [0,1,4,2,3], [0,1,4,3,2],
  [0,2,1,3,4], [0,2,1,4,3], [0,2,3,1,4], [0,2,3,4,1], [0,2,4,1,3], [0,2,4,3,1],
  [0,3,2,1,4], [0,3,2,4,1], [0,3,1,2,4], [0,3,1,4,2], [0,3,4,2,1], [0,3,4,1,2],
  [0,4,2,3,1], [0,4,2,1,3], [0,4,3,2,1], [0,4,3,1,2], [0,4,1,2,3], [0,4,1,3,2],

  [1,0,2,3,4], [1,0,2,4,3], [1,0,3,2,4], [1,0,3,4,2], [1,0,4,2,3], [1,0,4,3,2],
  [1,2,0,3,4], [1,2,0,4,3], [1,2,3,0,4], [1,2,3,4,0], [1,2,4,0,3], [1,2,4,3,0],
  [1,3,2,0,4], [1,3,2,4,0], [1,3,0,2,4], [1,3,0,4,2], [1,3,4,2,0], [1,3,4,0,2],
  [1,4,2,3,0], [1,4,2,0,3], [1,4,3,2,0], [1,4,3,0,2], [1,4,0,2,3], [1,4,0,3,2],

  [2,1,0,3,4], [2,1,0,4,3], [2,1,3,0,4], [2,1,3,4,0], [2,1,4,0,3], [2,1,4,3,0],
  [2,0,1,3,4], [2,0,1,4,3], [2,0,3,1,4], [2,0,3,4,1], [2,0,4,1,3], [2,0,4,3,1],
  [2,3,0,1,4], [2,3,0,4,1], [2,3,1,0,4], [2,3,1,4,0], [2,3,4,0,1], [2,3,4,1,0],
  [2,4,0,3,1], [2,4,0,1,3], [2,4,3,0,1], [2,4,3,1,0], [2,4,1,0,3], [2,4,1,3,0],

  [3,1,2,0,4], [3,1,2,4,0], [3,1,0,2,4], [3,1,0,4,2], [3,1,4,2,0], [3,1,4,0,2],
  [3,2,1,0,4], [3,2,1,4,0], [3,2,0,1,4], [3,2,0,4,1], [3,2,4,1,0], [3,2,4,0,1],
  [3,0,2,1,4], [3,0,2,4,1], [3,0,1,2,4], [3,0,1,4,2], [3,0,4,2,1], [3,0,4,1,2],
  [3,4,2,0,1], [3,4,2,1,0], [3,4,0,2,1], [3,4,0,1,2], [3,4,1,2,0], [3,4,1,0,2],

  [4,1,2,3,0], [4,1,2,0,3], [4,1,3,2,0], [4,1,3,0,2], [4,1,0,2,3], [4,1,0,3,2],
  [4,2,1,3,0], [4,2,1,0,3], [4,2,3,1,0], [4,2,3,0,1], [4,2,0,1,3], [4,2,0,3,1],
  [4,3,2,1,0], [4,3,2,0,1], [4,3,1,2,0], [4,3,1,0,2], [4,3,0,2,1], [4,3,0,1,2],
  [4,0,2,3,1], [4,0,2,1,3], [4,0,3,2,1], [4,0,3,1,2], [4,0,1,2,3], [4,0,1,3,2],
];

let bestSignal=-Infinity;

for(const settings of permutations) {
  let signal = 0;

  for(const phaseSetting of settings) {
    signal = run([...input], [phaseSetting, signal])[0]
  }

  bestSignal = Math.max(bestSignal, signal);
}

console.log(`
  ${bestSignal}
`)

// * Your puzzle answer was 21860.

console.log("\nThe highest (feedback) signal that can be sent to the thrusters is:");

function* runGen(program) {
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

      const input = yield;
      program[param1] = input;
      
      instrPtr += 2;
    }
    else if (op === 4) {
      yield value1;

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

  return;
}

const permutations2 = permutations.map(perm => [...perm].map(sig => sig + 5))

bestSignal=-Infinity;

for(const settings of permutations2) {
  const amps = settings.map((setting, i) => runGen([...input], i));

  const [pA, pB, pC, pD, pE] = amps;

  // start the amp generator functions
  amps.forEach(amp => amp.next());

  // first inputs are settings permutation
  amps.forEach((amp, i) => amp.next(settings[i]))
  
  let oA, oB, oC, oD, oE = 0;

  do {
    oA = pA.next(oE).value;
    oB = pB.next(oA).value
    oC = pC.next(oB).value;
    oD = pD.next(oC).value;
    oE = pE.next(oD).value;
  } while (
    amps
      .map(amp => amp.next().done)
      .every(done => !done)
  )

  bestSignal = Math.max(bestSignal, oE);
}

console.log(`
  ${bestSignal}
`)

//* Your puzzle answer was 2645740.
