const input = 
// require('./inputs/14')

// `157 ORE => 5 NZVS
// 165 ORE => 6 DCFZ
// 44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
// 12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
// 179 ORE => 7 PSHF
// 177 ORE => 5 HKGWZ
// 7 DCFZ, 7 PSHF => 2 XJWVT
// 165 ORE => 2 GPVTF
// 3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`

`2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
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
176 ORE => 6 VJHF`

console.log("\nThe minimum ORE required to produce 1 FUEL is:");

const waste = new Map();

const formulas = new Map();

for(const reaction of input.split('\n')) {
  const [inChemicals, outChemical] = reaction.split(" => ");

  const [outQty, outElement] = outChemical.split(' ');

  const inChemicalsObj = 
    inChemicals
    .split(', ')
    .reduce((acc, chemical) => {
      const [qty, element] = chemical.split(' ');
      return ({
        ...acc,
        [element]: Number(qty)
      });
    }, {})
  
  formulas.set(outElement, [Number(outQty), inChemicalsObj]);
}

const distToOre = new Map([
  ['ORE', [0,0]]
]);

const calcDistToOre = chemical =>
  distToOre.has(chemical)
    ? distToOre.get(chemical)
    : Object.keys(formulas.get(chemical)[1])
    .map(calcDistToOre)
    .reduce(([globalMin, globalMax], [localMin, localMax]) =>
      [
        Math.min(globalMin, 1 + localMin),
        Math.max(globalMax, 1 + localMax)
      ]
      , [Infinity, -Infinity]
    )


const reduce = needs => {
  let reducible = true;

  while(reducible) {
    reducible = false;
  
    for (const [chemicalNeeded, qtyNeeded] of needs) {
      if (chemicalNeeded === "ORE") continue;
  
      const [amtProduced, chemicalsObj] = formulas.get(chemicalNeeded);
      if (amtProduced > qtyNeeded) continue;
  
      reducible = true;
  
      const remainder = qtyNeeded % amtProduced;
      const multiplier = Math.trunc(qtyNeeded/amtProduced);
  
      for(const [chemical, baseQty] of Object.entries(chemicalsObj)) {
        const qty = baseQty * multiplier;
  
        needs.set(
          chemical,
          (needs.get(chemical) || 0) + qty
        )
      }
  
      if (remainder) {
        needs.set(chemicalNeeded, remainder);
      } else {
        needs.delete(chemicalNeeded)
      }
    }
  }
  
}

const wasteProduce = needs => {
  let furthestToOre = [-Infinity, -Infinity];
  let chemicalsToProduce = [];

  for (const chem of needs.keys()) {
    const [min, max] = calcDistToOre(chem);
    const [fMin, fMax] = furthestToOre;

    if (max < fMax) continue;

    if (min === fMin && max === fMax) {
      chemicalsToProduce.push(chem);
      continue;
    }

    if (max > fMax || min > fMin) {
      furthestToOre = [min, max]
      chemicalsToProduce = [chem]
    }
  }
  
  for(const chemical of chemicalsToProduce) {
    const [amtProduced,chemicalsObj] = formulas.get(chemical);
    for (const [chemical, qty] of Object.entries(chemicalsObj)) {
      needs.set(
        chemical,
        (needs.get(chemical) || 0) + qty
      )
    }

    waste.set(
      chemical,
      (waste.get(chemical) || 0) + (amtProduced - needs.get(chemical))
    )

    needs.delete(chemical);
  }
}

const needForFUEL = new Map([
  ['FUEL', 1]
]);


while (needForFUEL.size > 1 || !needForFUEL.has('ORE')) {
  reduce(needForFUEL);
  wasteProduce(needForFUEL);
}

const OREperFUEL = needForFUEL.get('ORE')

console.log(`
  ${OREperFUEL}
`)

// * Your puzzle answer was 751038.

console.log("\nWith 1 trillion ORE, the maximum amount of FUEL producible is:");


console.log({waste})
console.log(`
`)

// * Your puzzle answer was 500903629351944.
