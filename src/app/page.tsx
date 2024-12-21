'use client';

import { motion } from 'framer-motion';
import HomeTitle from '@/app/components/HomeTitle';
import styles from '@/app/styles/home.module.css';

export default function Page() {
  return (
    <div className={styles.container}>

      {/* Video Overlay */}
      <div className={styles.videoOverlay}></div>

      {/* Background Video */}
      <video
        id="background-video"
        className={styles.backgroundVideo}
        src="https://memorylog-app.s3.us-west-1.amazonaws.com/My+Movie+1.mp4"
        autoPlay
        muted
        loop
        preload="auto"
      />

      {/* Centered Content */}
      <motion.div
        key={"homeCenter"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{duration: 0.5, ease: 'easeInOut'}}
        className={`${styles.centeredContent} homeCenter`}
      >
        <HomeTitle />
      </motion.div>

      {/* Bottom Center: Credit */}
      <motion.div
        key={"homeBottom"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{duration: 0.5, ease: 'easeInOut'}}
        className={`${styles.credit} homeBottom`}
      >
        <p className={styles.creditSmall}>a project by</p>
        <p className={styles.creditLarge}>Vinícius Miazaki de Moraes</p>
      </motion.div>
    </div>
  );
}
