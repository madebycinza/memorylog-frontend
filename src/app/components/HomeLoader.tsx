'use client';

import { motion } from 'framer-motion';
import styles from '@/app/styles/home.module.css';

type HomeLoaderProps = {
  isVisible: boolean; // Whether the loader should be visible
};

export default function HomeLoader({
  isVisible
}: HomeLoaderProps) {
  return (
    <motion.div
      className={styles.fullScreenLoader}
      animate={{
        y: isVisible ? '0svh' : '-100svh'
      }}
      transition={{
        duration: 0.5,
        ease: [0.755, 0.050, 0.855, 0.060], // easeInQuart cubic-bezier
      }}
    />
  );
}
