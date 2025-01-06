// components/Modal.js
import { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

const Modal = ({ closeModal }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
  
    // Add the user's message to the conversation
    setConversation([...conversation, { sender: 'user', text: message }]);
    setMessage('');
  
    try {
      // Send the message to the backend (Next.js API route)
      const response = await fetch('/api/chat_assistance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
  
      const data = await response.json();
  
      // Extract the AI's reply based on the new structure
      let aiReply;
      if (data.reply && data.reply.parts && data.reply.parts[0]) {
        aiReply = data.reply.parts[0].text;
      } else {
        aiReply = "I'm sorry, but I couldn't process that request.";
      }
  
      // Add the AI's response to the conversation
      setConversation((prev) => [
        ...prev,
        { sender: 'user', text: message },
        { sender: 'ai', text: aiReply },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setConversation((prev) => [
        ...prev,
        { sender: 'ai', text: "Oops! Something went wrong. Please try again." },
      ]);
    }
  };
  
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={closeModal}>close | ✖</button>
        <div className="chat-box">
          <div className='header'>
            <h4>
              <img src="/logo/imagetwo.jpeg" width={'200px'} style={{borderRadius:'5px'}} alt="" />
              <br />
              <b>VIRTUAL SITE ASSISTANCE <FaRobot /></b>
            </h4>
            <hr />
          </div>
          {conversation.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <div className="message-bubble">
                <span>{msg.text}</span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="input-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me something about the site..."
            required
            autoFocus
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <style jsx>{`
      
   
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          background: rgba(0, 0, 0, 0.6);
          z-index: 999;
        }

        .modal-content {
          background: white;
          padding: 20px;
          width: 400px;
          max-width: 90%;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          color:#ce1212;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }

        .chat-box {
          flex-grow: 1;
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 20px;
          padding-right: 10px;
        }

        .message {
          display: flex;
          margin-bottom: 10px;
          align-items: flex-start;
        }

        .message.user {
          justify-content: flex-end;
          padding-right:15%;
        }

        .message-bubble {
          max-width: 75%;
          padding: 10px 15px;
          border-radius: 20px;
          background-color:#102343;
          color: white;
          font-size: 14px;
          line-height: 1.5;
        }

        .message.ai .message-bubble {
          background-color: #e4e6eb;
          color: #333;
        }

        .input-form {
          display: flex;
          align-items: center;
        }

        input {
          padding: 10px;
          width: 80%;
          border: 1px solid #ddd;
          border-radius: 20px;
          font-size: 14px;
          margin-right: 10px;
        }

        button {
          padding: 10px 15px;
          background-color: #102343;
          border: none;
          color: white;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
        }

        button:hover {
          background-color:rgba(14, 164, 255, 0.5);
        }

        @media (max-width: 480px) {
          .modal-content {
            width: 100%;
            height: 50%;
            max-width: none;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;
