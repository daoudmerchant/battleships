import Player from "./playerFactory";
import Gameboard from "./gameBoardFactory";
import Ship from "./shipFactory";

// mock board squares

const EMPTY = {
  containsShip: false,
  isHit: false,
};

const MISS = {
  containsShip: false,
  isHit: true,
};

const SHIP_UNHIT = {
  containsShip: true,
  isHit: false,
  shipIsSunk: false,
};

const SHIP_HIT = {
  containsShip: true,
  isHit: true,
  shipIsSunk: false,
};

const SHIP_SUNK = {
  containsShip: true,
  isHit: true,
  shipIsSunk: true,
};

const mapJustShipAndHit = (square) => ({
  containsShip: square.containsShip,
  isHit: square.isHit,
});

describe("Board assessment assistant methods", () => {
  test("Can retrieve adjacent square", () => {
    const testGameboardState = [
      [
        {
          containsShip: true,
          isHit: false,
          shipshipIsSunk: false,
        },
        {
          containsShip: false,
          isHit: false,
        },
      ],
      [
        {
          containsShip: true,
          isHit: true,
          shipshipIsSunk: false,
        },
        {
          containsShip: false,
          isHit: false,
        },
      ],
    ];
    expect(
      Player().test.getAdjacentSquare.left(testGameboardState, [0, 1])
    ).toStrictEqual({
      coordinates: [0, 0],
      boardsquare: {
        containsShip: true,
        isHit: false,
        shipshipIsSunk: false,
      },
    });
  });

  test("Can return false if square exists", () => {
    const testGameboardState = [
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
        { containsShip: false, isHit: false },
        {
          containsShip: false,
          isHit: false,
        },
      ],
    ];
    expect(
      Player().test.getAdjacentSquare.left(testGameboardState, [0, 0])
    ).toBeFalsy();
  });

  test("Can return false if any squares don't exist", () => {
    const testGameboardState = [
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
        { containsShip: false, isHit: false },
        {
          containsShip: false,
          isHit: false,
        },
      ],
    ];
    const testPlayer = Player();
    const squareToRight = testPlayer.test.getAdjacentSquare.right(
      testGameboardState,
      [0, 0]
    );
    const squareToLeft = testPlayer.test.getAdjacentSquare.left(
      testGameboardState,
      [0, 0]
    );
    const squareAbove = testPlayer.test.getAdjacentSquare.up(
      testGameboardState,
      [0, 0]
    );
    const squareBelow = testPlayer.test.getAdjacentSquare.down(
      testGameboardState,
      [0, 0]
    );
    const squareList = [squareToRight, squareToLeft, squareAbove, squareBelow];
    expect(testPlayer.test.checkFor.allTruthy(squareList)).toBeFalsy();
  });

  test("Can return true if all squares exist", () => {
    const testGameboardState = [
      [
        {
          containsShip: false,
          isHit: false,
        },
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
        {
          containsShip: false,
          isHit: false,
        },
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
        {
          containsShip: false,
          isHit: false,
        },
        {
          containsShip: false,
          isHit: false,
        },
        {
          containsShip: false,
          isHit: false,
        },
      ],
    ];
    const testPlayer = Player();
    const squareToRight = testPlayer.test.getAdjacentSquare.right(
      testGameboardState,
      [1, 1]
    );
    const squareToLeft = testPlayer.test.getAdjacentSquare.left(
      testGameboardState,
      [1, 1]
    );
    const squareAbove = testPlayer.test.getAdjacentSquare.up(
      testGameboardState,
      [1, 1]
    );
    const squareBelow = testPlayer.test.getAdjacentSquare.down(
      testGameboardState,
      [1, 1]
    );
    const squareList = [squareToRight, squareToLeft, squareAbove, squareBelow];
    expect(testPlayer.test.checkFor.allTruthy(squareList)).toBeTruthy();
  });

  test("Can check if square is hit but not sunk", () => {
    const testSquare = {
      coordinates: [0, 0],
      boardsquare: {
        containsShip: true,
        isHit: true,
        shipshipIsSunk: false,
      },
    };
    expect(Player().test.checkFor.hitButNotSunk(testSquare)).toBeTruthy();
  });

  test("Can check if square is unhit", () => {
    const testSquare = {
      coordinates: [0, 0],
      boardsquare: {
        containsShip: false,
        isHit: false,
      },
    };
    expect(Player().test.checkFor.unhit(testSquare)).toBeTruthy();
  });

  test("Can check if square missed", () => {
    const testSquare = {
      coordinates: [0, 0],
      boardsquare: {
        containsShip: false,
        isHit: true,
      },
    };
    expect(Player().test.checkFor.missed(testSquare)).toBeTruthy();
  });

  test("Can filter array for unhit squares", () => {
    const testSquareArray = [
      {
        coordinates: [2, 3],
        boardsquare: {
          containsShip: true,
          isHit: true,
          shipIsSunk: true,
        },
      },
      {
        coordinates: [2, 1],
        boardsquare: {
          containsShip: false,
          isHit: false,
        },
      },
      {
        coordinates: [1, 2],
        boardsquare: {
          containsShip: false,
          isHit: true,
        },
      },
      {
        coordinates: [3, 2],
        boardsquare: {
          containsShip: true,
          isHit: false,
        },
      },
    ];
    expect(Player().test.checkFor.unhit(testSquareArray)).toStrictEqual([
      {
        coordinates: [2, 1],
        boardsquare: {
          containsShip: false,
          isHit: false,
        },
      },
      {
        coordinates: [3, 2],
        boardsquare: {
          containsShip: true,
          isHit: false,
        },
      },
    ]);
  });

  test("Returns false if array filter returns empty array", () => {
    const testSquareArray = [
      {
        coordinates: [2, 3],
        boardsquare: {
          containsShip: true,
          isHit: true,
          shipIsSunk: true,
        },
      },
      {
        coordinates: [2, 1],
        boardsquare: {
          containsShip: false,
          isHit: false,
        },
      },
      {
        coordinates: [1, 2],
        boardsquare: {
          containsShip: false,
          isHit: true,
        },
      },
      {
        coordinates: [3, 2],
        boardsquare: {
          containsShip: true,
          isHit: false,
        },
      },
    ];
    expect(Player().test.checkFor.hitButNotSunk(testSquareArray)).toBeFalsy();
  });
});

describe("Board assessment", () => {
  /*
    SAMPLE BOARD 1

    - Unhit, empty
    O Hit, empty (MISS)
    s Unhit ship
    X Hit UNSUNK ship
    x SUNK ship
    * NEXT LOGICAL TURNS

    -O--O
    -xxO-
    *X*--
    -O-O-
    --O--
  */

  const sampleBoard1 = [
    [EMPTY, MISS, EMPTY, EMPTY, MISS],
    [EMPTY, SHIP_SUNK, SHIP_SUNK, MISS, EMPTY],
    [SHIP_UNHIT, SHIP_HIT, SHIP_UNHIT, EMPTY, EMPTY],
    [EMPTY, MISS, EMPTY, MISS, EMPTY],
    [EMPTY, EMPTY, MISS, EMPTY, EMPTY],
  ];

  test("Predicts all unhit squares around hit unsunk ship", () => {
    expect(Player().test.processBoard(sampleBoard1)).toStrictEqual([
      [2, 2],
      [2, 0],
    ]);
  });

  /*
    SAMPLE BOARD 2

    -O-
    xxx
    -O-
  */

  const sampleBoard2 = [
    [EMPTY, MISS, EMPTY],
    [SHIP_SUNK, SHIP_SUNK, SHIP_SUNK],
    [EMPTY, MISS, EMPTY],
  ];

  test("Returns all random moves if there are no predictions", () => {
    expect(Player().test.processBoard(sampleBoard2)).toStrictEqual([
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
    ]);
  });

  /*
    SAMPLE BOARD 3

    ---
    *XX
    ---
  */

  const sampleBoard3 = [
    [EMPTY, EMPTY, EMPTY],
    [SHIP_UNHIT, SHIP_HIT, SHIP_HIT],
    [EMPTY, EMPTY, EMPTY],
  ];

  /*
    SAMPLE BOARD 4

    -*-
    -X-
    -X-
  */

  const sampleBoard4 = [
    [EMPTY, SHIP_UNHIT, EMPTY],
    [EMPTY, SHIP_HIT, EMPTY],
    [EMPTY, SHIP_HIT, EMPTY],
  ];

  /*
    SAMPLE BOARD 5

    ---
    XX*
    ---
  */

  const sampleBoard5 = [
    [EMPTY, EMPTY, EMPTY],
    [SHIP_HIT, SHIP_HIT, SHIP_UNHIT],
    [EMPTY, EMPTY, EMPTY],
  ];

  test("Predicts square other side of line of hits", () => {
    const testPlayer = Player();
    expect(testPlayer.test.processBoard(sampleBoard3)).toStrictEqual([[1, 0]]);
    expect(testPlayer.test.processBoard(sampleBoard4)).toStrictEqual([[0, 1]]);
    expect(testPlayer.test.processBoard(sampleBoard5)).toStrictEqual([[1, 2]]);
  });

  test("Will log backup moves (adjacent ships)", () => {
    /*
      SAMPLE BOARD 6

      XXO
      xx-
      x--
    */
    const sampleBoard6 = [
      [SHIP_HIT, SHIP_HIT, MISS],
      [SHIP_UNHIT, SHIP_UNHIT, EMPTY],
      [SHIP_UNHIT, EMPTY, EMPTY],
    ];
    expect(Player().test.processBoard(sampleBoard6)).toStrictEqual([
      [1, 0],
      [1, 1],
    ]);

    /*
      SAMPLE BOARD 7
      -**-
      OXXO
      -**-
      ----
    */

    const sampleBoard7 = [
      [EMPTY, SHIP_UNHIT, SHIP_UNHIT, EMPTY],
      [MISS, SHIP_HIT, SHIP_HIT, MISS],
      [EMPTY, SHIP_UNHIT, SHIP_UNHIT, EMPTY],
      [EMPTY, EMPTY, EMPTY, EMPTY],
    ];
    expect(Player().test.processBoard(sampleBoard7)).toStrictEqual([
      [0, 1],
      [2, 1],
      [0, 2],
      [2, 2],
    ]);
  });

  test("Will ignore backup moves if better move available", () => {
    /*
      SAMPLE BOARD 8

      XXO
      x--
      *XX
    */

    const sampleBoard8 = [
      [SHIP_HIT, SHIP_HIT, MISS],
      [SHIP_UNHIT, EMPTY, EMPTY],
      [SHIP_UNHIT, SHIP_HIT, SHIP_HIT],
    ];

    expect(Player().test.processBoard(sampleBoard8)).toStrictEqual([[2, 0]]);
  });
});

describe("RANDOM TEST - will always choose [0, 0]", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  test("Takes a random turn", () => {
    let testGameboard = Gameboard(2);
    Player().takeTurn(testGameboard);
    expect(testGameboard.current).toStrictEqual([
      [
        {
          containsShip: false,
          isHit: true,
        },
        {
          containsShip: false,
          isHit: false,
        },
      ],
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
    ]);
  });

  test("Randomly choose turn from selection", () => {
    /*
      SAMPLE BOARD 6

      ---
      sX*
      ---
    */

    const testGameboard = Gameboard(3);
    const testShip = Ship(3);
    testGameboard.insertShip({
      ship: testShip,
      isVertical: false,
      coordinates: [1, 0],
      isConfirmed: true,
    });
    testGameboard.receiveAttack([1, 1]);
    Player().takeTurn(testGameboard);
    expect(
      testGameboard.current.map((row) => row.map(mapJustShipAndHit))
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
        {
          containsShip: false,
          isHit: false,
        },
      ],
      [
        {
          containsShip: true,
          isHit: false,
        },
        {
          containsShip: true,
          isHit: true,
        },
        {
          containsShip: true,
          isHit: true,
        },
      ],
      [
        {
          containsShip: false,
          isHit: false,
        },
        {
          containsShip: false,
          isHit: false,
        },
        {
          containsShip: false,
          isHit: false,
        },
      ],
    ]);
  });

  test("Randomly choose turn from selection (recognises game edge)", () => {
    /*
      SAMPLE BOARD 6

      ---
      s*X
      ---
    */

    const testGameboard = Gameboard(3);
    const testShip = Ship(3);
    testGameboard.insertShip({
      ship: testShip,
      isVertical: false,
      coordinates: [1, 0],
      isConfirmed: true,
    });
    testGameboard.receiveAttack([1, 2]);
    Player().takeTurn(testGameboard);
    expect(
      testGameboard.current.map((row) => row.map(mapJustShipAndHit))
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
        {
          containsShip: false,
          isHit: false,
        },
      ],
      [
        {
          containsShip: true,
          isHit: false,
        },
        {
          containsShip: true,
          isHit: true,
        },
        {
          containsShip: true,
          isHit: true,
        },
      ],
      [
        {
          containsShip: false,
          isHit: false,
        },
        {
          containsShip: false,
          isHit: false,
        },
        {
          containsShip: false,
          isHit: false,
        },
      ],
    ]);
  });

  test("Randomly places ship", () => {
    const testGameboard = Gameboard(2);
    const testShip = Ship(2);
    const testPlayer = Player();
    const testShipOptions = testPlayer.test.findShipPlacements({
      currentGameboard: testGameboard.current,
      shipLength: 2,
      isVertical: true,
    });
    const testShipCoordinates = testShipOptions[0];
    const testShipPlacement = {
      ship: testShip,
      isVertical: true,
      coordinates: testShipCoordinates,
      isConfirmed: true,
    };
    testGameboard.insertShip(testShipPlacement);
    expect(
      testGameboard.current.map((row) => row.map(mapJustShipAndHit))
    ).toStrictEqual([
      [
        {
          containsShip: true,
          isHit: false,
        },
        {
          containsShip: false,
          isHit: false,
        },
      ],
      [
        {
          containsShip: true,
          isHit: false,
        },
        {
          containsShip: false,
          isHit: false,
        },
      ],
    ]);
  });
  test("Will log backup moves (adjacent ships)", () => {
    const sampleBoard6 = [
      [SHIP_HIT, SHIP_HIT, MISS],
      [SHIP_UNHIT, SHIP_UNHIT, EMPTY],
      [SHIP_UNHIT, EMPTY, EMPTY],
    ];
    expect(Player().test.processBoard(sampleBoard6)).toStrictEqual([
      [1, 0],
      [1, 1],
    ]);
  });
});

test("Assesses empty board for ship placements (vertical)", () => {
  expect(
    Player().test.findShipPlacements({
      currentGameboard: Gameboard(2).current,
      shipLength: 2,
      isVertical: true,
    })
  ).toStrictEqual([
    [0, 0],
    [0, 1],
  ]);
});

test("Assesses empty board for ship placements (horizontal)", () => {
  expect(
    Player().test.findShipPlacements({
      currentGameboard: Gameboard(2).current,
      shipLength: 2,
      isVertical: false,
    })
  ).toStrictEqual([
    [0, 0],
    [1, 0],
  ]);
});
test("Assesses busy board for ship placements (vertical)", () => {
  /*
    SAMPLE BOARD 7

    * Possible placements of a HORIZONTAL 3 SQUARE SHIP

    *-sss
    *-***
    *s***
    -s---
    -s---
  */

  const testGameboard = [
    [EMPTY, EMPTY, SHIP_UNHIT, SHIP_UNHIT, SHIP_UNHIT],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, SHIP_UNHIT, EMPTY, EMPTY, EMPTY],
    [EMPTY, SHIP_UNHIT, EMPTY, EMPTY, EMPTY],
    [EMPTY, SHIP_UNHIT, EMPTY, EMPTY, EMPTY],
  ];

  expect(
    Player().test.findShipPlacements({
      currentGameboard: testGameboard,
      shipLength: 3,
      isVertical: true,
    })
  ).toStrictEqual([
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 2],
    [2, 2],
    [1, 3],
    [2, 3],
    [1, 4],
    [2, 4],
  ]);
});

test("Assesses busy board for ship placements (horizontal)", () => {
  /*
    SAMPLE BOARD 7

    * Possible placements of a HORIZONTAL 3 SQUARE SHIP

    --sss
    ***--
    -s*--
    -s*--
    -s*--
  */

  const testGameboard = [
    [EMPTY, EMPTY, SHIP_UNHIT, SHIP_UNHIT, SHIP_UNHIT],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, SHIP_UNHIT, EMPTY, EMPTY, EMPTY],
    [EMPTY, SHIP_UNHIT, EMPTY, EMPTY, EMPTY],
    [EMPTY, SHIP_UNHIT, EMPTY, EMPTY, EMPTY],
  ];

  expect(
    Player().test.findShipPlacements({
      currentGameboard: testGameboard,
      shipLength: 3,
      isVertical: false,
    })
  ).toStrictEqual([
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
  ]);
});
