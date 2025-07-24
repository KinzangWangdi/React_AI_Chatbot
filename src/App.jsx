import React, { useState } from 'react'
import styles from './App.module.css'
import { Loader } from './components/loader/loader'
import { Assistant } from './assistants/googleai'
import { Chat } from './components/chat/chat'
import { Controls } from './components/controls/controls'



function App() {
  const assistant = new Assistant();

  const [Messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function HandleContentSend(content) {
    addMessage({ content, role: "user" });
    setLoading(true);
    try {
      const result = await assistant.chat(content); 

      addMessage({ content: result, role: "assistant" });
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className={styles.App}>
      {loading && <Loader />}
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={Messages} />
      </div>
      <Controls isDisabled = {loading} onSend={HandleContentSend} />

    </div>

  )

}

// const MESSAGES = [
//   {
//     role: 'user',
//     content: 'Hello, how are you?'
//   }, 
//   {
//     role: 'assistant',
//     content: 'I am fine, thank you! How can I assist you today?'
//   },
//   {
//     role: 'user',
//     content: 'What is the weather like today?'
//   },
//   {
//     role: 'assistant',
//     content: 'The weather is sunny with a high of 25°C. Perfect for a walk!'
//   },
//   {
//     role: 'user',
//     content: 'Can you tell me a joke?'
//   },
//   {
//     role: 'assistant',
//     content: 'Sure! Why did the scarecrow win an award? Because he was outstanding in his field!'
//   },
//   {
//     role: 'user',
//     content: 'That was funny! Thanks!'
//   },
//   {
//     role: 'assistant',
//     content: 'You are welcome! If you have any more questions, feel free to ask.'
//   }
// ]

export default App
