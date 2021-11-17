import React, { memo } from "react";
import styled from "styled-components";

const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #fff2ff;
`;

const NoTouchWarning = styled(WarningContainer)`
  z-index: 2;
  @media (hover: none) {
    display: none;
  }
  @media (pointer: coarse) {
    display: none;
  }
`;

const LandscapeWarning = styled(WarningContainer)`
  z-index: 1;
  @media (orientation: portrait) {
    display: none;
  }
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Warnings = memo(() => {
  return (
    <>
      <NoTouchWarning>
        <h1 style={{ fontSize: "3rem" }}>Sorry!</h1>
        <p style={{ fontSize: "2rem" }}>
          {[
            "This app has been optimised for ",
            <Bold>touch devices</Bold>,
            ".",
          ]}
        </p>
      </NoTouchWarning>
      <LandscapeWarning>
        <p style={{ fontSize: "2.5rem" }}>
          {[
            "Please hold your device in ",
            <Bold>portrait orientation</Bold>,
            ".",
          ]}
        </p>
      </LandscapeWarning>
    </>
  );
});

export default Warnings;
