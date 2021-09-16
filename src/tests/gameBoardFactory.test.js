import Ship from "./shipFactory";
import Gameboard from "./gameBoardFactory";

const mapJustShipAndHit = (square) => ({
  containsShip: square.containsShip,
  isHit: square.isHit,
});

test("makes a gameboard", () => {
  expect(Gameboard(2).current).toStrictEqual([
    [
      { containsShip: false, isHit: false },
      { containsShip: false, isHit: false },
    ],
    [
      { containsShip: false, isHit: false },
      { containsShip: false, isHit: false },
    ],
  ]);
});

describe("Checking ship placement validity", () => {
  const mapDummies = (col) => ({
    containsShip: col.containsShip,
    isHit: typeof col.isHit === "boolean" ? col.isHit : undefined,
    isDummy: typeof col.isDummy === "boolean" ? col.isDummy : undefined,
    isValid: typeof col.isValid === "boolean" ? col.isValid : undefined,
  });

  test("Places valid dummy", () => {
    const testShip = Ship(2);
    const testGameboard = Gameboard(2);
    const testShipPlacement = {
      ship: testShip,
      isVertical: false,
      coordinates: [0, 0],
      isConfirmed: false,
    };
    expect(
      testGameboard
        .insertShip(testShipPlacement)
        .newGameboard.map((row) => row.map(mapDummies))
    ).toStrictEqual([
      [
        {
          containsShip: true,
          isHit: undefined,
          isDummy: true,
          isValid: true,
        },
        {
          containsShip: true,
          isHit: undefined,
          isDummy: true,
          isValid: true,
        },
      ],
      [
        {
          containsShip: false,
          isHit: false,
          isDummy: undefined,
          isValid: undefined,
        },
        {
          containsShip: false,
          isHit: false,
          isDummy: undefined,
          isValid: undefined,
        },
      ],
    ]);
  });

  test("Places invalid dummy (insufficient space)", () => {
    const testShip = Ship(2);
    const testGameboard = Gameboard(2);
    const testShipPlacement = {
      ship: testShip,
      isVertical: false,
      coordinates: [0, 1],
      isConfirmed: false,
    };
    expect(
      testGameboard
        .insertShip(testShipPlacement)
        .newGameboard.map((row) => row.map(mapDummies))
    ).toStrictEqual([
      [
        {
          containsShip: false,
          isHit: false,
          isDummy: undefined,
          isValid: undefined,
        },
        {
          containsShip: true,
          isHit: undefined,
          isDummy: true,
          isValid: false,
        },
      ],
      [
        {
          containsShip: false,
          isHit: false,
          isDummy: undefined,
          isValid: undefined,
        },
        {
          containsShip: false,
          isHit: false,
          isDummy: undefined,
          isValid: undefined,
        },
      ],
    ]);
  });

  test("Places invalid dummy (entirely overlaps ship)", () => {
    const testGameboard = Gameboard(2);
    const testShip1 = Ship(2);
    const testShip2 = Ship(2);
    testGameboard.insertShip({
      ship: testShip1,
      isVertical: false,
      coordinates: [0, 0],
      isConfirmed: true,
    });
    const testShipPlacement = {
      ship: testShip2,
      isVertical: false,
      coordinates: [0, 0],
      isConfirmed: false,
    };
    expect(
      testGameboard
        .insertShip(testShipPlacement)
        .newGameboard.map((row) => row.map(mapDummies))
    ).toStrictEqual([
      [
        {
          containsShip: true,
          isHit: undefined,
          isDummy: true,
          isValid: false,
        },
        {
          containsShip: true,
          isHit: undefined,
          isDummy: true,
          isValid: false,
        },
      ],
      [
        {
          containsShip: false,
          isHit: false,
          isDummy: undefined,
          isValid: undefined,
        },
        {
          containsShip: false,
          isHit: false,
          isDummy: undefined,
          isValid: undefined,
        },
      ],
    ]);
  });

  test("Places invalid dummy (partially overlaps ship)", () => {
    const testGameboard = Gameboard(2);
    const testShip1 = Ship(2);
    const testShip2 = Ship(2);
    testGameboard.insertShip({
      ship: testShip1,
      isVertical: false,
      coordinates: [0, 0],
      isConfirmed: true,
    });
    const testShipPlacement = {
      ship: testShip2,
      isVertical: true,
      coordinates: [0, 1],
      isConfirmed: false,
    };
    expect(
      testGameboard
        .insertShip(testShipPlacement)
        .newGameboard.map((row) => row.map(mapDummies))
    ).toStrictEqual([
      [
        {
          containsShip: true,
          isHit: false,
          isDummy: undefined,
          isValid: undefined,
        },
        {
          containsShip: true,
          isHit: undefined,
          isDummy: true,
          isValid: false,
        },
      ],
      [
        {
          containsShip: false,
          isHit: false,
          isDummy: undefined,
          isValid: undefined,
        },
        {
          containsShip: true,
          isHit: undefined,
          isDummy: true,
          isValid: false,
        },
      ],
    ]);
  });
});

describe("Placing ships", () => {
  test("places ships horizontally", () => {
    const testShip = Ship(2);
    const testGameboard = Gameboard(2);
    const testShipPlacement = {
      ship: testShip,
      isVertical: false,
      coordinates: [0, 0],
      isConfirmed: true,
    };
    expect(
      testGameboard.insertShip(testShipPlacement).newGameboard.map((row) =>
        row.map((col) => ({
          containsShip: col.containsShip,
          isHit: col.isHit,
        }))
      )
    ).toStrictEqual([
      [
        {
          containsShip: true,
          isHit: false,
        },
        {
          containsShip: true,
          isHit: false,
        },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
    ]);
  });

  test("places ships horizontally (2)", () => {
    let testGameboard = Gameboard(2);
    let testShip = Ship(2);
    const testShipPlacement = {
      ship: testShip,
      isVertical: false,
      coordinates: [1, 0],
      isConfirmed: true,
    };
    expect(
      testGameboard.insertShip(testShipPlacement).newGameboard.map((row) =>
        row.map((col) => ({
          containsShip: col.containsShip,
          isHit: col.isHit,
        }))
      )
    ).toStrictEqual([
      [
        {
          containsShip: false,
          isHit: false,
        },
        {
          containsShip: false,
          isHit: false,
        },
      ],
      [
        { containsShip: true, isHit: false },
        { containsShip: true, isHit: false },
      ],
    ]);
  });

  test("places ships vertically", () => {
    const testShip = Ship(2);
    const testGameboard = Gameboard(2);
    const testShipPlacement = {
      ship: testShip,
      isVertical: true,
      coordinates: [0, 0],
      isConfirmed: true,
    };
    expect(
      testGameboard.insertShip(testShipPlacement).newGameboard.map((row) =>
        row.map((col) => ({
          containsShip: col.containsShip,
          isHit: col.isHit,
        }))
      )
    ).toStrictEqual([
      [
        {
          containsShip: true,
          isHit: false,
        },
        { containsShip: false, isHit: false },
      ],
      [
        {
          containsShip: true,
          isHit: false,
        },
        { containsShip: false, isHit: false },
      ],
    ]);
  });

  test("places ships horizontally (large board)", () => {
    const testShip = Ship(3);
    const testGameboard = Gameboard(10);
    const testShipPlacement = {
      ship: testShip,
      isVertical: false,
      coordinates: [2, 2],
      isConfirmed: true,
    };
    expect(
      testGameboard.insertShip(testShipPlacement).newGameboard.map((row) =>
        row.map((col) => ({
          containsShip: col.containsShip,
          isHit: col.isHit,
        }))
      )
    ).toStrictEqual([
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        {
          containsShip: true,
          isHit: false,
        },
        {
          containsShip: true,
          isHit: false,
        },
        {
          containsShip: true,
          isHit: false,
        },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
    ]);
  });

  test("places ships vertically (large board)", () => {
    const testShip = Ship(3);
    const testGameboard = Gameboard(10);
    const testShipPlacement = {
      ship: testShip,
      isVertical: true,
      coordinates: [2, 2],
      isConfirmed: true,
    };
    expect(
      testGameboard.insertShip(testShipPlacement).newGameboard.map((row) =>
        row.map((col) => ({
          containsShip: col.containsShip,
          isHit: col.isHit,
        }))
      )
    ).toStrictEqual([
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        {
          containsShip: true,
          isHit: false,
        },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        {
          containsShip: true,
          isHit: false,
        },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        {
          containsShip: true,
          isHit: false,
        },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
    ]);
  });

  test("refuses coordinates beyond scope of gameboard", () => {
    let testShip = Ship(2);
    let testGameboard = Gameboard(2);
    const invalidShipPlacement = {
      ship: testShip,
      isVertical: false,
      coordinates: [10, 10],
      isConfirmed: true,
    };
    testGameboard.insertShip(invalidShipPlacement);
    expect(testGameboard.current).toStrictEqual([
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
      [
        { containsShip: false, isHit: false },
        { containsShip: false, isHit: false },
      ],
    ]);
  });
});

it("registers shots (miss)", () => {
  const testShip = Ship(2);
  const testGameboard = Gameboard(2);
  const safePlacement = {
    ship: testShip,
    isVertical: false,
    coordinates: [0, 0],
    isConfirmed: true,
  };
  testGameboard.insertShip(safePlacement);
  testGameboard.receiveAttack([1, 0]);
  expect(
    testGameboard.current.map((row) => row.map(mapJustShipAndHit))
  ).toStrictEqual([
    [
      { containsShip: true, isHit: false },
      { containsShip: true, isHit: false },
    ],
    [
      { containsShip: false, isHit: true },
      { containsShip: false, isHit: false },
    ],
  ]);
});

it("registers shots (hit)", () => {
  const testShip = Ship(2);
  const testGameboard = Gameboard(2);
  const unsafePlacement = {
    ship: testShip,
    isVertical: false,
    coordinates: [0, 0],
    isConfirmed: true,
  };
  testGameboard.insertShip(unsafePlacement);
  testGameboard.receiveAttack([0, 0]);
  expect(
    testGameboard.current.map((row) => row.map(mapJustShipAndHit))
  ).toStrictEqual([
    [
      { containsShip: true, isHit: true },
      { containsShip: true, isHit: false },
    ],
    [
      { containsShip: false, isHit: false },
      { containsShip: false, isHit: false },
    ],
  ]);
});

it("registers hits on ship factory", () => {
  let testShip = Ship(2);
  let testGameboard = Gameboard(2);
  const testShipPlacement = {
    ship: testShip,
    isVertical: false,
    coordinates: [0, 0],
    isConfirmed: true,
  };
  testGameboard.insertShip(testShipPlacement);
  testGameboard.receiveAttack([0, 0]);
  expect(testShip.hits).toStrictEqual([true, false]);
});

it("registers sunk ships", () => {
  let testShip = Ship(2);
  let testGameboard = Gameboard(2);
  const testShipPlacement = {
    ship: testShip,
    isVertical: false,
    coordinates: [0, 0],
    isConfirmed: true,
  };
  testGameboard.insertShip(testShipPlacement);
  testGameboard.receiveAttack([0, 0]);
  testGameboard.receiveAttack([0, 1]);
  expect(testGameboard.current[0][0].shipIsSunk).toBe(true);
});

it("registers afloat ships", () => {
  let testShip = Ship(2);
  let testGameboard = Gameboard(2);
  const testShipPlacement = {
    ship: testShip,
    isVertical: false,
    coordinates: [0, 0],
    isConfirmed: true,
  };
  testGameboard.insertShip(testShipPlacement);
  testGameboard.receiveAttack([0, 0]);
  expect(testGameboard.current[0][0].shipIsSunk).toBe(false);
});

it("registers game over", () => {
  let testShip = Ship(2);
  let testGameboard = Gameboard(2);
  const testShipPlacement = {
    ship: testShip,
    isVertical: false,
    coordinates: [0, 0],
    isConfirmed: true,
  };
  testGameboard.insertShip(testShipPlacement);
  testGameboard.receiveAttack([0, 0]);
  testGameboard.receiveAttack([0, 1]);
  expect(testGameboard.isOver).toBe(true);
});

it("registers game NOT over", () => {
  let testShip = Ship(2);
  let testGameboard = Gameboard(2);
  const testShipPlacement = {
    ship: testShip,
    isVertical: false,
    coordinates: [0, 0],
    isConfirmed: true,
  };
  testGameboard.insertShip(testShipPlacement);
  testGameboard.receiveAttack([0, 0]);
  expect(testGameboard.isOver).toBe(false);
});

it("registers game over (multiple ships)", () => {
  let testShip1 = Ship(2);
  let testShip2 = Ship(2);
  let testGameboard = Gameboard(4);
  const testShip1Placement = {
    ship: testShip1,
    isVertical: false,
    coordinates: [0, 0],
    isConfirmed: true,
  };
  testGameboard.insertShip(testShip1Placement);
  const testShip2Placement = {
    ship: testShip2,
    isVertical: true,
    coordinates: [2, 0],
    isConfirmed: true,
  };
  testGameboard.insertShip(testShip2Placement);
  testGameboard.receiveAttack([0, 0]);
  testGameboard.receiveAttack([0, 1]);
  testGameboard.receiveAttack([2, 0]);
  testGameboard.receiveAttack([3, 0]);
  expect(testGameboard.isOver).toBe(true);
});

it("registers game NOT over (multiple ships)", () => {
  let testShip1 = Ship(2);
  let testShip2 = Ship(2);
  let testGameboard = Gameboard(4);
  const testShip1Placement = {
    ship: testShip1,
    isVertical: false,
    coordinates: [0, 0],
    isConfirmed: true,
  };
  testGameboard.insertShip(testShip1Placement);
  const testShip2Placement = {
    ship: testShip2,
    isVertical: true,
    coordinates: [2, 0],
    isConfirmed: true,
  };
  testGameboard.insertShip(testShip2Placement);
  testGameboard.receiveAttack([0, 0]);
  testGameboard.receiveAttack([0, 1]);
  testGameboard.receiveAttack([2, 0]);
  expect(testGameboard.isOver).toBe(false);
});

it("registers game NOT over (no ships)", () => {
  expect(Gameboard(4).isOver).toBe(false);
});
