// src/components/ChatInput.tsx
import React, { useState } from 'react';

interface ChatInputProps {
    sendMessage: (text: string) => void;
}

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
        <form onSubmit={handleSubmit} className="chat-input">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default ChatInput;
