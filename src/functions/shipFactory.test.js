import Ship from "./shipFactory";

test("receives hits", () => {
  let testShip = Ship(3);
  testShip.hit(1);
  expect(testShip.hits).toEqual([false, true, false]);
});

test("throws error on invalid indexes", () => {
  expect(() => Ship(3).hit(4)).toThrow(Error);
});

test("reports sunk (short)", () => {
  let sunkShip = Ship(1);
  sunkShip.hit(0);
  expect(sunkShip.isSunk).toBe(true);
});

test("reports sunk (long)", () => {
  let sunkShip = Ship(3);
  for (let i = 0; i < 3; i++) {
    sunkShip.hit(i);
  }
  expect(sunkShip.isSunk).toBe(true);
});

test("reports still afloat (unhit)", () => {
  expect(Ship(3).isSunk).toBe(false);
});

test("reports still afloat (hit)", () => {
  let hitShip = Ship(3);
  hitShip.hit(1);
  expect(hitShip.isSunk).toBe(false);
});
