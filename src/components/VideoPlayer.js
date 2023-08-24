import React, { useRef, useEffect } from 'react';
import video from '../video/Intro.mp4';

import classes from './VideoPlayer.module.css';

function VideoPlayer() {
  const videoRef = useRef(null);

  async function onHoverHandler() {
    const video = videoRef.current;

    if (video) {
      video.play().catch((error) => {
        console.log('Error Occured During Video Play');
      });
    }
  }

  const pauseVideoOnHoverOut = () => {
    const video = videoRef.current;

    if (video) {
      video.pause();
    }
  };

  return (
    <video
      className={classes.video}
      ref={videoRef}
      onMouseEnter={onHoverHandler}
      onMouseLeave={pauseVideoOnHoverOut}
    >
      <source src={video} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
