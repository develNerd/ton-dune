// src/components/ChatInput.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

interface ChatInputProps {
  sendMessage: (text: string) => void;
}

const Form = styled.form`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      sendMessage(text);
      setText('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <Button type="submit">Send</Button>
    </Form>
  );
};

export default ChatInput;
