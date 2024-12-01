'use client';

import { useState, useEffect } from 'react';

// Helper function to shuffle an array
const shuffleArray = (array: number[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() })) // Assign random sort value
    .sort((a, b) => a.sort - b.sort) // Sort based on random value
    .map(({ value }) => value); // Return shuffled array
};

const text = 'MEMORYLOG'; // The full word

export default function MainTitle() {
  const [visibleLetters, setVisibleLetters] = useState<boolean[]>(Array(text.length).fill(false)); // Track which letters are visible

  useEffect(() => {
    // Generate a random order for the letter indices
    const randomOrder = shuffleArray([...Array(text.length).keys()]);

    // Start the glitching 200ms after page load
    const timer = setTimeout(() => {
      const interval = 1200 / text.length; // Spread letters evenly over 1000ms (1200ms total - 200ms initial delay)

      randomOrder.forEach((index, order) => {
        setTimeout(() => {
          setVisibleLetters((prev) => {
            const newState = [...prev];
            newState[index] = true; // Reveal the letter at the randomized index
            return newState;
          });
        }, order * interval); // Delay each letter fade-in based on random order
      });
    }, 200);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{
            opacity: visibleLetters[index] ? 1 : 0, // Fade in the letter
            transition: 'opacity 0.8s ease', // Smooth fade-in effect
            display: 'inline-block',
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}
