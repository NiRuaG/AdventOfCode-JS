https://adventofcode.com/2019

---
## --- Day 10: Monitoring Station ---

You fly into the asteroid belt and reach the Ceres monitoring station. The Elves here have an emergency: they're having trouble tracking all of the asteroids and can't be sure they're safe.

The Elves would like to build a new monitoring station in a nearby area of space; they hand you a map of all of the asteroids in that region (your puzzle input).

The map indicates whether each position is empty (`.`) or contains an asteroid (`#`). The asteroids are much smaller than they appear on the map, and every asteroid is exactly in the center of its marked position. The asteroids can be described with `X,Y` coordinates where `X` is the distance from the left edge and `Y` is the distance from the top edge (so the top-left corner is `0,0` and the position immediately to its right is `1,0`).

Your job is to figure out which asteroid would be the best place to build a **new monitoring station**. A monitoring station can **detect** any asteroid to which it has **direct line of sight** - that is, there cannot be another asteroid **exactly** between them. This line of sight can be at any angle, not just lines aligned to the grid or diagonally. The **best** location is the asteroid that can **detect** the largest number of other asteroids.

For example, consider the following map:

`.#..#`  
`.....`  
`#####`  
`....#`  
`...`**`#`**`#`  

The best location for a new monitoring station on this map is the highlighted asteroid at `3,4` because it can detect `8` asteroids, more than any other location. (The only asteroid it cannot detect is the one at `1,0`; its view of this asteroid is blocked by the asteroid at `2,2`.) All other asteroids are worse locations; they can detect `7` or fewer other asteroids. Here is the number of other asteroids a monitoring station on each asteroid could detect:

`.7..7`  
`.....`  
`67775`  
`....7`  
`...87`  

Here is an asteroid (`#`) and some examples of the ways its line of sight might be blocked. If there were another asteroid at the location of a capital letter, the locations marked with the corresponding lowercase letter would be blocked and could not be detected:
```
#.........
...A......
...B..a...
.EDCG....a
..F.c.b...
.....c....
..efd.c.gb
.......c..
....f...c.
...e..d..c
```
Here are some larger examples:

- Best is `5,8` with `33` other asteroids detected:  
`......#.#.`  
`#..#.#....`  
`..#######.`  
`.#.#.###..`  
`.#..#.....`  
`..#....#.#`  
`#..#....#.`  
`.##.#..###`  
`##...`**`#`**`..#.`  
`.#....####`  

- Best is `1,2` with `35` other asteroids detected:  
`#.#...#.#.`  
`.###....#.`  
`.`**`#`**`....#...`  
`##.#.#.#.#`  
`....#.#.#.`  
`.##..###.#`  
`..#...##..`  
`..##....##`  
`......#...`  
`.####.###.`  

- Best is `6,3` with `41` other asteroids detected:  
`.#..#..###`  
`####.###.#`  
`....###.#.`  
`..###.`**`#`**`#.#`  
`##.##.#.#.`  
`....###..#`  
`..#.#..#.#`  
`#..#.#.###`  
`.##...##.#`  
`.....#.#..`  

- Best is `11,13` with `210` other asteroids detected:  
`.#..##.###...#######`  
`##.############..##.`  
`.#.######.########.#`  
`.###.#######.####.#.`  
`#####.##.#.##.###.##`  
`..#####..#.#########`  
`####################`  
`#.####....###.#.#.##`  
`##.#################`  
`#####.##.###..####..`  
`..######..##.#######`  
`####.##.####...##..#`  
`.#####..#.######.###`  
`##...#.####`**`#`**`#####...`  
`#.##########.#######`  
`.####.#.###.###.#.##`  
`....##.##.###..#####`  
`.#.#.###########.###`  
`#.#.#.#####.####.###`  
`###.##.####.##.#..##`  

Find the best location for a new monitoring station. **How many other asteroids can be detected from that location?**

### --- Part Two ---
Once you give them the coordinates, the Elves quickly deploy an Instant Monitoring Station to the location and discover the worst: there are simply too many asteroids.

The only solution is **complete vaporization by giant laser**.

Fortunately, in addition to an asteroid scanner, the new monitoring station also comes equipped with a giant rotating laser perfect for vaporizing asteroids. The laser starts by pointing **up** and always rotates **clockwise**, vaporizing any asteroid it hits.

If multiple asteroids are **exactly** in line with the station, the laser only has enough power to vaporize **one** of them before continuing its rotation. In other words, the same asteroids that can be **detected** can be vaporized, but if vaporizing one asteroid makes another one detectable, the newly-detected asteroid won't be vaporized until the laser has returned to the same position by rotating a full 360 degrees.

For example, consider the following map, where the asteroid with the new monitoring station (and laser) is marked `X`:

`.#....#####...#..`  
`##...##.#####..##`  
`##...#...#.#####.`  
`..#.....X...###..`  
`..#.#.....#....##`  

The first nine asteroids to get vaporized, in order, would be:

`.#....###`**`24`**`...#..`  
`##...##.`**`13`**`#`**`67`**`..`**`9`**`#`  
`##...#...`**`5`**`.`**`8`**`####.`  
`..#.....X...###..`  
`..#.#.....#....##`  

Note that some asteroids (the ones behind the asteroids marked `1`, `5`, and `7`) won't have a chance to be vaporized until the next full rotation. The laser continues rotating; the next nine to be vaporized are:

`.#....###.....#..`  
`##...##...#.....#`  
`##...#......`**`1234`**`.`  
`..#.....X...`**`5`**`##..`  
`..#.`**`9`**`.....`**`8`**`....`**`76`**  

The next nine to be vaporized are then:

`.`**`8`**`....###.....#..`  
**`56`**`...`**`9`**`#...#.....#`  
**`34`**`...`**`7`**`...........`  
`..`**`2`**`.....X....##..`  
`..`**`1`**`..............`  

Finally, the laser completes its first full rotation (`1` through `3`), a second rotation (`4` through `8`), and vaporizes the last asteroid (`9`) partway through its third rotation:

`......`**`234`**`.....`**`6`**`..`  
`......`**`1`**`...`**`5`**`.....`**`7`**   
`.................`  
`........X....`**`89`**`..`  
`.................`  

In the large example above (the one with the best monitoring station location at `11,13`):

- The 1st asteroid to be vaporized is at `11,12`.
- The 2nd asteroid to be vaporized is at `12,1`.
- The 3rd asteroid to be vaporized is at `12,2`.
- The 10th asteroid to be vaporized is at `12,8`.
- The 20th asteroid to be vaporized is at `16,0`.
- The 50th asteroid to be vaporized is at `16,9`.
- The 100th asteroid to be vaporized is at `10,16`.
- The 199th asteroid to be vaporized is at `9,6`.
- **The 200th asteroid to be vaporized is at `8,2`.**
- The 201st asteroid to be vaporized is at `10,9`.
- The 299th and final asteroid to be vaporized is at `11,1`.

The Elves are placing bets on which will be the **200th** asteroid to be vaporized. Win the bet by determining which asteroid that will be; **what do you get if you multiply its X coordinate by `100` and then add its Y coordinate?** (For example, `8,2` becomes **`802`**.)

---
## --- Day 11: Space Police ---

On the way to Jupiter, you're [pulled over](https://www.youtube.com/watch?v=KwY28rpyKDE) by the **Space Police**.

"Attention, unmarked spacecraft! You are in violation of Space Law! All spacecraft must have a clearly visible **registration identifier**! You have 24 hours to comply or be sent to [Space Jail](https://www.youtube.com/watch?v=BVn1oQL9sWg&t=5)!"

Not wanting to be sent to Space Jail, you radio back to the Elves on Earth for help. Although it takes almost three hours for their reply signal to reach you, they send instructions for how to power up the **emergency hull painting robot** and even provide a small [Intcode program](https://adventofcode.com/2019/day/9) (your puzzle input) that will cause it to paint your ship appropriately.

There's just one problem: you don't have an emergency hull painting robot.

You'll need to build a new emergency hull painting robot. The robot needs to be able to move around on the grid of square panels on the side of your ship, detect the color of its current panel, and paint its current panel **black** or **white**. (All of the panels are currently **black**.)

The Intcode program will serve as the brain of the robot. The program uses input instructions to access the robot's camera: provide `0` if the robot is over a **black** panel or `1` if the robot is over a **white** panel. Then, the program will output two values:

- First, it will output a value indicating the **color to paint the panel** the robot is over: `0` means to paint the panel **black**, and `1` means to paint the panel **white**.
- Second, it will output a value indicating the **direction the robot should turn**: `0` means it should turn **left 90 degrees**, and `1` means it should turn **right 90 degrees**.

After the robot turns, it should always move **forward exactly one panel**. The robot starts facing **up**.

The robot will continue running for a while like this and halt when it is finished drawing. Do not restart the Intcode computer inside the robot during this process.

For example, suppose the robot is about to start running. Drawing black panels as `.`, white panels as `#`, and the robot pointing the direction it is facing (`< ^ > v`), the initial state and region near the robot looks like this:
```
.....
.....
..^..
.....
.....
```
The panel under the robot (not visible here because a `^` is shown instead) is also black, and so any input instructions at this point should be provided `0`. Suppose the robot eventually outputs `1` (paint white) and then `0` (turn left). After taking these actions and moving forward one panel, the region now looks like this:
```
.....
.....
.<#..
.....
.....
```
Input instructions should still be provided `0`. Next, the robot might output `0` (paint black) and then `0` (turn left):
```
.....
.....
..#..
.v...
.....
```
After more outputs (`1,0`, `1,0`):
```
.....
.....
..^..
.##..
.....
```
The robot is now back where it started, but because it is now on a white panel, input instructions should be provided `1`. After several more outputs (`0,1`, `1,0`, `1,0`), the area looks like this:
```
.....
..<#.
...#.
.##..
.....
```
Before you deploy the robot, you should probably have an estimate of the area it will cover: specifically, you need to know the **number of panels it paints at least once**, regardless of color. In the example above, the robot painted **`6` panels** at least once. (It painted its starting panel twice, but that panel is [still only counted once](https://www.youtube.com/watch?v=KjsSvjA5TuE); it also never painted the panel it ended on.)

Build a new emergency hull painting robot and run the Intcode program on it. **How many panels does it paint at least once?**

### --- Part Two ---
You're not sure what it's trying to paint, but it's definitely not a **registration identifier**. The Space Police are getting impatient.

Checking your external ship cameras again, you notice a white panel marked "emergency hull painting robot starting panel". The rest of the panels are **still black**, but it looks like the robot was expecting to **start on a white panel**, not a black one.

Based on the Space Law Space Brochure that the Space Police attached to one of your windows, a valid registration identifier is always **eight capital letters**. After starting the robot on a single **white panel** instead, **what registration identifier does it paint** on your hull?

---
## --- Day 12: The N-Body Problem ---

The space near Jupiter is not a very safe place; you need to be careful of a [big distracting red spot](https://en.wikipedia.org/wiki/Great_Red_Spot), extreme [radiation](https://en.wikipedia.org/wiki/Magnetosphere_of_Jupiter), and a [whole lot of moons](https://en.wikipedia.org/wiki/Moons_of_Jupiter#List) swirling around. You decide to start by tracking the four largest moons: **Io**, **Europa**, **Ganymede**, and **Callisto**.

After a brief scan, you calculate the **position of each moon** (your puzzle input). You just need to **simulate their motion** so you can avoid them.

Each moon has a 3-dimensional position (`x`, `y`, and `z`) and a 3-dimensional velocity. The position of each moon is given in your scan; the `x`, `y`, and `z` velocity of each moon starts at `0`.

Simulate the motion of the moons in **time steps**. Within each time step, first update the velocity of every moon by applying **gravity**. Then, once all moons' velocities have been updated, update the position of every moon by applying **velocity**. Time progresses by one step once all of the positions are updated.

To apply **gravity**, consider every **pair** of moons. On each axis (`x`, `y`, and `z`), the velocity of each moon changes by **exactly +1 or -1** to pull the moons together. For example, if Ganymede has an `x` position of `3`, and Callisto has a `x` position of `5`, then Ganymede's `x` velocity **changes by +1** (because `5 > 3`) and Callisto's `x` velocity changes by `-1` (because `3 < 5`). However, if the positions on a given axis are the same, the velocity on that axis **does not change** for that pair of moons.

Once all gravity has been applied, apply **velocity**: simply add the velocity of each moon to its own position. For example, if Europa has a position of `x=1, y=2, z=3` and a velocity of `x=-2, y=0,z=3`, then its new position would be `x=-1, y=2, z=6`. This process does not modify the velocity of any moon.

For example, suppose your scan reveals the following positions:
```
<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>
```
Simulating the motion of these moons would produce the following:
```
After 0 steps:
pos=<x=-1, y=  0, z= 2>, vel=<x= 0, y= 0, z= 0>
pos=<x= 2, y=-10, z=-7>, vel=<x= 0, y= 0, z= 0>
pos=<x= 4, y= -8, z= 8>, vel=<x= 0, y= 0, z= 0>
pos=<x= 3, y=  5, z=-1>, vel=<x= 0, y= 0, z= 0>

After 1 step:
pos=<x= 2, y=-1, z= 1>, vel=<x= 3, y=-1, z=-1>
pos=<x= 3, y=-7, z=-4>, vel=<x= 1, y= 3, z= 3>
pos=<x= 1, y=-7, z= 5>, vel=<x=-3, y= 1, z=-3>
pos=<x= 2, y= 2, z= 0>, vel=<x=-1, y=-3, z= 1>

After 2 steps:
pos=<x= 5, y=-3, z=-1>, vel=<x= 3, y=-2, z=-2>
pos=<x= 1, y=-2, z= 2>, vel=<x=-2, y= 5, z= 6>
pos=<x= 1, y=-4, z=-1>, vel=<x= 0, y= 3, z=-6>
pos=<x= 1, y=-4, z= 2>, vel=<x=-1, y=-6, z= 2>

After 3 steps:
pos=<x= 5, y=-6, z=-1>, vel=<x= 0, y=-3, z= 0>
pos=<x= 0, y= 0, z= 6>, vel=<x=-1, y= 2, z= 4>
pos=<x= 2, y= 1, z=-5>, vel=<x= 1, y= 5, z=-4>
pos=<x= 1, y=-8, z= 2>, vel=<x= 0, y=-4, z= 0>

After 4 steps:
pos=<x= 2, y=-8, z= 0>, vel=<x=-3, y=-2, z= 1>
pos=<x= 2, y= 1, z= 7>, vel=<x= 2, y= 1, z= 1>
pos=<x= 2, y= 3, z=-6>, vel=<x= 0, y= 2, z=-1>
pos=<x= 2, y=-9, z= 1>, vel=<x= 1, y=-1, z=-1>

After 5 steps:
pos=<x=-1, y=-9, z= 2>, vel=<x=-3, y=-1, z= 2>
pos=<x= 4, y= 1, z= 5>, vel=<x= 2, y= 0, z=-2>
pos=<x= 2, y= 2, z=-4>, vel=<x= 0, y=-1, z= 2>
pos=<x= 3, y=-7, z=-1>, vel=<x= 1, y= 2, z=-2>

After 6 steps:
pos=<x=-1, y=-7, z= 3>, vel=<x= 0, y= 2, z= 1>
pos=<x= 3, y= 0, z= 0>, vel=<x=-1, y=-1, z=-5>
pos=<x= 3, y=-2, z= 1>, vel=<x= 1, y=-4, z= 5>
pos=<x= 3, y=-4, z=-2>, vel=<x= 0, y= 3, z=-1>

After 7 steps:
pos=<x= 2, y=-2, z= 1>, vel=<x= 3, y= 5, z=-2>
pos=<x= 1, y=-4, z=-4>, vel=<x=-2, y=-4, z=-4>
pos=<x= 3, y=-7, z= 5>, vel=<x= 0, y=-5, z= 4>
pos=<x= 2, y= 0, z= 0>, vel=<x=-1, y= 4, z= 2>

After 8 steps:
pos=<x= 5, y= 2, z=-2>, vel=<x= 3, y= 4, z=-3>
pos=<x= 2, y=-7, z=-5>, vel=<x= 1, y=-3, z=-1>
pos=<x= 0, y=-9, z= 6>, vel=<x=-3, y=-2, z= 1>
pos=<x= 1, y= 1, z= 3>, vel=<x=-1, y= 1, z= 3>

After 9 steps:
pos=<x= 5, y= 3, z=-4>, vel=<x= 0, y= 1, z=-2>
pos=<x= 2, y=-9, z=-3>, vel=<x= 0, y=-2, z= 2>
pos=<x= 0, y=-8, z= 4>, vel=<x= 0, y= 1, z=-2>
pos=<x= 1, y= 1, z= 5>, vel=<x= 0, y= 0, z= 2>

After 10 steps:
pos=<x= 2, y= 1, z=-3>, vel=<x=-3, y=-2, z= 1>
pos=<x= 1, y=-8, z= 0>, vel=<x=-1, y= 1, z= 3>
pos=<x= 3, y=-6, z= 1>, vel=<x= 3, y= 2, z=-3>
pos=<x= 2, y= 0, z= 4>, vel=<x= 1, y=-1, z=-1>
```
Then, it might help to calculate the **total energy in the system**. The total energy for a single moon is its **potential energy** multiplied by its **kinetic energy**. A moon's **potential energy** is the sum of the [absolute values](https://en.wikipedia.org/wiki/Absolute_value) of its `x`, `y`, and `z` position coordinates. A moon's **kinetic energy** is the sum of the absolute values of its velocity coordinates. Below, each line shows the calculations for a moon's potential energy (`pot`), kinetic energy (`kin`), and total energy:
```
Energy after 10 steps:
pot: 2 + 1 + 3 =  6;   kin: 3 + 2 + 1 = 6;   total:  6 * 6 = 36
pot: 1 + 8 + 0 =  9;   kin: 1 + 1 + 3 = 5;   total:  9 * 5 = 45
pot: 3 + 6 + 1 = 10;   kin: 3 + 2 + 3 = 8;   total: 10 * 8 = 80
pot: 2 + 0 + 4 =  6;   kin: 1 + 1 + 1 = 3;   total:  6 * 3 = 18
Sum of total energy: 36 + 45 + 80 + 18 = 179
```
In the above example, adding together the total energy for all moons after 10 steps produces the total energy in the system, **`179`**.

Here's a second example:
```
<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>
```
Every ten steps of simulation for 100 steps produces:
```
After 0 steps:
pos=<x= -8, y=-10, z=  0>, vel=<x=  0, y=  0, z=  0>
pos=<x=  5, y=  5, z= 10>, vel=<x=  0, y=  0, z=  0>
pos=<x=  2, y= -7, z=  3>, vel=<x=  0, y=  0, z=  0>
pos=<x=  9, y= -8, z= -3>, vel=<x=  0, y=  0, z=  0>

After 10 steps:
pos=<x= -9, y=-10, z=  1>, vel=<x= -2, y= -2, z= -1>
pos=<x=  4, y= 10, z=  9>, vel=<x= -3, y=  7, z= -2>
pos=<x=  8, y=-10, z= -3>, vel=<x=  5, y= -1, z= -2>
pos=<x=  5, y=-10, z=  3>, vel=<x=  0, y= -4, z=  5>

After 20 steps:
pos=<x=-10, y=  3, z= -4>, vel=<x= -5, y=  2, z=  0>
pos=<x=  5, y=-25, z=  6>, vel=<x=  1, y=  1, z= -4>
pos=<x= 13, y=  1, z=  1>, vel=<x=  5, y= -2, z=  2>
pos=<x=  0, y=  1, z=  7>, vel=<x= -1, y= -1, z=  2>

After 30 steps:
pos=<x= 15, y= -6, z= -9>, vel=<x= -5, y=  4, z=  0>
pos=<x= -4, y=-11, z=  3>, vel=<x= -3, y=-10, z=  0>
pos=<x=  0, y= -1, z= 11>, vel=<x=  7, y=  4, z=  3>
pos=<x= -3, y= -2, z=  5>, vel=<x=  1, y=  2, z= -3>

After 40 steps:
pos=<x= 14, y=-12, z= -4>, vel=<x= 11, y=  3, z=  0>
pos=<x= -1, y= 18, z=  8>, vel=<x= -5, y=  2, z=  3>
pos=<x= -5, y=-14, z=  8>, vel=<x=  1, y= -2, z=  0>
pos=<x=  0, y=-12, z= -2>, vel=<x= -7, y= -3, z= -3>

After 50 steps:
pos=<x=-23, y=  4, z=  1>, vel=<x= -7, y= -1, z=  2>
pos=<x= 20, y=-31, z= 13>, vel=<x=  5, y=  3, z=  4>
pos=<x= -4, y=  6, z=  1>, vel=<x= -1, y=  1, z= -3>
pos=<x= 15, y=  1, z= -5>, vel=<x=  3, y= -3, z= -3>

After 60 steps:
pos=<x= 36, y=-10, z=  6>, vel=<x=  5, y=  0, z=  3>
pos=<x=-18, y= 10, z=  9>, vel=<x= -3, y= -7, z=  5>
pos=<x=  8, y=-12, z= -3>, vel=<x= -2, y=  1, z= -7>
pos=<x=-18, y= -8, z= -2>, vel=<x=  0, y=  6, z= -1>

After 70 steps:
pos=<x=-33, y= -6, z=  5>, vel=<x= -5, y= -4, z=  7>
pos=<x= 13, y= -9, z=  2>, vel=<x= -2, y= 11, z=  3>
pos=<x= 11, y= -8, z=  2>, vel=<x=  8, y= -6, z= -7>
pos=<x= 17, y=  3, z=  1>, vel=<x= -1, y= -1, z= -3>

After 80 steps:
pos=<x= 30, y= -8, z=  3>, vel=<x=  3, y=  3, z=  0>
pos=<x= -2, y= -4, z=  0>, vel=<x=  4, y=-13, z=  2>
pos=<x=-18, y= -7, z= 15>, vel=<x= -8, y=  2, z= -2>
pos=<x= -2, y= -1, z= -8>, vel=<x=  1, y=  8, z=  0>

After 90 steps:
pos=<x=-25, y= -1, z=  4>, vel=<x=  1, y= -3, z=  4>
pos=<x=  2, y= -9, z=  0>, vel=<x= -3, y= 13, z= -1>
pos=<x= 32, y= -8, z= 14>, vel=<x=  5, y= -4, z=  6>
pos=<x= -1, y= -2, z= -8>, vel=<x= -3, y= -6, z= -9>

After 100 steps:
pos=<x=  8, y=-12, z= -9>, vel=<x= -7, y=  3, z=  0>
pos=<x= 13, y= 16, z= -3>, vel=<x=  3, y=-11, z= -5>
pos=<x=-29, y=-11, z= -1>, vel=<x= -3, y=  7, z=  4>
pos=<x= 16, y=-13, z= 23>, vel=<x=  7, y=  1, z=  1>

Energy after 100 steps:
pot:  8 + 12 +  9 = 29;   kin: 7 +  3 + 0 = 10;   total: 29 * 10 = 290
pot: 13 + 16 +  3 = 32;   kin: 3 + 11 + 5 = 19;   total: 32 * 19 = 608
pot: 29 + 11 +  1 = 41;   kin: 3 +  7 + 4 = 14;   total: 41 * 14 = 574
pot: 16 + 13 + 23 = 52;   kin: 7 +  1 + 1 =  9;   total: 52 *  9 = 468
Sum of total energy: 290 + 608 + 574 + 468 = 1940
```
**What is the total energy in the system** after simulating the moons given in your scan for `1000` steps?

### --- Part Two ---
All this drifting around in space makes you wonder about the nature of the universe. Does history really repeat itself? You're curious whether the moons will ever return to a previous state.

Determine **the number of steps** that must occur before all of the moons' **positions and velocities** exactly match a previous point in time.

For example, the first example above takes `2772` steps before they exactly match a previous point in time; it eventually returns to the initial state:
```
After 0 steps:
pos=<x= -1, y=  0, z=  2>, vel=<x=  0, y=  0, z=  0>
pos=<x=  2, y=-10, z= -7>, vel=<x=  0, y=  0, z=  0>
pos=<x=  4, y= -8, z=  8>, vel=<x=  0, y=  0, z=  0>
pos=<x=  3, y=  5, z= -1>, vel=<x=  0, y=  0, z=  0>

After 2770 steps:
pos=<x=  2, y= -1, z=  1>, vel=<x= -3, y=  2, z=  2>
pos=<x=  3, y= -7, z= -4>, vel=<x=  2, y= -5, z= -6>
pos=<x=  1, y= -7, z=  5>, vel=<x=  0, y= -3, z=  6>
pos=<x=  2, y=  2, z=  0>, vel=<x=  1, y=  6, z= -2>

After 2771 steps:
pos=<x= -1, y=  0, z=  2>, vel=<x= -3, y=  1, z=  1>
pos=<x=  2, y=-10, z= -7>, vel=<x= -1, y= -3, z= -3>
pos=<x=  4, y= -8, z=  8>, vel=<x=  3, y= -1, z=  3>
pos=<x=  3, y=  5, z= -1>, vel=<x=  1, y=  3, z= -1>

After 2772 steps:
pos=<x= -1, y=  0, z=  2>, vel=<x=  0, y=  0, z=  0>
pos=<x=  2, y=-10, z= -7>, vel=<x=  0, y=  0, z=  0>
pos=<x=  4, y= -8, z=  8>, vel=<x=  0, y=  0, z=  0>
pos=<x=  3, y=  5, z= -1>, vel=<x=  0, y=  0, z=  0>
```
Of course, the universe might last for a **very long time** before repeating. Here's a copy of the second example from above:
```
<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>
```
This set of initial positions takes `4686774924` steps before it repeats a previous state! Clearly, you might need to **find a more efficient way to simulate the universe**.

**How many steps does it take** to reach the first state that exactly matches a previous state?

---
## --- Day 13: Care Package ---

As you ponder the solitude of space and the ever-increasing three-hour roundtrip for messages between you and Earth, you notice that the Space Mail Indicator Light is blinking. To help keep you sane, the Elves have sent you a care package.

It's a new game for the ship's [arcade cabinet](https://en.wikipedia.org/wiki/Arcade_cabinet)! Unfortunately, the arcade is **all the way** on the other end of the ship. Surely, it won't be hard to build your own - the care package even comes with schematics.

The arcade cabinet runs [Intcode](https://adventofcode.com/2019/day/9) software like the game the Elves sent (your puzzle input). It has a primitive screen capable of drawing square **tiles** on a grid. The software draws tiles to the screen with output instructions: every three output instructions specify the `x` position (distance from the left), `y` position (distance from the top), and `tile id`. The `tile id` is interpreted as follows:

- `0` is an **empty** tile. No game object appears in this tile.
- `1` is a **wall** tile. Walls are indestructible barriers.
- `2` is a **block** tile. Blocks can be broken by the ball.
- `3` is a **horizontal paddle** tile. The paddle is indestructible.
- `4` is a **ball** tile. The ball moves diagonally and bounces off objects.

For example, a sequence of output values like `1,2,3,6,5,4` would draw a **horizontal paddle** tile (`1` tile from the left and `2` tiles from the top) and a **ball** tile (`6` tiles from the left and `5` tiles from the top).

Start the game. **How many block tiles are on the screen when the game exits?**

### --- Part Two ---
The game didn't run because you didn't put in any quarters. Unfortunately, you did not bring any quarters. Memory address `0` represents the number of quarters that have been inserted; set it to `2` to play for free.

The arcade cabinet has a [joystick](https://en.wikipedia.org/wiki/Joystick) that can move left and right. The software reads the position of the joystick with input instructions:

- If the joystick is in the **neutral position**, provide `0`.
- If the joystick is **tilted to the left**, provide `-1`.
- If the joystick is **tilted to the right**, provide `1`.

The arcade cabinet also has a [segment display](https://en.wikipedia.org/wiki/Display_device#Segment_displays) capable of showing a single number that represents the player's current score. When three output instructions specify `X=-1, Y=0`, the third output instruction is not a tile; the value instead specifies the new score to show in the segment display. For example, a sequence of output values like `-1,0,12345` would show `12345` as the player's current score.

Beat the game by breaking all the blocks. **What is your score after the last block is broken?**

---
## --- Day 14: Space Stoichiometry ---

As you approach the rings of Saturn, your ship's **low fuel** indicator turns on. There isn't any fuel here, but the rings have plenty of raw material. Perhaps your ship's Inter-Stellar Refinery Union brand **nanofactory** can turn these raw materials into fuel.

You ask the nanofactory to produce a list of the **reactions** it can perform that are relevant to this process (your puzzle input). Every reaction turns some quantities of specific **input chemicals** into some quantity of an **output chemical**. Almost every **chemical** is produced by exactly one reaction; the only exception, ORE, is the raw material input to the entire process and is not produced by a reaction.

You just need to know how much **`ORE`** you'll need to collect before you can produce one unit of **`FUEL`**.

Each reaction gives specific quantities for its inputs and output; reactions cannot be partially run, so only whole integer multiples of these quantities can be used. (It's okay to have leftover chemicals when you're done, though.) For example, the reaction `1 A, 2 B, 3 C => 2 D` means that exactly 2 units of chemical `D` can be produced by consuming exactly 1 `A`, 2 `B` and 3 `C`. You can run the full reaction as many times as necessary; for example, you could produce 10 `D` by consuming 5 `A`, 10 `B`, and 15 `C`.

Suppose your nanofactory produces the following list of reactions:
```
10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL
```
The first two reactions use only `ORE` as inputs; they indicate that you can produce as much of chemical `A` as you want (in increments of 10 units, each 10 costing 10 `ORE`) and as much of chemical `B` as you want (each costing 1 `ORE`). To produce 1 `FUEL`, a total of **31** `ORE` is required: 1 `ORE` to produce 1 `B`, then 30 more `ORE` to produce the 7 + 7 + 7 + 7 = 28 `A` (with 2 extra `A` wasted) required in the reactions to convert the `B` into `C`, `C` into `D`, `D` into `E`, and finally `E` into `FUEL`. (30 `A` is produced because its reaction requires that it is created in increments of 10.)

Or, suppose you have the following list of reactions:
```
9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL
```
The above list of reactions requires **165** `ORE` to produce 1 `FUEL`:

- Consume 45 `ORE` to produce 10 `A`.
- Consume 64 `ORE` to produce 24 `B`.
- Consume 56 `ORE` to produce 40 `C`.
- Consume 6 `A`, 8 `B` to produce 2 `AB`.
- Consume 15 `B`, 21 `C` to produce 3 `BC`.
- Consume 16 `C`, 4 `A` to produce 4 `CA`.
- Consume 2 `AB`, 3 `BC`, 4 `CA` to produce 1 `FUEL`.

Here are some larger examples:

- **13312** `ORE` for 1 `FUEL`:
```
157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT
```
- **180697** `ORE` for 1 `FUEL`:
```
2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF
```
- **2210736** `ORE` for 1 `FUEL`:
```
171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX
```
Given the list of reactions in your puzzle input, **what is the minimum amount of `ORE` required to produce exactly 1 `FUEL`?**

### --- Part Two ---
After collecting `ORE` for a while, you check your cargo hold: **1 trillion** (**1000000000000**) units of `ORE`.

**With that much ore**, given the examples above:

- The 13312 `ORE`-per-`FUEL` example could produce **82892753** `FUEL`.
- The 180697 `ORE`-per-`FUEL` example could produce **5586022** `FUEL`.
- The 2210736 `ORE`-per-`FUEL` example could produce **460664** `FUEL`.

Given 1 trillion `ORE`, **what is the maximum amount of `FUEL` you can produce?**

---
## --- Day 15: Oxygen System ---

Out here in deep space, many things can go wrong. Fortunately, many of those things have indicator lights. Unfortunately, one of those lights is lit: the oxygen system for part of the ship has failed!

According to the readouts, the oxygen system must have failed days ago after a rupture in oxygen tank two; that section of the ship was automatically sealed once oxygen levels went dangerously low. A single remotely-operated **repair droid** is your only option for fixing the oxygen system.

The Elves' care package included an [Intcode](https://adventofcode.com/2019/day/9) program (your puzzle input) that you can use to remotely control the repair droid. By running that program, you can direct the repair droid to the oxygen system and fix the problem.

The remote control program executes the following steps in a loop forever:

- Accept a **movement command** via an input instruction.
- Send the movement command to the repair droid.
- Wait for the repair droid to finish the movement operation.
- Report on the status of the repair droid via an output instruction.

Only four **movement commands** are understood: north (`1`), south (`2`), west (`3`), and east (`4`). Any other command is invalid. The movements differ in direction, but not in distance: in a long enough east-west hallway, a series of commands like `4,4,4,4,3,3,3,3` would leave the repair droid back where it started.

The repair droid can reply with any of the following **status** codes:

- `0`: The repair droid hit a wall. Its position has not changed.
- `1`: The repair droid has moved one step in the requested direction.
- `2`: The repair droid has moved one step in the requested direction; its new position is the location of the oxygen system.

You don't know anything about the area around the repair droid, but you can figure it out by watching the status codes.

For example, we can draw the area using `D` for the droid, `#` for walls, `.` for locations the droid can traverse, and empty space for unexplored locations. Then, the initial state looks like this:
```
      
      
   D  
      
      
```
To make the droid go north, send it `1`. If it replies with `0`, you know that location is a wall and that the droid didn't move:
```
      
   #  
   D  
      
      
```
To move east, send `4`; a reply of `1` means the movement was successful:
```
      
   #  
   .D 
      
      
```
Then, perhaps attempts to move north (`1`), south (`2`), and east (`4`) are all met with replies of `0`:
```
      
   ## 
   .D#
    # 
      
```
Now, you know the repair droid is in a dead end. Backtrack with `3` (which you already know will get a reply of `1` because you already know that location is open):
```
      
   ## 
   D.#
    # 
      
```
Then, perhaps west (`3`) gets a reply of `0`, south (`2`) gets a reply of `1`, south again (`2`) gets a reply of `0`, and then west (`3`) gets a reply of `2`:
```
      
   ## 
  #..#
  D.# 
   #
```
Now, because of the reply of `2`, you know you've found the **oxygen system**! In this example, it was only `2` moves away from the repair droid's starting position.

**What is the fewest number of movement commands** required to move the repair droid from its starting position to the location of the oxygen system?

