
import styles from './chat.module.css'

const WELCOME_MESSAGES = {


    role: 'assistant',
    content: 'Hello! I am your AI chatbot. How can I assist you today?'
};

export function Chat({ messages }) {
    return (
        <div className={styles.Chat}>
            {[WELCOME_MESSAGES, ...messages].map(({ role, content }, index) => (
                <div key={index} className={styles.Message} data-role={role}>
                    {content}
                </div>
            ))}

        </div>
    );
}