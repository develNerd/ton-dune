// src/components/Chat.tsx
import React, { useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';

interface MessageType {
    text: string;
    sender: 'User' | 'Bot';
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);

    const sendMessage = (text: string) => {
        const userMessage: MessageType = { text, sender: 'User' };

        // Append user message to the existing messages
        setMessages(prevMessages => [...prevMessages, userMessage]);

        // Create and append bot response after user message
        const botResponse: MessageType = { text: 'This is a dummy bot response.', sender: 'Bot' };
        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, botResponse]);
        }, 500); // Delay bot response to mimic real interaction
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} message={msg} />
                ))}
            </div>
            <ChatInput sendMessage={sendMessage} />
        </div>
    );
};

export default Chat;