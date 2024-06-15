// src/components/Chat.tsx
import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import styled from 'styled-components';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


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

    const ref = useRef<HTMLDivElement>(null);



    useEffect(() => {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });

        // Updating scrollSpy when the component mounts.
        scrollSpy.update();

        // Returning a cleanup function to remove the registered events when the component unmounts.
        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };



    }, [])

    const scrollToTop = () => {
        scroll.scrollToTop();
    }



    const sendMessage = (text: string) => {
        const userMessage: MessageType = { text, sender: 'User' };

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
        scrollToTop();
        window.console.log("commentAdded", commentAdded)
    }, [commentAdded]);

    return (
        <>
            <Link
                activeClass="active"
                to="test2"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                containerId="containerElement"

            >
                scroll

            </Link>


            <Element name="test1" className="element" id="containerElement" style={{
                flex: '1',
                flexDirection: 'column',
                padding: '10px',
                borderBottom: ' 1px solid #ddd'
            }}>
                <MessagesContainer>
                    {messages.map((msg, index) => (

                        <Message key={index} message={msg} />
                    ))}
                    <Element name="test2" className="element">
                        test 2
                    </Element>
                </MessagesContainer>
            </Element>
            <ChatInput sendMessage={sendMessage} />
        </>
    );
};

export default Chat;

function componentDidMount() {
    throw new Error('Function not implemented.');
}
