'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './HomeTitle.module.css';
import { useLoader } from '../contexts/LoaderContext'; // Access `isInitial`

const text = 'MEMORYLOG'; // The full word

export default function HomeTitle() {
  const [visibleLetters, setVisibleLetters] = useState<boolean[]>(Array(text.length).fill(false)); // Track which letters are visible
  const [titleScale, setTitleScale] = useState<number>(1); // Default scale is full size
  const { isInitial } = useLoader(); // Access `isInitial` to detect first load

  useEffect(() => {
    if (isInitial) {
      // Trigger animations only if it's the first homepage load
      setTitleScale(0.6); // Start small for scale animation

      const handleAnimationSequence = () => {
        setTitleScale(1); // Scale h1 to full size
      };

      // Delay scale animation by 1.7 seconds to match loader timing
      const scaleTimeout = setTimeout(() => {
        handleAnimationSequence();
      }, 1700);

      // Glitch animation logic
      const shuffleArray = (array: number[]) =>
        array
          .map((value) => ({ value, sort: Math.random() })) // Assign random sort value
          .sort((a, b) => a.sort - b.sort) // Sort based on random value
          .map(({ value }) => value); // Return shuffled array

      const randomOrder = shuffleArray([...Array(text.length).keys()]);

      const glitchTimer = setTimeout(() => {
        const interval = 1200 / text.length; // Spread letters evenly over 1200ms

        randomOrder.forEach((index, order) => {
          setTimeout(() => {
            setVisibleLetters((prev) => {
              const newState = [...prev];
              newState[index] = true; // Reveal the letter at the randomized index
              return newState;
            });
          }, order * interval); // Delay each letter fade-in based on random order
        });
      }, 200); // Start glitching after 200ms

      // Cleanup timeouts
      return () => {
        clearTimeout(scaleTimeout);
        clearTimeout(glitchTimer);
      };
    } else {
      // If it's not the initial load, skip animations
      setVisibleLetters(Array(text.length).fill(true)); // All letters visible
      setTitleScale(1); // Scale h1 to full size immediately
    }
  }, [isInitial]); // Re-run when `isInitial` changes

  return (
    <motion.h1
      className={styles.title}
      initial={isInitial ? { scale: 0.6 } : { scale: 1 }} // Start small only for initial load
      animate={{ scale: titleScale }} // Animate scale
      transition={{
        duration: isInitial ? 0.5 : 0, // Scaling duration only for first load
        ease: [0.755, 0.050, 0.855, 0.060], // easeInQuart cubic-bezier
      }}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{
            opacity: visibleLetters[index] ? 1 : 0, // Fade in the letter
            transition: isInitial ? 'opacity 0.8s ease' : 'none', // Smooth fade-in effect only on first load
            display: 'inline-block',
          }}
        >
          {char}
        </span>
      ))}
    </motion.h1>
  );
}
