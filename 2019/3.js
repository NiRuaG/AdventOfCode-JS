const input = require('./inputs/3');

console.log("\nThe Manhattan distance from the central port to the closest intersection is:");

const [wire1, wire2] = input.map(pathText => pathText.split(','));

const dimensions = path => 
  path.reduce((accum, leg) => {
    const {at, max} = accum;

    const dir = leg[0];
    const length = Number(leg.slice(1));
    switch (dir) {
      case 'U':
        at.vert += length;
        if (at.vert > max.up) {
          max.up = at.vert;
        }
        break;
      case 'D':
        at.vert -= length;
        if (at.vert < max.down) {
          max.down = at.vert;
        }
        break;
      case 'L':
        at.horiz -= length;
        if (at.horiz < max.left) {
          max.left = at.horiz;
        }
        break;
      case 'R':
        at.horiz += length;
        if (at.horiz > max.right) {
          max.right = at.horiz;
        }
        break;
      default:
        throw `Bad direction ${dir}`
    }

    return {at, max};
  }, {
    at: {
      vert: 0,
      horiz: 0,
    },

    max: {
      up: 0, down: 0,
      left: 0, right: 0
    }
  }).max


// const maxRight = .max()
console.log([wire1, wire2].map(dimensions))

// console.log(`
//   ${run(program)[0]}
// `)

// //* Your puzzle answer was 5290681.

// const targetOutput = 19690720;

// console.log(`\nThe input noun and verb that cause the program to produce the output ${targetOutput} are:`);

// const { noun, verb } = (_ => {
//   let noun, verb;

//   for (noun = 0; noun <= 99; ++noun) {
//     for (verb = 0; verb <= 99; ++verb) {
//       const program = [...input];

//       program[1] = noun;
//       program[2] = verb;

//       if (run(program)[0] === targetOutput)
//         return { noun, verb };
//     }
//   }
// })();

// console.log(`
//   ${noun} and ${verb} respectively
// `);

// console.log(`The value of 100 * noun + verb is:
//   ${100 * noun + verb}
// `);

// //* Your puzzle answer was 5741.