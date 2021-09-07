import clone from "just-clone";
import "babel-polyfill";

const Gameboard = (size) => {
  /*
    for some reason, following doesn't work with placeShip method:

    let gameboard = new Array(size).fill(new Array(size).fill({...}));
  */
  let gameboard = [];
  let shipsSunk = [];

  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push({
        containsShip: false,
        isHit: false,
      });
    }
    gameboard.push(row);
  }

  const _exists = (gameboard, [row, col]) =>
    gameboard[row] && gameboard[row][col];

  const insertShip = ({ ship, isVertical, coordinates, isConfirmed }) => {
    const thisGameboard = isConfirmed ? gameboard : clone(gameboard);
    const [row, col] = coordinates;
    let isPossible = true;
    if (
      (isVertical && row + ship.length > size) ||
      (!isVertical && col + ship.length > size)
    ) {
      isPossible = false;
    }
    const loopThroughShipSquares = (gameboard, cb) => {
      for (let i = 0; i < ship.length; i++) {
        const thisRow = isVertical ? row + i : row;
        const thisCol = isVertical ? col : col + i;
        cb(gameboard, [thisRow, thisCol], i);
      }
    };

    const placeShip = (gameboard, [row, col], i) => {
      gameboard[row][col] = {
        containsShip: true,
        isHit: false,
        hitShip: () => {
          ship.hit(i);
        },
        get shipIsSunk() {
          return ship.isSunk;
        },
      };
    };

    const testShipValidity = (gameboard, [row, col]) => {
      const thisSquare = _exists(gameboard, [row, col]);
      if (!thisSquare || thisSquare.containsShip) {
        // doesn't exist or already has ship
        isPossible = false;
      }
    };

    const placeShipDummy = (gameboard, [row, col]) => {
      const validDummyShipPiece = {
        containsShip: true,
        isDummy: true,
        isValid: true,
      };
      const invalidDummyShipPiece = {
        containsShip: true,
        isDummy: true,
        isValid: false,
      };
      if (_exists(gameboard, [row, col])) {
        // exists
        gameboard[row][col] = isPossible
          ? validDummyShipPiece
          : invalidDummyShipPiece;
      }
    };
    // validity check
    loopThroughShipSquares(thisGameboard, testShipValidity);

    if (isConfirmed && isPossible) {
      // successful real placement
      loopThroughShipSquares(thisGameboard, placeShip);
      shipsSunk.push(() => ship.isSunk);
    } else if (!isConfirmed) {
      // dummy placement
      loopThroughShipSquares(thisGameboard, placeShipDummy);
    }
    return {
      newGameboard: thisGameboard,
      isValid: isPossible,
    };
  };
  const receiveAttack = ([row, col]) => {
    if (gameboard[row][col].isHit) {
      return false;
    }
    if (gameboard[row][col].containsShip) {
      gameboard[row][col].hitShip();
    }
    gameboard[row][col].isHit = true;
    return true;
  };

  return {
    get current() {
      return gameboard;
    },
    receiveAttack,
    insertShip,
    get isOver() {
      return (
        !!shipsSunk.length && shipsSunk.every((shipIsSunk) => shipIsSunk())
      );
    },
  };
};

export default Gameboard;
