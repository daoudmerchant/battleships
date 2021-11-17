import React, { memo } from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  h1 {
    margin: 0;
  }
`;

const Header = memo(() => {
  return (
    <HeaderContainer>
      <h1>Battleships</h1>
    </HeaderContainer>
  );
});

export default Header;
