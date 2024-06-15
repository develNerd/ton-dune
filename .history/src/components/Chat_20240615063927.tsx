// src/components/Chat.tsx
import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import styled from 'styled-components';
import { makeApiRequest } from '../makeRequest';
import { apiDataList, ApiData } from './apiData';


interface MessageType {
    text: string;
    sender: 'User' | 'Bot';
}

const MessagesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
  border-bottom: 1px solid #ddd;
`;

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    var [commentAdded, setCommentAdded] = useState(0)

    const [response, setResponse] = useState<any>(null);

    const handleRequest = async (input:String) => {
        const apiResponse = await makeApiRequest(input);
        let apiIndex = apiResponse.data.index ?? 0;

        let apiData: ApiData = apiDataList[apiIndex];

        setResponse(apiResponse);
    };



    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {



    }, [])





    const sendMessage = (text: string) => {
        const userMessage: MessageType = { text, sender: 'User' };
        handleRequest(text);

        // Append user message to the existing messages
        setMessages(prevMessages => [...prevMessages, userMessage]);

        // Create and append bot response after user message
        const botResponse: MessageType = { text: 'This is a dummy bot response.', sender: 'Bot' };
        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, botResponse]);
            setCommentAdded(++commentAdded)

        }, 500); // Delay bot response to mimic real interaction
    };

    useEffect(() => {
        window.console.log("commentAdded", commentAdded)
        scrollToBottom();
    }, [commentAdded]);

    



    return (
        <>
            <MessagesContainer>
                {messages.map((msg, index) => (
                    <Message key={index} message={msg} />
                ))}
                <div ref={messagesEndRef} />
            </MessagesContainer>
            <ChatInput sendMessage={sendMessage} />
        </>
    );
};

export default Chat;

function componentDidMount() {
    throw new Error('Function not implemented.');
}
