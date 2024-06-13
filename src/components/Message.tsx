// src/components/Message.tsx
import React from 'react';

interface MessageProps {
    message: {
        text: string;
        sender: 'User' | 'Bot';
    };
}

const Message: React.FC<MessageProps> = ({ message }) => {
    return (
        <div className={`message ${message.sender.toLowerCase()}`}>
            <strong>{message.sender}:</strong> {message.text}
        </div>
    );
};

export default Message;