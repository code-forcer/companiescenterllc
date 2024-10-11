import React, { useRef, useState } from 'react';

const AutoplayVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleVideoClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="video-container">
      <small style={{fontWeight:'Bold',textDecoration:'underline'}}>Click to play:</small>
      <video
        ref={videoRef}
        src="/video/videocleaning.mp4"
        autoPlay={true}
        onClick={handleVideoClick}
        onEnded={handleVideoEnded}
        width="100%"
        style={{ height: '60%' }}
      />

      <div className="video-controls">
        <button onClick={handleVideoClick}>
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pause"
              viewBox="0 0 16 16"
            >
              <path d="M6.25 1.5A1.5 1.5 0 0 1 7.5 0h1.5a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-1.5a1.5 1.5 0 0 1-1.5-1.5V1.5zM11.5 1.5A1.5 1.5 0 0 1 13 0h1.5a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-1.5a1.5 1.5 0 0 1-1.5-1.5V1.5z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-play-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="m11.5 0L8.5 3.5l3.5 3.5-2.5 2.5L6 9.25V7l3.5-3.5L7.5 3.5 11.5 0z"
              />
            </svg>
          )}
        </button>

        <button onClick={() => videoRef.current.requestFullscreen()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrows-fullscreen"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 2a.5.5 0 0 1 .5 0l13 13a.5.5 0 0 1 0 .707l-13 13a.5.5 0 0 1-.707-0l-13-13a.5.5 0 0 1 0-.707l13-13zM14.5 14a.5.5 0 0 1 0 .707l-13 13a.5.5 0 0 1-.707 0l-13-13a.5.5 0 0 1 0-.707l13-13a.5.5 0 0 1 .707 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AutoplayVideo;