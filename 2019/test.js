function* gen() {
  console.log("gen in");
  let j=100;
  // while(true) {
    const i = yield;
    console.log({i});
    yield ++j;
  // }
}

const asdf = gen();
console.log(asdf.next());
console.log(asdf.next(123));
console.log(asdf.next());
console.log(asdf.next(456));
console.log(asdf.next());