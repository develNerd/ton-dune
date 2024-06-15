// src/components/ChatInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface ChatInputProps {
    sendMessage: (text: string) => void;
}

const Form = styled.form`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const Textarea = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-right: 10px;
  font-family: 'Roboto', sans-serif;
  resize: none; /* Prevent manual resizing */
  overflow: auto;
  min-height: 3px; /* Minimum height */
  max-height: 150px; /* Maximum height */
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [text]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            sendMessage(text);
            setText('');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
            />
            <Button type="submit">Send</Button>
        </Form>
    );
};

export default ChatInput;
