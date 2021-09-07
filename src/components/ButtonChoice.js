import React, { useState, useContext } from "react";
import styled from "styled-components";

// context
import { VisibilityContext } from "../contexts";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  justify-content: space-evenly;
`;

const TitleContainer = styled.div`
  display: flex;
  margin: 0 15vw;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const Button = styled.button`
  display: block;
  font-size: 1.2rem;
  padding: 0;
  flex-grow: 1;
  margin: 0 10vw 8vw;
  border: 1px solid transparent;
  border-radius: 10px;
  -webkit-box-shadow: -5px 5px 9px 1px rgba(0, 0, 0, 0.3);
  box-shadow: -5px 5px 9px 1px rgba(0, 0, 0, 0.2);
`;

const ButtonChoice = ({ data: { title, options } }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { visible } = useContext(VisibilityContext);
  return (
    <Container>
      <TitleContainer className={visible ? "fadeIn" : "fadeOut"}>
        <h2>{title}</h2>
      </TitleContainer>
      {options.map((option, i) => {
        const delay = 200 + i * 100;
        let style = {
          transition: `bottom 0.3s linear ${delay}ms, opacity 0.3s linear ${delay}ms, background-color 0.15s linear`,
          backgroundColor: isClicked === i ? "#c4ffce" : "white",
        };
        return (
          <Button
            key={option.key}
            onClick={() => {
              setIsClicked(i);
              option.reportClick();
              setTimeout(() => {
                setIsClicked(false);
              }, 1200);
            }}
            className={visible ? "zip center" : "zip down"}
            style={style}
          >
            {option.text}
          </Button>
        );
      })}
    </Container>
  );
};

export default ButtonChoice;
