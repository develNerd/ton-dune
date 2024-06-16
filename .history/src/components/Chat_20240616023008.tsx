// src/components/Chat.tsx
import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import styled from 'styled-components';
import { makeApiRequest, makeTonRequest } from '../makeRequest';
import { apiDataList, ApiData } from './apiData';
import { useTonConnect } from '../hooks/useTonConnect';
import { useCounterContract } from '../hooks/useCounterContract';
import formatData from './formatData';


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

    const { sender,connected,wallet } = useTonConnect();
   // const { value, address, sendIncrement } = useCounterContract();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    var [commentAdded, setCommentAdded] = useState(0)

    const [response, setResponse] = useState<any>(null);
    const [duneResponse, setDuneResponse] = useState<any>(null);

    const [walletAddres, setWalletAddress] = useState<string>();

    const handleRequest = async (input:String) => {
        const apiResponse = await makeApiRequest(input);
        let apiIndex = apiResponse.data.index ?? 0;

        if((apiResponse.data.wallet_address as string).includes("null") == false)    {
            setWalletAddress(apiResponse.data.wallet_address);
            console.log("walletAddress",apiResponse.data.wallet_address)
        }else {
            setWalletAddress(wallet as string);
            if(!connected){
                const botResponse: MessageType = { text: 'Sorry I could not process your query, Try connecting to the Ton network, and try again', sender: 'Bot' };
                setMessages(prevMessages => [...prevMessages, botResponse]);
                setCommentAdded(++commentAdded)
                return
            } 
        }

        let apiData: ApiData = apiDataList[apiIndex];
        let query:Map<string,string> = new Map<string,string>([[apiData.queryKey,walletAddres]]);
        const tonResponse = await makeTonRequest(apiData.api, query);
        setDuneResponse(formatData(tonResponse));
        const botResponse: MessageType = { text: duneResponse, sender: 'Bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
        setCommentAdded(++commentAdded)



        setResponse(apiResponse);
    };



    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        console.log("response",wallet)
     
    }, [])





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



export default Chat;

function componentDidMount() {
    throw new Error('Function not implemented.');
}
