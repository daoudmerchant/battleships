import React, { useState, useContext } from "react";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";
import styled from "styled-components";

// components
import Gameboard from "./Gameboard";
import ShipPalette from "./ShipPalette";

// contexts
import { VisibilityContext } from "../contexts";

const Turn = styled.p`
  font-size: 1.2rem;
  // margin: 1rem auto -5px;
  font-weight: bold;
`;

const gridDisplayWidth = "82vw";

const GameArea = ({
  game,
  isGameOver,
  placeShip,
  placeLastShip,
  shipsPlaced,
  changeTurn,
  computerTurn,
}) => {
  const [didDrop, setDidDrop] = useState(true);
  const [turnCount, setTurnCount] = useState(0);
  const incrementTurn = () => {
    setTurnCount((count) => count + 1);
  };
  const { visible } = useContext(VisibilityContext);

  // centralise board after having placed ships
  const style = shipsPlaced ? { marginTop: "10vh" } : undefined;
  return (
    <DndProvider backend={TouchBackend}>
      <Turn className={visible ? "fadeIn" : "fadeOut"} style={style}>
        {game.turn === 0 ? "Player 1" : game.player2 ? "Computer" : "Player 2"}
      </Turn>
      {isGameOver ? (
        game.gameboard.map((gameboard, i) => {
          alert("Game over");
          return (
            <Gameboard key={`board${i}`} gameboard={gameboard} length="40vw" />
          );
        })
      ) : (
        <Gameboard
          key={`${game.turn}${turnCount}`}
          gridDisplayWidth={gridDisplayWidth}
          gameboard={game.gameboard[game.turn]}
          shipsPlaced={shipsPlaced}
          ship={game.ships[game.turn][0]}
          placeShip={placeShip}
          didDrop={didDrop}
          setDidDrop={setDidDrop}
          placeLastShip={placeLastShip}
          incrementTurn={incrementTurn}
          changeTurn={changeTurn}
          computerTurn={computerTurn}
        />
      )}
      {shipsPlaced && !computerTurn && (
        <p className={visible ? "fadeIn" : "fadeOut"}>Tap to take a turn</p>
      )}
      {!shipsPlaced && (
        <ShipPalette
          ship={game.ships[game.turn][0]}
          gridDisplayWidth={gridDisplayWidth}
          width={game.gameboard[game.turn].current.length}
          setDidDrop={setDidDrop}
        />
      )}
    </DndProvider>
  );
};

export default GameArea;
