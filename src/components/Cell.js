import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";

const GameCell = styled.div`
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  border: ${(props) => (props.hasContents ? "none" : "1px solid lightgrey")};
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
  const { containsShip, isDummy, isValid, isHit, shipIsSunk } = cell;

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
      placeLastShip?.();
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
    (shipsPlaced && isHit === false) || !!contents
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
  return (
    <GameCell
      ref={drop}
      backgroundColor={backgroundColor}
      hasContents={!!contents}
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
