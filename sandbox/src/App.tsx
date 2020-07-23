import React from "react";
import logo from "logo.svg";
import styled, { keyframes } from "styled-components";
import { Counter } from "counter"

const ReactApp = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  & code {
    color: #aaeeff;
  }
`;

const AppLink = styled.a`
  color: #61dafb;
  &:hover {
    color: #00ffff;
  }
`;

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled.img`
  animation: ${AppLogoSpin} infinite 20s linear;
  height: 40vmin;
`

function App() {
  return (
    <ReactApp>
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
        <p>
          Edit<code>src/App.js</code> and save to reload.
        </p>
        <AppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </AppLink>
        <Counter />
      </AppHeader>
    </ReactApp>
  );
}

export default App;
