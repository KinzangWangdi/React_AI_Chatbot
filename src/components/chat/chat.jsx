import React, { useEffect, useRef } from 'react';
import styles from './chat.module.css'
import Markdown from 'react-markdown';

const WELCOME_MESSAGES = {


    role: 'assistant',
    content: 'Hello! I am your AI chatbot. How can I assist you today?'
};

export function Chat({ messages }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <div className={styles.Chat}>
            {[WELCOME_MESSAGES, ...messages].map(({ role, content }, index) => (
                <div key={index} className={styles.Message} data-role={role}>
                    <Markdown>{content}</Markdown>
                </div>
            ))}
            <div ref={messagesEndRef} />

        </div>
    );
}