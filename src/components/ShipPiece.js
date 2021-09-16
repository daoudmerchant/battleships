import React from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import { usePreview } from "react-dnd-preview";

const Ship = styled.div`
  background-color: ${(props) => (props.visible ? "red" : "transparent")};
  display: block;
  width: calc(
    ${(props) => props.gridDisplayWidth} / ${(props) => props.width + 1} *
      ${(props) => (props.isVertical ? "1" : props.shipLength)}
  );
  height: calc(
    ${(props) => props.gridDisplayWidth} / ${(props) => props.width + 1} *
      ${(props) => (props.isVertical ? props.shipLength : "1")}
  );
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

  const ShipPreview = () => {
    const { display, style } = usePreview();
    if (!display) {
      return null;
    }
    return (
      <Ship
        visible={isDragging}
        gridDisplayWidth={gridDisplayWidth}
        isVertical={isVertical}
        width={width}
        shipLength={ship.length}
        style={style}
      />
    );
  };
  return (
    <>
      <Ship
        ref={drag}
        visible={!isDragging}
        gridDisplayWidth={gridDisplayWidth}
        isVertical={isVertical}
        width={width}
        shipLength={ship.length}
      />
      <ShipPreview />
    </>
  );
};

export default ShipPiece;
