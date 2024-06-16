// src/components/Chat.tsx
import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import styled from 'styled-components';
import { makeApiRequest, makeTonRequest } from '../makeRequest';
import { apiDataList, ApiData } from './apiData';
import { useTonConnect } from '../hooks/useTonConnect';
import { useCounterContract } from '../hooks/useCounterContract';


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

    const { connected } = useTonConnect();
    const { value, address, sendIncrement } = useCounterContract();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    var [commentAdded, setCommentAdded] = useState(0)

    const [response, setResponse] = useState<any>(null);
    const [duneResponse, setDuneResponse] = useState<any>(null);

    const [walletAddres, setWalletAddress] = useState<any>(null);

    const handleRequest = async (input:String) => {
        const apiResponse = await makeApiRequest(input);
        let apiIndex = apiResponse.data.index ?? 0;

        if((apiResponse.data.walletAddress as string).includes("null") == false)    {
            setWalletAddress(apiResponse.data.walletAddress);
            console.log("walletAddress",apiResponse.data.walletAddress)
        }else {
            if(!connected){
                const botResponse: MessageType = { text: 'Try connecting ', sender: 'Bot' };
                setMessages(prevMessages => [...prevMessages, botResponse]);
                setCommentAdded(++commentAdded)
            } 
            setWalletAddress(address);
        }

        let apiData: ApiData = apiDataList[apiIndex];
        let query:Map<string,string> = new Map<string,string>([[apiData.queryKey ?? "",walletAddres]]);
        const tonResponse = await makeTonRequest(apiData.api, query);
        setDuneResponse(formatData(tonResponse));



        setResponse(apiResponse);
    };



    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {

        const botResponse: MessageType = { text: duneResponse, sender: 'Bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
        setCommentAdded(++commentAdded)

    }, [duneResponse])





    const sendMessage = (text: string) => {
        const userMessage: MessageType = { text, sender: 'User' };

        
        handleRequest(text);

        // Append user message to the existing messages
        setMessages(prevMessages => [...prevMessages, userMessage]);

        // Create and append bot response after user message

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

type JsonObject = { [key: string]: any };

function formatData(data: JsonObject | string, prefix: string = ''): string {
    let result = '';

    if (typeof data === 'string') {
        result += data;
        return result;
    }

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                result += `${prefix}${key}:\n`;
                result += formatData(value, prefix + '  ');
            } else {
                let formattedValue = value;
                if (typeof value === 'string' && /^\d{1,10}$/.test(value)) {
                    formattedValue = `**${value}**`;
                }
                result += `${prefix}${key}: ${formattedValue}\n`;
            }
        }
    }

    return result;
}


export default Chat;

function componentDidMount() {
    throw new Error('Function not implemented.');
}
