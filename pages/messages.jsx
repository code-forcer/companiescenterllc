import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MessageList from '@/components/MessageList';
import { useRouter } from 'next/router';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Importing an icon from react-icons

export default function Messages() {
  const router = useRouter();

  return (
    <>
      <div style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#0070f3',
            fontSize: '16px',
          }}
        >
          <FaArrowLeft style={{ marginRight: '5px' }} /> Back
        </button>
      </div>
      <div>
        <MessageList />
      </div>
      <Footer />
    </>
  );
}
