import { useState, useEffect, useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";

// game logic
import Gameboard from "./factories/gameBoardFactory";
import Ship from "./factories/shipFactory";
import Player from "./factories/playerFactory";

// components
import Warnings from "./components/Warnings";
import Header from "./components/Header";
import GameArea from "./components/GameArea";
import ButtonChoice from "./components/ButtonChoice";

// // stylesheet
// import "./App.css";

// context
import { VisibilityContext } from "./contexts";

// styled components
const GlobalStyle = createGlobalStyle`
body,
html,
#root,
.App {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #fff2ff;
  user-select: none;
  box-sizing: border-box;
  text-align: center;
  position: relative;
}

body {
  font-family: "Varela Round", sans-serif;
}

/* fade */

* {
  transition: right 0.2s ease-in, left 0.2s ease-in, opacity 0.25s linear;
}
`;

const Bold = styled.span`
  font-weight: bold;
`;

function App() {
  // game state
  const [size, setSize] = useState(undefined);
  const [isSinglePlayer, setisSinglePlayer] = useState(undefined);
  const [game, setGame] = useState(null);
  const [shipsPlaced, setShipsPlaced] = useState(false);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  // component state
  const [buttonChoiceData, setButtonChoiceData] = useState(null);

  // render state
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const VisibilityValue = { visible };

  const reportEvent = useCallback(
    (cb) => {
      setFadingOut(true);
      setTimeout(() => setVisible(false), game ? 800 : 400);
      setTimeout(
        () => {
          setFadingOut(false);
          cb();
        },
        game ? 1500 : 1000
      );
    },
    [game]
  );

  // fade in
  useEffect(() => {
    if (!visible && !fadingOut) {
      setTimeout(() => setVisible(true), 100);
    }
  }, [visible, fadingOut]);

  // NEW GAME
  useEffect(() => {
    if (!size || isSinglePlayer === undefined) {
      return;
    }
    // ready to go
    const getShips = (boardSize) => {
      const shipSelection = [5, 4, 3, 3, 2];
      return shipSelection
        .slice((10 - boardSize) / 2)
        .map((shipLength) => Ship(shipLength));
    };
    let ships = [getShips(size), getShips(size)];
    const player2 = isSinglePlayer && Player();
    let player2gameboard = Gameboard(size);
    if (isSinglePlayer) {
      // insert AI ships
      while (ships[1].length) {
        player2.placeOwnShip(player2gameboard, ships[1].pop());
      }
    }
    const newGame = {
      player2,
      gameboard: [Gameboard(size), player2gameboard],
      ships,
      turn: 0,
    };
    setGame(newGame);
    setButtonChoiceData(null);
  }, [isSinglePlayer, size]);

  // PLACING SHIPS
  const placeShip = (coordinates, isVertical) => {
    let didPlace;
    setGame((prevGame) => {
      const newGame = Object.assign({}, prevGame);
      didPlace = newGame.gameboard[prevGame.turn].insertShip({
        ship: newGame.ships[prevGame.turn][0],
        isVertical,
        coordinates,
        isConfirmed: true,
      }).isValid;
      if (didPlace) {
        newGame.ships[prevGame.turn].shift();
      }
      return newGame;
    });
    return didPlace;
  };

  const handleAllShipsPlaced = useCallback(() => {
    const swapBoards = () => {
      setGame((prevGame) => {
        const newGame = Object.assign({}, prevGame);
        const [board1, board2] = prevGame.gameboard;
        newGame.gameboard = [board2, board1];
        return newGame;
      });
    };
    setShipsPlaced(true);
    swapBoards();
  }, []);

  // GAME OVER

  const handleGameOver = useCallback(
    (winner, isSinglePlayer) => {
      const resetParameters = () => {
        setSize(undefined);
        setisSinglePlayer(undefined);
        setShipsPlaced(false);
      };
      const proclamation = !isSinglePlayer
        ? `Player ${winner === 0 ? "1" : "2"} is the winner!`
        : winner === 0
        ? "Congratulations, you won!"
        : "Sorry, looks like you lost this time...";
      setButtonChoiceData({
        title: proclamation,
        options: [
          {
            reportClick: () => reportEvent(() => resetParameters()),
            text: "Let's go again!",
          },
        ],
      });
    },
    [reportEvent]
  );

  // TURN MECHANICS

  // change turn
  const changeTurn = useCallback(() => {
    setButtonChoiceData(null);
    const winner = game.gameboard.findIndex((board) => board.isOver);
    if (winner > -1) {
      handleGameOver(winner, isSinglePlayer);
      return;
    }
    if (game.turn === 0 && isSinglePlayer) {
      // will be computer's turn
      setIsComputerTurn(true);
    }
    setGame((prevGame) => {
      const newGame = Object.assign({}, prevGame);
      newGame.turn = !!prevGame.turn ? 0 : 1;
      if (shipsPlaced) {
        return newGame;
      }
      if (newGame.ships.every((shipArray) => !shipArray.length)) {
        handleAllShipsPlaced();
      }
      return newGame;
    });
  }, [game, handleAllShipsPlaced, handleGameOver, isSinglePlayer, shipsPlaced]);

  // TWO PLAYER
  const proposeChangeTurn = () => {
    if (isSinglePlayer && !shipsPlaced && !game.ships[0].length) {
      // only human player just placed last ship
      handleAllShipsPlaced();
      return;
    }
    if (!isSinglePlayer) {
      const playerNo = game.turn === 0 ? "2" : "1";
      setButtonChoiceData({
        title: [
          `It's Player ${playerNo}'s turn!`,
          <br />,
          <br />,
          `Please pass the device.`,
        ],
        options: [
          {
            reportClick: () => reportEvent(() => changeTurn()),
            text: [<Bold>{`Player ${playerNo}`}</Bold>, " here!"],
            key: `P${playerNo}`,
          },
        ],
      });
    }
  };

  // SINGLE PLAYER
  useEffect(() => {
    const takeComputerTurn = () => {
      setGame((prevGame) => {
        const newGame = Object.assign({}, prevGame);
        // FIX: Will occur twice in Strict Mode :(
        newGame.player2.takeTurn(newGame.gameboard[1]);
        return newGame;
      });
    };
    // if computer's turn, take turn
    if (isComputerTurn) {
      setTimeout(() => {
        takeComputerTurn();
        reportEvent(() => {
          changeTurn();
        });
      }, 1000);
    }
    setIsComputerTurn(false);
    // Must NOT have isComputerTurn as a dependency to prevent running a second time
    // after updating
    /* eslint-disable */
  }, [changeTurn, reportEvent]);

  // CHECK GAME OVER
  useEffect(() => {}, [game]);

  // ASK USER QUESTIONS
  useEffect(() => {
    if (!size) {
      // QUESTION 1
      setButtonChoiceData({
        title: "Which board size would you like today?",
        options: [
          {
            reportClick: () => reportEvent(() => setSize(6)),
            text: ["I'm in a rush, ", <Bold>6x6</Bold>, " please."],
            key: "6x6",
          },
          {
            reportClick: () => reportEvent(() => setSize(8)),
            text: ["I've got time for an ", <Bold>8x8</Bold>, " board."],
            key: "8x8",
          },
          {
            reportClick: () => reportEvent(() => setSize(10)),
            text: ["The classic - ", <Bold>10x10</Bold>, "."],
            key: "10x10",
          },
        ],
      });
      return;
    }
    if (isSinglePlayer === undefined) {
      // QUESTION 2
      setButtonChoiceData({
        title: "Are you playing by yourself or with a friend?",
        options: [
          {
            reportClick: () => reportEvent(() => setisSinglePlayer(true)),
            text: ["Just me (", <Bold>1 player</Bold>, ")."],
            key: "1player",
          },
          {
            reportClick: () => reportEvent(() => setisSinglePlayer(false)),
            text: ["Got a friend here (", <Bold>2 players</Bold>, ")."],
            key: "2player",
          },
        ],
      });
      return;
    }
  }, [size, isSinglePlayer, reportEvent]);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Warnings />
        <Header />
        <VisibilityContext.Provider value={VisibilityValue}>
          {game && !buttonChoiceData && (
            <GameArea
              game={game}
              computerTurn={isSinglePlayer && game.turn === 1}
              shipsPlaced={shipsPlaced}
              placeShip={game.ships[game.turn].length ? placeShip : undefined}
              placeLastShip={
                game.ships[game.turn].length === 1
                  ? () => {
                      reportEvent(() => proposeChangeTurn());
                    }
                  : undefined
              }
              changeTurn={
                isSinglePlayer
                  ? () => reportEvent(() => changeTurn())
                  : () => reportEvent(() => proposeChangeTurn())
              }
            />
          )}
          {buttonChoiceData && <ButtonChoice data={buttonChoiceData} />}
        </VisibilityContext.Provider>
      </div>
    </>
  );
}

export default App;
