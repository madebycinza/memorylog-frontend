'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainTitle from '../components/MainTitle';
import styles from './Page.module.css';

export default function Page() {
  const [showLoader, setShowLoader] = useState<boolean>(true); // Controls loader visibility
  const [titleScale, setTitleScale] = useState<number>(0.6); // Controls h1 scaling

  useEffect(() => {
    const handleAnimationSequence = () => {
      setTitleScale(1); // Trigger h1 scaling to full size
      setTimeout(() => {
        setShowLoader(false); // Trigger loader slide-up
      }, 300); // Wait for h1 scaling animation to be more than half done
    };

    // Fixed 2-second wait for loader
    const loaderTimeout = setTimeout(() => {
      handleAnimationSequence();
    }, 2000);

    return () => {
      clearTimeout(loaderTimeout); // Cleanup timeout on unmount
    };
  }, []);

  return (
    <div className={styles.container}>

      <div className={styles.videoOverlay}></div>

      {/* Background Video */}
      <video
        id="background-video"
        className={styles.backgroundVideo}
        src="https://memorylog-app.s3.us-west-1.amazonaws.com/maui-vhs-1.mp4"
        autoPlay
        muted
        loop
        preload="auto"
      />

      {/* Centered Content */}
      <div className={styles.centeredContent}>

        {/* Main Title */}
        <motion.h1
          className={styles.title}
          initial={{ scale: 0.6 }} // Start small
          animate={{ scale: titleScale }} // Animate scale
          transition={{
            duration: 0.5, // Scaling duration
            ease: [0.755, 0.050, 0.855, 0.060], // easeInQuart cubic-bezier
          }}
        >
          {/* Title content as a separate component */}
          <MainTitle />
        </motion.h1>

        {/* Full-Screen Loader */}
        <AnimatePresence>
          {showLoader && (
            <motion.div
              className={styles.fullScreenLoader}
              initial={{ y: 0 }} // Start covering the screen
              animate={{ y: 0 }} // Stay in place until exit
              exit={{ y: '-100vh' }} // Slide up and out of the viewport
              transition={{
                duration: 0.5, // Transition duration
                ease: [0.755, 0.050, 0.855, 0.060], // easeInQuart cubic-bezier
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Center: Credit */}
      <div className={`${styles.credit}`}>
        <p className={styles.creditSmall}>a project by</p>
        <p className={styles.creditLarge}>Vinícius Miazaki de Moraes</p>
      </div>
    </div>
  );
}
