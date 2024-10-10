// pages/memes/index.js

import React, { useState } from 'react';

const MemeList = ({ memes }) => {
  const handleLike = async (memeId) => {
    try {
      const res = await fetch('/api/memes/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memeId }),
      });

      if (res.ok) {
        // Update the like count in the UI (you might want to refetch the memes)
        console.log('Meme liked successfully');
      }
    } catch (error) {
      console.error('Error liking meme:', error);
    }
  };

  return (
    <div>
      {memes.map((meme) => (
        <div key={meme._id}>
          <h3>{meme.title}</h3>
          <img src={meme.image} alt={meme.title} width="300" />
          <p>{meme.likes || 0} Likes</p>
          <button onClick={() => handleLike(meme._id)}>Like</button>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db();
  const memes = await db.collection('memes').find({}).toArray();

  return {
    props: {
      memes: JSON.parse(JSON.stringify(memes)),
    },
  };
}

export default MemeList;
