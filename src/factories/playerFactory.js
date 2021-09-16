const Player = () => {
  const checkFor = (() => {
    const _filterOrCheck = (item, cb) => {
      if (item.length) {
        const filteredArray = item.filter(cb);
        return filteredArray.length && filteredArray;
      } else if (typeof item === "object") {
        return cb(item);
      } else {
        throw new Error("Only accepts arrays or objects");
      }
    };

    const hitButNotSunk = (square_s) => {
      const _isHitButNotSunk = (square) =>
        square.boardsquare.isHit &&
        square.boardsquare.containsShip &&
        !square.boardsquare.shipIsSunk;
      return _filterOrCheck(square_s, _isHitButNotSunk);
    };
    const unhit = (square_s) => {
      const _isUnhit = (square) => !square.boardsquare.isHit;
      return _filterOrCheck(square_s, _isUnhit);
    };
    const hit = (square_s) => {
      const _isHit = (square) => square.boardsquare.isHit;
      return _filterOrCheck(square_s, _isHit);
    };
    const missed = (square_s) => {
      const _isMissed = (square) =>
        square.boardsquare.isHit && !square.boardsquare.containsShip;
      return _filterOrCheck(square_s, _isMissed);
    };
    const _isTruthy = (square) => square;
    const truthy = (square_s) => {
      return _filterOrCheck(square_s, _isTruthy);
    };
    const allTruthy = (squares) => squares.every(_isTruthy);

    return {
      hitButNotSunk,
      unhit,
      hit,
      missed,
      truthy,
      allTruthy,
    };
  })();

  const getAdjacentSquare = (() => {
    const _exists = (currentGameboard, [row, col]) => {
      return currentGameboard[row] && currentGameboard[row][col];
    };

    const left = (currentGameboard, [row, col]) => {
      return (
        _exists(currentGameboard, [row, col - 1]) && {
          coordinates: [row, col - 1],
          boardsquare: currentGameboard[row][col - 1],
        }
      );
    };
    const right = (currentGameboard, [row, col]) => {
      return (
        _exists(currentGameboard, [row, col + 1]) && {
          coordinates: [row, col + 1],
          boardsquare: currentGameboard[row][col + 1],
        }
      );
    };
    const up = (currentGameboard, [row, col]) => {
      return (
        _exists(currentGameboard, [row - 1, col]) && {
          coordinates: [row - 1, col],
          boardsquare: currentGameboard[row - 1][col],
        }
      );
    };
    const down = (currentGameboard, [row, col]) => {
      return (
        _exists(currentGameboard, [row + 1, col]) && {
          coordinates: [row + 1, col],
          boardsquare: currentGameboard[row + 1][col],
        }
      );
    };
    return {
      left,
      right,
      up,
      down,
    };
  })();

  const processBoard = (gameboard) => {
    let predictiveMoves = undefined;
    let backupMoves = undefined;
    let randomMoves = [];
    const _pushToBackup = (array) => {
      array.forEach((item) => backupMoves.push(item.coordinates));
    };

    for (let [i, row] of gameboard.entries()) {
      for (let [j, cell] of row.entries()) {
        if (cell.isHit && cell.containsShip && !cell.shipIsSunk) {
          // HIT
          // check surrounding squares
          const squareToRight = getAdjacentSquare.right(gameboard, [i, j]);
          const squareToLeft = getAdjacentSquare.left(gameboard, [i, j]);
          const squareAbove = getAdjacentSquare.up(gameboard, [i, j]);
          const squareBelow = getAdjacentSquare.down(gameboard, [i, j]);
          const squareList = [
            squareToRight,
            squareToLeft,
            squareAbove,
            squareBelow,
          ];
          const adjacentSquares = checkFor.truthy(squareList);
          const unhitSquares = checkFor.unhit(adjacentSquares);
          if (!unhitSquares.length) {
            // no adjacent squares to try, move on
            continue;
          }
          const shipsInProgress = checkFor.hitButNotSunk(adjacentSquares);
          if (!shipsInProgress.length) {
            // all unhit squares worth trying
            predictiveMoves = unhitSquares.map((square) => square.coordinates);
            break;
          }
          // check for hit square opposite unhit square
          const oppositeSquareList = [
            squareToLeft,
            squareToRight,
            squareBelow,
            squareAbove,
          ];
          let options = [];
          for (let i = 0; i < 4; i++) {
            const squareA = squareList[i];
            const squareB = oppositeSquareList[i];

            if (
              checkFor.allTruthy([squareA, squareB]) &&
              checkFor.unhit(squareA) &&
              checkFor.hitButNotSunk(squareB)
            ) {
              // unhit square worth trying
              options.push(squareA.coordinates);
            } else if (
              squareA &&
              checkFor.hitButNotSunk(squareA) &&
              (!squareB || checkFor.hit(squareB))
            ) {
              // might extend in a different axis
              if (!backupMoves) {
                backupMoves = [];
              }
              const unhitSquares = checkFor.unhit(adjacentSquares);
              unhitSquares && _pushToBackup(unhitSquares);
            }
          }
          if (options.length) {
            predictiveMoves = options;
            break;
          }
        } else if (!cell.isHit) {
          randomMoves.push([i, j]);
        }
      }
      if (predictiveMoves) {
        // got some squares to try, bail out
        break;
      }
    }
    return predictiveMoves || backupMoves || randomMoves;
  };

  const _getRandom = (array) => {
    if (array.length === 1) {
      return array[0];
    }
    return array[Math.floor(Math.random() * array.length)];
  };

  const takeTurn = (gameboard) => {
    const nextMove = _getRandom(processBoard(gameboard.current));
    gameboard.receiveAttack(nextMove);
  };

  const findShipPlacements = ({ currentGameboard, shipLength, isVertical }) => {
    let freeAxisSquares = [];
    currentGameboard.forEach((row, i) => {
      row.forEach((cell, j) => {
        const index = isVertical ? j : i;
        if (cell.containsShip) {
          return;
        }
        const getLastItem = (array) => {
          return array[array.length - 1];
        };
        function arraysAreEqual(a, b) {
          return (
            Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, arrayIndex) => val === b[arrayIndex])
          );
        }
        // available
        const squareBefore = isVertical ? [i - 1, j] : [i, j - 1];
        if (
          freeAxisSquares[index] &&
          arraysAreEqual(getLastItem(freeAxisSquares[index]), squareBefore)
        ) {
          // last coordinates were square above
          freeAxisSquares[index].push([i, j]);
        } else {
          freeAxisSquares[index] = [[i, j]];
        }
      });
    });
    return (
      freeAxisSquares
        // long enough to fit ship
        .filter((array) => array.length >= shipLength)
        // get all possible start coordinates
        .map((array) => array.slice(0, 1 - shipLength))
        .flat()
    );
  };

  const placeOwnShip = (gameboard, ship) => {
    const isVertical = Math.random() < 0.5;
    const shipPlacements = findShipPlacements({
      currentGameboard: gameboard.current,
      shipLength: ship.length,
      isVertical,
    });
    const randomShipPlacement = _getRandom(shipPlacements);
    const insertion = {
      ship,
      isVertical,
      coordinates: randomShipPlacement,
      isConfirmed: true,
    };
    gameboard.insertShip(insertion);
  };
  return {
    takeTurn,
    placeOwnShip,
    test: {
      checkFor,
      getAdjacentSquare,
      processBoard,
      findShipPlacements,
    },
  };
};

export default Player;
