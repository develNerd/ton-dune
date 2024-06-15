import React from 'react';
import styled from 'styled-components';
import { TonConnectButton } from '@tonconnect/ui-react';

const HeaderContainer = styled.div`
  background: linear-gradient(to right, #007bff, #0056b3);
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: white;
  display: flex;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.2em;
`;

const SubTitle = styled.h1`
  margin: 0;
  font-size: 0.8em;
`;

const TitleContainer = styled.h1`
  display: flex;
  flex-direction: row;
`;

const TonConnectStyle = styled.div`
  align-self: end;
`;


const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <HeaderContainer>
      <TitleContainer>
      <Title>{title}</Title>
      <SubTitle>{title}</SubTitle>
      </TitleContainer>
      <TonConnectStyle>
        <TonConnectButton />
      </TonConnectStyle>
    </HeaderContainer>
  );
};

export default Header;