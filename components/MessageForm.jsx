// components/MessageForm.js
import { useState } from 'react';

export default function MessageForm({ itemId, userId }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      setError('Message cannot be empty');
      return;
    }

    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, itemId, userId }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('');
        alert('Message sent!');
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message"
        required
      />
      {error && <div>{error}</div>}
      <button type="submit">Send Message</button>
    </form>
  );
}
