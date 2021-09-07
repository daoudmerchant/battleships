import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";

const GameCell = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cell = ({
  cell = {},
  contents,
  coordinates,
  placeShip,
  setHoverGameboard,
  reportDrop,
  placeLastShip,
  takeTurn,
  shipsPlaced,
}) => {
  const checkIfExists = (cell, prop) => {
    return cell.hasOwnProperty(prop) ? cell[prop] : undefined;
  };
  const containsShip = checkIfExists(cell, "containsShip"),
    isDummy = checkIfExists(cell, "isDummy"),
    isValid = checkIfExists(cell, "isValid"),
    isHit = checkIfExists(cell, "isHit"),
    shipIsSunk = checkIfExists(cell, "shipIsSunk");

  const [, drop] = useDrop(() => ({
    accept: ["SHIP-VERTICAL", "SHIP-HORIZONTAL"],
    drop: (item, monitor) => {
      if (!coordinates) {
        return;
      }
      const type = monitor.getItemType();
      const isVertical = type === "SHIP-VERTICAL" ? true : false;
      let didPlace = placeShip(coordinates, isVertical);
      if (!didPlace) {
        reportDrop.deny();
        return;
      }
      reportDrop.confirm(true);
      placeLastShip && placeLastShip();
    },
    hover(props, monitor) {
      if (contents) {
        reportDrop.deny();
        return;
      }
      const type = monitor.getItemType();
      const isVertical = type === "SHIP-VERTICAL" ? true : false;
      setHoverGameboard(coordinates, isVertical);
      reportDrop.confirm(false);
    },
  }));
  const backgroundColor =
    (shipsPlaced && isHit === false) || contents
      ? "transparent"
      : shipIsSunk
      ? "lightgrey"
      : containsShip && ((isHit && shipsPlaced) || (!isDummy && !shipsPlaced))
      ? "red"
      : containsShip && isDummy && isValid
      ? "lightgreen"
      : containsShip && isDummy && isValid === false
      ? "orange"
      : "rgb(215, 245, 255)";
  const style = contents
    ? { backgroundColor: backgroundColor, border: "none" }
    : {
        backgroundColor: backgroundColor,
      };
  return (
    <GameCell
      ref={drop}
      style={style}
      onClick={
        takeTurn
          ? () => {
              takeTurn(coordinates);
            }
          : undefined
      }
    >
      {contents}
    </GameCell>
  );
};

export default Cell;
