// components/ChatIcon.js
import { useState } from 'react';
import Modal from './Modal';
import { FaRegComment } from 'react-icons/fa';
const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Floating Icon */}
      <button 
        onClick={toggleModal} 
        className="chat-icon"
        aria-label="Chat with AI">
            <FaRegComment size={50} color="#fff" />
      </button>

      {/* Modal for AI chat */}
      {isOpen && <Modal closeModal={toggleModal} />}
      <style jsx>{`
        .chat-icon {
          position: fixed;
          bottom: 20px;
          right: 20px;

          border: none;
          background-color: #102343; /* Dark blue background */
          border-radius: 50%; /* Perfect circle */
          padding: 15px;
          font-size: 40px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white; /* Icon color */
          animation: glowing .5s infinite ease-in-out;
        }
        
        @keyframes glowing {
          0% {
            box-shadow: 0 0 5px rgba(14, 164, 255, 0.5),
                        0 0 10px rgba(14, 164, 255, 0.5),
                        0 0 15px rgba(14, 164, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 10px rgba(14, 164, 255, 0.7),
                        0 0 20px rgba(14, 164, 255, 0.7),
                        0 0 30px rgba(14, 164, 255, 0.7);
          }
          100% {
            box-shadow: 0 0 5px rgba(14, 164, 255, 0.5),
                        0 0 10px rgba(14, 164, 255, 0.5),
                        0 0 15px rgba(14, 164, 255, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatIcon;
