const inputRaw = require('./inputs/11');
const input = inputRaw.map(BigInt);

console.log("\nNumber of panels painted:");

function* runGen(program) {
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

      const input = yield;
      program[Number(param1) + (mode1 === 2 ? relativeBase : 0)] = input;
      
      instrPtr += 2;
    }
    else if (op === 4) {
      yield value1;

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

const keyOf = (x,y) => `${x},${y}`;
const coordsFrom = key => key.split(',').map(Number);

const painter = runGen([...input]);
painter.next(); // run to first input

const panelColors = new Map();
let [x,y] = [0, 0];
let key = keyOf(x,y);
let dir = 0; // up
let currentColor;

let newColor = painter.next(0); // first input
let nextDir = painter.next();

while (!newColor.done && !nextDir.done) { 
  panelColors.set(key, Number(newColor.value));
  dir = (dir + (Number(nextDir.value) || 3)) % 4;
  if (dir & 1) {
    x += (2-dir);
  } else {
    y += (1-dir);
  }
  key = keyOf(x,y);
  const currentColor = panelColors.get(key) || 0; // undefined -> 0 black, 0 -> 0 
  painter.next();
  // outputs 
  newColor = painter.next(currentColor);
  nextDir = painter.next()
}

console.log(`
  ${panelColors.size}
`);

// * Your puzzle answer was 2293.

console.log("\nRegistration identifier:");

let min = { x:  Infinity, y:  Infinity };
let max = { x: -Infinity, y: -Infinity };

const painter2 = runGen([...input]);
painter2.next(); // run to first input

panelColors.clear();
[x,y] = [0, 0];
key = keyOf(x,y);
dir = 0; // up
currentColor;

newColor = painter2.next(1); // first input
nextDir = painter2.next();

while (!newColor.done && !nextDir.done) { 
  panelColors.set(key, Number(newColor.value));
  dir = (dir + (Number(nextDir.value) || 3)) % 4;
  if (dir & 1) {
    x += (2-dir);
    max.x = Math.max(x, max.x);
    min.x = Math.min(x, min.x);
  } else {
    y += (1-dir);
    max.y = Math.max(y, max.y);
    min.y = Math.min(y, min.y);
  }
  key = keyOf(x,y);
  const currentColor = panelColors.get(key) || 0; // undefined -> 0 black, 0 -> 0 
  painter2.next();
  // outputs 
  newColor = painter2.next(currentColor);
  nextDir = painter2.next()
}

for(let row=max.y; row>=min.y; --row){
  let rowStr = '';
  for(let col=min.x; col<=max.x; ++col){
    const char = panelColors.get(keyOf(col,row)) === 1 ? '#' : '.';

    rowStr = rowStr.concat(char);
  }
  console.log('  ', rowStr);
}

// ..##..#..#.#.....##..###..###...##..#......
// .#..#.#..#.#....#..#.#..#.#..#.#..#.#......
// .#..#.####.#....#....#..#.#..#.#..#.#......
// .####.#..#.#....#....###..###..####.#......
// .#..#.#..#.#....#..#.#....#.#..#..#.#......
// .#..#.#..#.####..##..#....#..#.#..#.####...

//* Your puzzle answer was AHLCPRAL.
