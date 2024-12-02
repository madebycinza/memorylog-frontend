'use client';

import { AnimatePresence } from 'framer-motion';
import HomeTitle from './components/HomeTitle';
import styles from './Page.module.css';

export default function Page() {
  return (
    <div className={styles.container}>

      {/* Video Overlay */}
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
        <HomeTitle />

      </div>

      {/* Bottom Center: Credit */}
      <div className={`${styles.credit}`}>
        <p className={styles.creditSmall}>a project by</p>
        <p className={styles.creditLarge}>Vinícius Miazaki de Moraes</p>
      </div>
    </div>
  );
}
