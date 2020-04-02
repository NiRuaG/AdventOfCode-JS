const puzzleInput = require('./inputs/15')
const program = puzzleInput.map(BigInt);

function* runGen(program, input) {
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

      // console.log("op 3", input)
      program[Number(param1) + (mode1 === 2 ? relativeBase : 0)] = input;
      
      instrPtr += 2;
    }
    else if (op === 4) {
      // console.log("op 4 pre", input)
      input = yield value1;
      // console.log("op 4 post", input)

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

console.log("\nThe fewest moves to the oxygen system is:");

const [NORTH, SOUTH, WEST, EAST] = [1,2,3,4];
const ALL_DIRECTIONS = [NORTH, SOUTH, WEST, EAST];
const [WALL, OPEN, O2SYSTEM] = [0n,1n,2n];
const ALL_STATUSES = new Set([WALL, OPEN, O2SYSTEM]);

keyOf = ({x,y}) => String([x,y])
pointOf = key => {
  const [x,y] = key.split(",").map(Number)
  return {x,y}
}
const gridMap = new Map();

const directionToDelta = new Map([
  [NORTH, {x:  0, y:  1}],
  [SOUTH, {x:  0, y: -1}],
  [ EAST, {x:  1, y:  0}],
  [ WEST, {x: -1, y:  0}],
])
pointInDirection = ({x,y, direction}) => {
  const {x: deltaX, y: deltaY} = directionToDelta.get(direction);
  return {
    x: x += deltaX,
    y: y += deltaY,
  }
}

const directionToOpp = new Map([
  [NORTH, SOUTH],
  [SOUTH, NORTH],
  [ EAST,  WEST],
  [ WEST,  EAST],
]);
oppositeOf = direction => directionToOpp.get(direction);

const statusToChar = new Map([
  [    WALL, '#'],
  [    OPEN, "."],
  [O2SYSTEM, "!"],
]);

const firstOf = set => set.values().next().value

let point = {x:0, y:0}
let distance = 0;
gridMap.set(keyOf(point), {
  status: OPEN,
  distance,
  leftToSearch: new Set(ALL_DIRECTIONS),
});
let direction = NORTH;

const droidMachine = runGen([...program], direction);

let step = 0;
while(true) {
  ++step;
  // if (step%100 === 0){
      // console.log({step})
      // printMap(gridMap, point);
  // }

  let {value: status} = droidMachine.next(direction);

  const key = keyOf(point);
  const nextPoint = pointInDirection({...point,direction});
  const nextKey = keyOf(nextPoint);

  let {leftToSearch, backTrack, distance: dist} = gridMap.get(key);
  distance = dist;
  leftToSearch.delete(direction); //! direct mutation

  if (!ALL_STATUSES.has(status)) 
    throw `Unknown status ${status}`;

  if (status !== WALL)
    ++distance;

  const nextToSearch = new Set(
    ALL_DIRECTIONS.filter(direction => {
      const point = pointInDirection({...nextPoint, direction})
      const maybeGot = gridMap.get(keyOf(point))
      return maybeGot == undefined || maybeGot.status !== WALL
    })
  );
  nextToSearch.delete(oppositeOf(direction));

  // ! debug - checking if there are multiple paths to an open point
  if (gridMap.has(nextKey) && status !== WALL) {
    printMap(gridMap, point);
    throw ["already knew about", nextKey, "status", status].join(' ');
  }

  gridMap.set(nextKey, {
    status,
    distance,
    leftToSearch: nextToSearch,
    backTrack: oppositeOf(direction),
  });

  if (status === O2SYSTEM) break;

  if (status === OPEN) {
    point = {...nextPoint};
    direction = firstOf(nextToSearch) || direction;
  } else {
    while (leftToSearch.size === 0) {
      //* "Deadend" *
      direction = backTrack;
      point = pointInDirection({...point, direction});
      droidMachine.next(direction);
      --distance;
      ({leftToSearch, backTrack} = gridMap.get(keyOf(point)));
    }

    direction = firstOf(leftToSearch);
  }
}

console.log(`
  ${distance}
`)
printMap(gridMap, point);

function printMap(gridMap, {x: endX, y: endY}) {
  // console.log({gridMap});  
  const {xmin, xmax, ymin, ymax} =
    [...gridMap.keys()].reduce(({xmin, xmax, ymin, ymax}, key) => {
      const {x,y} = pointOf(key);
      return ({
        xmin: Math.min(x, xmin),
        xmax: Math.max(x, xmax),
        ymin: Math.min(y, ymin),
        ymax: Math.max(y, ymax),
      })
    }, {
      xmin: Infinity,
      xmax: -Infinity,
      ymin: Infinity,
      ymax: -Infinity
    });
  
  // console.log({xmin, xmax, ymin, ymax})
  
  const length = xmax-xmin+1;
  const colLines = Array.from({length}, (_,k)=> {
    const x = k + xmin;
    return x === 0 ? "O": x === endX ? "|" : Math.abs(x)%10;
  }).join("");
  console.log(`  ${colLines}  `);
  for(let y = ymax; y >= ymin; --y) {
    const rowLine = y===0 ? "O" : y === endY ? "-" : Math.abs(y)%10;
    const rowString = Array.from({length}, (_,k) => {
      const x = k + xmin;
      const {status, distance} = gridMap.get(keyOf({x,y})) || {}
      if (x===0 && y===0) return "O"
      if (x===endX && y===endY) return "D"
      // if (status === OPEN) return distance%10;
      // if ([UNKNOWN, OPEN].includes(status)) {
      //   if (x===endX) return "|";
      //   if (y===endY) return "-";
      // }
      return statusToChar.get(status) || ' ';
    }).join('')

    console.log(`${rowLine} ${rowString} ${rowLine}`);
  }
  console.log(`  ${colLines}  `);
}

// * Your puzzle answer was 354.

console.log("\nlorem ipsum is:");

console.log(`
`)

// * Your puzzle answer was __.
