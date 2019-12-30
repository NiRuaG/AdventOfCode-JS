const input = require('./inputs/10');

console.log("\nThe amount of other asteroids detected from the best location is:");

const gcd = (x,y) => {
  while (y) {
    [x,y] = [y, x%y]
  }
  return x;
}

const keyOf = (x,y) => `${x},${y}`;
const coordsFrom = key => key.split(',').map(Number);

const rows = input.split('\n');

const asteroidToAngles = new Map();

rows.forEach((row, myY) => {
  [...row].forEach((char, myX) => {
    if (char !== '#') return;

    const myKey = keyOf(myX, myY);

    const myAngles = [];

    asteroidToAngles.forEach((theirAngles, theirKey) => {
      const [theirX, theirY] = coordsFrom(theirKey);
      const delta = {
        x: theirX - myX,
        y: theirY - myY,
      };
      const deltaGCD = Math.abs(gcd(delta.x, delta.y));
      const [angleX, angleY] = [delta.x/deltaGCD, delta.y/deltaGCD];

      myAngles.push(keyOf(angleX, angleY));
      theirAngles.push(keyOf(-angleX, -angleY));
    })

    asteroidToAngles.set(myKey, myAngles);
  })
})

let bestAsteroidKey = null;
let bestDetection = -Infinity;

asteroidToAngles.forEach((angles, locationKey) => {
  const {size} = new Set(angles)

  if (size > bestDetection) {
    bestAsteroidKey = locationKey;
    bestDetection = size;
  }
})

console.log(`
  ${bestDetection}
  @ ${bestAsteroidKey}
`);

// * Your puzzle answer was 260.

console.log("\nThe 200th asteroid hit is at:");

// hackish: because we now know the asteroid detects more than 200 asteroids,
// it will not go a full rotation, so we don't need to care
// about multiple asteroids on the same angle
const angles = Array.from(new Set(asteroidToAngles.get(bestAsteroidKey)));

const quadrantOf = (x,y) => Math.sign(x)*3 + Math.sign(y);
const quadrantSort = {
  "-1":0, // up          dx = 0, dy < 0 ->  0 *3 + -1 = -1
     2:1, // up-right    dx > 0, dy < 0 ->  1 *3 + -1 =  2
     3:2, // right       dx > 0, dy = 0 ->  1 *3 +  0 =  3
     4:3, // down-right  dx > 0, dy > 0 ->  1 *3 +  1 =  4
     1:4, // down        dx = 0, dy > 0 ->  0 *3 +  1 =  1
  "-2":5, // down-left   dx < 0, dy > 0 -> -1 *3 +  1 = -2
  "-3":6, // left        dx < 0, dy = 0 -> -1 *3 +  0 = -3
  "-4":7, // up-left     dx < 0, dy < 0 -> -1 *3 + -1 = -4
};

angles.sort((angleA, angleB) => {
  const [[xA,yA], [xB,yB]] = [angleA,angleB].map(coordsFrom);

  const qA = quadrantOf(xA, yA);
  const qB = quadrantOf(xB, yB);

  if (qA !== qB) {
    return quadrantSort[qA] - quadrantSort[qB];
  }

  return yA/xA - yB/xB; // within any single quadrant lesser rise/run is better (sorted sooner)
});

const targetAngle = angles[200-1];
const [dX, dY] = coordsFrom(targetAngle);
let [searchX, searchY] = coordsFrom(bestAsteroidKey);
let key;

do {
  searchX += dX;
  searchY += dY;
  key = keyOf(searchX, searchY);
} while (!asteroidToAngles.has(key));

const [x,y] = coordsFrom(key);

console.log(`
  [X,Y] = ${key}
  100 X + Y = ${100 * x + y}
`)

//* Your puzzle answer was 608.
