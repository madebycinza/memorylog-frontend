'use client';

import { motion } from 'framer-motion';
import styles from './HomeLoader.module.css';

type HomeLoaderProps = {
  isVisible: boolean; // Whether the loader should be visible
  isReverse: boolean; // Whether it's a reverse animation
  isInitial: boolean; // Whether it's the initial homepage load
  shouldStayVisible: boolean; // Whether loader should stay at 0vh
};

export default function HomeLoader({
  isVisible,
  isReverse,
  isInitial,
  shouldStayVisible,
}: HomeLoaderProps) {
  return (
    <motion.div
      className={styles.fullScreenLoader}
      animate={{
        y: isInitial
          ? (isVisible ? 0 : '-100vh') // Slide up on initial homepage load
          : isReverse
          ? (isVisible ? 0 : '-100vh') // Slide down for reverse animation
          : shouldStayVisible
          ? 0 // Keep loader at 0vh on non-homepage routes
          : (isVisible ? 0 : '-100vh'), // Slide up when returning to the homepage
      }}
      style={{
        transform: isVisible && isReverse ? 'translateY(0vh)' : undefined, // Park loader at 0vh for reverse
      }}
      transition={{
        duration: isReverse ? 0.7 : shouldStayVisible ? 0 : 0.7, // 0.7s for reverse animation, 0.5s for other cases
        ease: [0.755, 0.050, 0.855, 0.060], // easeInQuart cubic-bezier
      }}
    />
  );
}
