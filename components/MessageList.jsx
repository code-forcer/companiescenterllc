import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [items, setItems] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/messageslisting', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch messages');
        }

        const { messages } = await res.json();
        setMessages(messages);

        // Fetch item details for each message
        const itemIds = messages.map((message) => message.itemId);
        const uniqueItemIds = [...new Set(itemIds)];  // Remove duplicates

        // Fetch details for each unique itemId
        const fetchItems = async () => {
          const itemsData = await Promise.all(
            uniqueItemIds.map((itemId) =>
              fetch(`/api/items/${itemId}`).then((res) => res.json())
            )
          );
          const itemsMap = itemsData.reduce((acc, item) => {
            acc[item._id] = item;  // Create a map of itemId to item details
            return acc;
          }, {});
          setItems(itemsMap);
        };

        await fetchItems();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [router]);

  if (loading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (messages.length === 0) {
    return <p>No messages available.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Messages</h1>
      {messages.map((message) => (
        <div key={message._id} style={styles.card}>
          <h2 style={styles.subject}>{message.subject || 'No Subject'}</h2>
          <p style={styles.sender}>
            <strong>From:</strong> {message.name || 'Unknown'} <br /> <a href="mailto: ${`message.email`}"> {message.email}</a>
          </p>
          <p style={styles.message}>Message: {message.message}</p>
          <small style={styles.timestamp}>
            <strong>Received:</strong> {new Date(message.createdAt).toLocaleString()}
          </small>
          <div style={styles.itemDetails}>
            <h3>Item Details:</h3>
            {items[message.itemId] ? (
              <div>
                <p><strong>Item Name:</strong> {items[message.itemId].name}</p>
                <p><strong>Description:</strong> {items[message.itemId].description}</p>
                {/* Add other item details as needed */}
              </div>
            ) : (
              <p>Item details not available.</p>
            )}
          </div><hr />
            {/* Display the clickable email link */}
            {message.email && (
            <p style={styles.email}>
              <strong>Click to send a mail:</strong> 
             
              <button style={styles.sendButton} type="submit"> <a href={`mailto:${message.email}`} style={styles.mailtoLink}>
                {message.email}
              </a></button>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
   sendButton: {
        marginTop: '10px',
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderLeft: '4px solid #0070f3',
  },
  subject: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#0070f3',
    marginBottom: '10px',
  },
  sender: {
    fontSize: '18px',
    color: '#555',
    fontWeight:'bold',
    marginBottom: '10px',
  },
  message: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333',
  },
  email: {
    marginTop: '10px',
    fontSize: '14px',
  },
  mailtoLink: {
    color: '#FFF',
    fontWeight:'bold',
    textDecoration: 'underline',
  },
  timestamp: {
    display: 'block',
    marginTop: '10px',
    fontSize: '12px',
    color: '#ce1212',
  },
  itemDetails: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#333',
    fontWeight:'bold'
  },
};
