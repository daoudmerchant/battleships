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
  opacity: ${(props) => (props.visible ? "1" : "0")};
`;

const Button = styled.button`
  display: block;
  font-size: 1.2rem;
  background-color: ${(props) => (props.wasClicked ? "#c4ffce" : "white")};
  padding: 0;
  flex-grow: 1;
  transition: bottom 0.3s linear ${(props) => props.delay}ms,
    opacity 0.3s linear ${(props) => props.delay}ms,
    background-color 0.15s linear;
  margin: 0 10vw 8vw;
  border: 1px solid transparent;
  border-radius: 10px;
  box-shadow: -5px 5px 9px 1px rgba(0, 0, 0, 0.2);
  position: relative;
  opacity: ${(props) => (props.visible ? "1" : "0")};
  bottom: ${(props) => (props.visible ? "0" : "20px")};
`;

const ButtonChoice = ({ data: { title, options } }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { visible } = useContext(VisibilityContext);
  return (
    <Container>
      <TitleContainer visible={visible}>
        <h2>{title}</h2>
      </TitleContainer>
      {options.map((option, i) => {
        const delay = 200 + i * 100;
        return (
          <Button
            key={option.key}
            visible={visible}
            wasClicked={isClicked === i}
            delay={delay}
            onClick={() => {
              setIsClicked(i);
              option.reportClick();
              setTimeout(() => {
                setIsClicked(false);
              }, 1200);
            }}
          >
            {option.text}
          </Button>
        );
      })}
    </Container>
  );
};

export default ButtonChoice;
