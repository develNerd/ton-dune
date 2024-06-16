// src/components/Message.tsx
import React from 'react';
import styled from 'styled-components';

interface MessageProps {
  message: {
    text: string;
    sender: 'User' | 'Bot';
  };
}

const MessageContainer = styled.div<{ sender: 'User' | 'Bot' }>`
  margin-bottom: 10px;
  text-align: ${props => (props.sender === 'User' ? 'left' : 'left')};
  align-self: ${props => (props.sender === 'User' ? 'flex-end' : 'flex-start')};
  background-color: ${props => (props.sender === 'User' ? '#e6f7ff' : '#f5f5f5')};
  border-radius: 10px;
  padding: 10px;
  max-width: 60%;
  word-wrap: break-word;
  white-space: pre-wrap;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: ${props => (props.sender === 'User' ? 'auto' : '10px')};
    right: ${props => (props.sender === 'User' ? '10px' : 'auto')};
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${props => (props.sender === 'User' ? '0 0 10px 10px' : '0 10px 10px 0')};
    border-color: ${props => (props.sender === 'User' ? 'transparent transparent #e6f7ff transparent' : 'transparent #f5f5f5 transparent transparent')};
  }

  & button {
    margin-left: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    font-size: 12px;
  }

  & button:hover {
    background: #0056b3;
  }

  & strong {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  & span {
    margin-left: 5px;
  }
`;

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <MessageContainer sender={message.sender}>
      {message.sender === 'User' ? '' : <strong>Dune Ai</strong>}
      <div dangerouslySetInnerHTML={{ __html: message.text }} />
    </MessageContainer>
  );
};

export default Message;
