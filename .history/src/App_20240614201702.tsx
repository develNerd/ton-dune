import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled, { createGlobalStyle } from 'styled-components';
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import Chat from "./components/Chat";
import Header from "./components/Header";


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
  }
`;

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const ChatContainer = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  
  max-width: 400px;
  height: 100%;
  max-height: 500px;
  display: flex;
  flex-direction: column;
`;


function App() {
  const { network } = useTonConnect();

  return (
    <>
      <GlobalStyle />
    <AppContainer>
    <ChatContainer>
    <Header title="Ton Done AI" />
      

      <Chat />
   {/*   <FlexBoxRow>
        <TonConnectButton />
        <Button>
          {network
            ? network === CHAIN.MAINNET
              ? "mainnet"
              : "testnet"
            : "N/A"}
        </Button>
      </FlexBoxRow>
      <Counter />
      <TransferTon />
      <Jetton />*/}
    </ChatContainer>
  </AppContainer>
  </>
  );
}

export default App;
