const input = require('./inputs/8');

console.log("\nLayer with the fewest 0's:");

const WIDTH = 25;
const HEIGHT = 6;
const LAYER_SIZE = WIDTH * HEIGHT;

const layers = [];
const {length} = input;

for (let i = 0; i < length; i += LAYER_SIZE) {
  layers.push(input.substring(i, i + LAYER_SIZE));
};

const getLayerData = layer => {
  let counts = [0,0,0];
  for(const char of layer) {
    const digit = Number(char);
    if (digit > 2) continue;
    ++counts[digit];
  }
  return counts;
}

const data = layers.map(getLayerData);
let bestLayerData = data[0];
data.slice(1).forEach(layerData => {
  if (layerData[0] < bestLayerData[0]) {
    bestLayerData = layerData;
  }
});

console.log(`
  ${bestLayerData}
  ${bestLayerData[1] * bestLayerData[2]}
`);

// * Your puzzle answer was 1950.

console.log("\nMessage:\n");

let idx = -1;

for(let row=0; row < HEIGHT; ++row) {
  let rowStr = ""

  for(let col=0; col < WIDTH; ++col) {
    ++idx;
    const pixel = layers.map(layer => layer[idx]).find(pixel => pixel !== '2')
    rowStr = rowStr.concat(pixel === '0' ? ' ' : 'X');
  }

  console.log('  ', rowStr);
}

/*
  XXXX X  X  XX  X  X X    
  X    X X  X  X X  X X    
  XXX  XX   X  X XXXX X    
  X    X X  XXXX X  X X    
  X    X X  X  X X  X X    
  X    X  X X  X X  X XXXX 
*/

//* Your puzzle answer was FKAHL.
