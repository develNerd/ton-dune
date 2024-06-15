import React from 'react';
import styled from 'styled-components';
import { TonConnectButton } from '@tonconnect/ui-react';

const HeaderContainer = styled.div`
  background: linear-gradient(to right, #007bff, #0056b3);
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: left;
  color: white;
  display: flex;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.2em;
`;

const TonConnectStyle = styled.div`
  padding: 10px;
`;


const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <TonConnectStyle>
        <TonConnectButton />
      </TonConnectStyle>
    </HeaderContainer>
  );
};

export default Header;