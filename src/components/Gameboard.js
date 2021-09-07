import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import styled from "styled-components";

// components
import Cell from "./Cell";

// contexts
import { VisibilityContext } from "../contexts";

const GameboardDiv = styled.div`
  display: grid;
  margin: 0 auto;
  grid-gap: 1px;
`;

const Gameboard = ({
  gameboard,
  gridDisplayWidth,
  ship,
  placeShip,
  shipsPlaced,
  didDrop,
  setDidDrop,
  placeLastShip,
  incrementTurn,
  changeTurn,
  computerTurn,
}) => {
  const boardSize = gameboard.current.length;
  const [displayedGameboard, setDisplayedGameboard] = useState(
    gameboard.current
  );
  const { visible } = useContext(VisibilityContext);

  const Letters = useMemo(() => {
    let LetterArray = [];
    for (let i = 0; i < boardSize; i++) {
      LetterArray.push(String.fromCharCode(65 + i));
    }
    return LetterArray;
  }, [boardSize]);

  const resetDisplayedGameboard = useCallback(() => {
    setDisplayedGameboard(gameboard.current);
  }, [gameboard]);

  useEffect(() => {
    if (!didDrop) {
      resetDisplayedGameboard();
    }
  }, [didDrop, resetDisplayedGameboard]);

  const setHoverGameboard = (coordinates, isVertical) => {
    const hoverGameboard = gameboard.insertShip({
      ship,
      isVertical,
      coordinates,
      isConfirmed: false,
    });
    setDisplayedGameboard(hoverGameboard.newGameboard);
  };

  const takeTurn = (coordinates) => {
    const turn = gameboard.receiveAttack(coordinates);
    if (!turn) {
      return;
    }
    incrementTurn();
    changeTurn();
  };

  // const GameCell = ({ cell, row, col }) => {
  //   TODO: hover works but drop ship doesn't(??)
  //   return (
  //     <Cell
  //       cell={cell}
  //       key={`square${row}-${col}`}
  //       coordinates={[Number(row), Number(col)]}
  //       placeShip={placeShip}
  //       placeLastShip={placeLastShip}
  //       setHoverGameboard={setHoverGameboard}
  //       resetDisplayedGameboard={resetDisplayedGameboard}
  //       reportDrop={reportDrop}
  //       takeTurn={shipsPlaced ? takeTurn : undefined}
  //     />
  //   );
  // };

  const reportDrop = (() => {
    const confirm = (isTrueDrop) => {
      setDidDrop(true);
      if (!isTrueDrop) {
        return;
      }
      incrementTurn();
    };
    const deny = () => {
      setDidDrop(false);
    };
    return {
      confirm,
      deny,
    };
  })();

  return (
    <GameboardDiv
      className={visible ? "fadeIn" : "fadeOut"}
      style={{
        gridTemplateRows: `repeat(${boardSize + 1}, 1fr)`,
        gridTemplateColumns: `repeat(${boardSize + 1}, 1fr)`,
        width: gridDisplayWidth,
        height: gridDisplayWidth,
      }}
    >
      <Cell contents={" "} reportDrop={reportDrop} />
      {Letters.map((letter) => (
        <Cell
          contents={letter}
          key={`letter${letter}`}
          reportDrop={reportDrop}
        />
      ))}
      {displayedGameboard &&
        displayedGameboard.map((row, i) =>
          row.map((cell, j) => {
            if (j === 0 || j % (boardSize + 1) === 0) {
              return (
                <>
                  <Cell
                    contents={i + 1}
                    key={`num${i + 1}`}
                    reportDrop={reportDrop}
                  />
                  {/* <GameCell cell={cell} row={i} col={j} /> */}
                  <Cell
                    cell={cell}
                    key={`square${i}-${j}`}
                    coordinates={[i, j]}
                    placeShip={placeShip}
                    placeLastShip={placeLastShip}
                    setHoverGameboard={setHoverGameboard}
                    reportDrop={reportDrop}
                    takeTurn={
                      shipsPlaced && !computerTurn ? takeTurn : undefined
                    }
                    shipsPlaced={shipsPlaced}
                    changeTurn={changeTurn}
                  />
                </>
              );
            } else {
              return (
                <Cell
                  cell={cell}
                  key={`square${i}-${j}`}
                  coordinates={[i, j]}
                  placeShip={placeShip}
                  placeLastShip={placeLastShip}
                  setHoverGameboard={setHoverGameboard}
                  reportDrop={reportDrop}
                  takeTurn={shipsPlaced && !computerTurn ? takeTurn : undefined}
                  shipsPlaced={shipsPlaced}
                />
                // <GameCell cell={cell} row={i} col={j} />
              );
            }
          })
        )}
    </GameboardDiv>
  );
};

export default Gameboard;
