import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import axios from 'axios';
import styles from '../styles/Chatbox.module.css';  // Chatbox styles

let socket;

const Chatbox = ({ user, receiver }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  
  const [userlog, setUserlog] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchUserData = async () => {
      const response = await fetch('/api/getuserdetails', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserlog(data);
      } else {
        localStorage.removeItem('token');
        router.push('/admin/login');
      }
    };

    fetchUserData();
  }, [router]);
  useEffect(() => {
    if (user && receiver) {
      // Initialize socket connection
      socketInitializer();
      // Load chat history
      fetchChatHistory();
    }
  }, [user, receiver]); // Run only when user and receiver are defined

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    // Listen to incoming messages
    socket.on('message', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });
  };

  const fetchChatHistory = async () => {
    // Ensure user and receiver are defined
    if (user && receiver) {
      try {
        // Fetch chat history from MongoDB
        const { data } = await axios.get(`/api/chat?user=${user.name}&receiver=${receiver.name}`);
        setChat(data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      const msg = {
        sender: user.name,
        receiver: receiver.name,
        content: message,
        timestamp: new Date(),
      };

      // Send message via socket
      socket.emit('message', msg);
      setMessage('');  // Clear input field
    }
  };

  if (!user || !receiver) {
    return <p style={{textAlign:'center',marginTop:'50%'}}>Loading chat... <code>You have to be logged in to chat</code></p>; // Display a loading message while user and receiver are undefined
  }

  return (
    <div className={styles.chatboxContainer}>
      <h4><u>Send a message to the company</u></h4>
      <div className={styles.chatDisplay}>
        {chat.map((msg, index) => (
          <div key={index} className={msg.sender === user.name ? styles.sent : styles.received}>
            <strong>{msg.sender}: </strong> {msg.content}
            <span className={styles.timestamp}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className={styles.chatForm}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className={styles.chatInput}
        />
        <button type="submit" className={styles.chatSendBtn}>Send</button>
      </form>
    </div>
  );
};

export default Chatbox;
