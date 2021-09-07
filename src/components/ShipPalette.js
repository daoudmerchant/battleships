import React, { useContext } from "react";
import styled from "styled-components";

// component
import ShipPiece from "./ShipPiece";

// contexts
import { VisibilityContext } from "../contexts";

const Container = styled.div`
  width: 90vw;
  height: min-content;
  margin: 20px auto;
`;

const ShipContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Caption = styled.p`
  font-size: 1.5rem;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const ShipPalette = ({ ship, width, setDidDrop, gridDisplayWidth }) => {
  const { visible } = useContext(VisibilityContext);
  return (
    <Container className={visible ? "fadeIn" : "fadeOut"}>
      <Caption>
        {["Drag ", <Bold>either</Bold>, " ship on to the board"]}
      </Caption>
      <ShipContainer>
        {ship && (
          <>
            <ShipPiece
              ship={ship}
              width={width}
              gridDisplayWidth={gridDisplayWidth}
              setDidDrop={setDidDrop}
              isVertical={false}
            />
            <ShipPiece
              ship={ship}
              width={width}
              gridDisplayWidth={gridDisplayWidth}
              setDidDrop={setDidDrop}
              isVertical={true}
            />
          </>
        )}
      </ShipContainer>
    </Container>
  );
};

export default ShipPalette;
