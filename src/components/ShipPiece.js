import React from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import { usePreview } from "react-dnd-preview";

const Ship = styled.div`
  background-color: red;
  display: block;
`;

const ShipPiece = ({
  ship,
  isVertical,
  width,
  gridDisplayWidth,
  setDidDrop,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: isVertical ? "SHIP-VERTICAL" : "SHIP-HORIZONTAL",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        setDidDrop(false);
      }
    },
  }));

  const shipLength = `calc(${gridDisplayWidth} / ${width + 1} * ${
    ship.length
  })`;
  const shipHeight = `calc(${gridDisplayWidth} / ${width + 1})`;

  const ShipPreview = () => {
    const { display, style } = usePreview();
    if (!display) {
      return null;
    }
    return isVertical ? (
      <Ship
        style={Object.assign(style, {
          width: shipHeight,
          height: shipLength,
          backgroundColor: isDragging ? "red" : "transparent",
        })}
      />
    ) : (
      <Ship
        style={Object.assign(style, {
          width: shipLength,
          height: shipHeight,
          backgroundColor: isDragging ? "red" : "transparent",
        })}
      />
    );
  };
  return (
    <>
      <Ship
        ref={drag}
        style={{
          width: isVertical ? shipHeight : shipLength,
          height: isVertical ? shipLength : shipHeight,
          backgroundColor: isDragging ? "transparent" : "red",
        }}
      />{" "}
      <ShipPreview />
    </>
  );
};

export default ShipPiece;
