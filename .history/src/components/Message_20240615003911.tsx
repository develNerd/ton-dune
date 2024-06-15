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
`;

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <MessageContainer sender={message.sender}>
      <strong>{message.sender}:</strong> {message.text}
    </MessageContainer>
  );
};

export default Message;
