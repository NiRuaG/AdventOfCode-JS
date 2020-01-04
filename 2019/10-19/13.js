const inputRaw = require('./inputs/13');
const input = inputRaw.map(BigInt);

console.log("\nNumber of block tiles:");

function* runGen(program) {
  let instrPtr = 0;
  let relativeBase = 0;
  let input;

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
      input = yield value1;

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

  return;
}

const game = runGen([...input]);
const outputs = [...game].map(Number);

const triples = [];
(() => {
  let i = 0;
  const { length } = outputs;
  while (i < length) {
    triples.push(outputs.slice(i, i += 3));
  }
})()

const blockTiles = new Set();

triples.forEach(([x,y,id]) => {
  const key = String([x,y]);

  if (id === 2) 
    blockTiles.add(key)
  else
    blockTiles.delete(key)
});

console.log(`
  ${blockTiles.size}
`);

// * Your puzzle answer was 268.

console.log("Score from beating game:");

const game2Input = [...input];
game2Input[0] = 2; // 2 quarters
const game2 = runGen(game2Input);

let ballX = 0;
let paddleX = 0;
let score = 0;

let done = false;

while(!done) {
  const stickPosition = Math.sign(ballX - paddleX);

  let x,id;
  [{value: x}, , {value: id, done}] = Array.from({length: 3}, _ => game2.next(stickPosition));
  [x,id] = [x,id].map(Number)
  
  if (x === -1) {
    score = id;
  } else if (id === 3) {
    paddleX = x;
  } else if (id === 4) {
    ballX = x;
  }
}

console.log(`
  ${score}
`);


//* Your puzzle answer was 13989.
