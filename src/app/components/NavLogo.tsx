'use client';

import { useState } from 'react';
import styles from './NavLogo.module.css';
import api from '@/lib/api';

type NavLogoProps = {
  pathname: string; // Current pathname
  router: any; // Next.js router
};

export default function NavLogo({ pathname, router }: NavLogoProps) {
  const [logoText, setLogoText] = useState<JSX.Element[]>([<span key="M">M</span>]); // State for animated logo text
  const [blinking, setBlinking] = useState<boolean>(true); // State to control blinking underscore
  const [showArrow, setShowArrow] = useState<boolean>(false); // State to control visibility of >
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // State to prevent multiple animations

  async function handleLogoClick() {
    if (isAnimating) return; // Prevent further clicks during animation

    if (pathname === '/') {
      try {
        const response = await api.get('/albums?populate=Year&populate=Places');
        const albums = response?.data?.data;

        if (Array.isArray(albums) && albums.length > 0) {
          const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
          const rawPlace = randomAlbum?.Places?.[0]?.Title || 'Place';
          const albumYear = randomAlbum?.Year?.Title || 'Year';

          // Extract only the part before the comma in the place
          const albumPlace = rawPlace.split(',')[0];

          // Delay the navigation by 1.5s
          setTimeout(() => {
            if (randomAlbum.documentId) {
              router.push(`/album/${randomAlbum.documentId}`);
            }
          }, 1500);

          // Trigger the animation
          animateLogoWithPlaceAndYear(albumPlace, albumYear);
        } else {
          displayFallbackText('No Albums Found');
        }
      } catch (error) {
        console.error('Error fetching random album:', error);
        displayFallbackText('Error Fetching Albums');
      }
    } else {
      router.push('/');
    }
  }

  function displayFallbackText(message: string) {
    setLogoText([
      <span key="error" className={`${styles.randomAlbumError} ${styles.blinking}`}>
        {message}
      </span>,
    ]);
    setBlinking(false); // Stop the blinking underscore

    setTimeout(() => {
      // Reset to default state after 5 seconds
      setLogoText([<span key="M">M</span>]);
      setBlinking(true); // Resume blinking underscore
    }, 5000);
  }

  function animateLogoWithPlaceAndYear(place: string, year: string) {
    setIsAnimating(true); // Start animation
    setBlinking(false); // Stop blinking during animation
    setShowArrow(false); // Hide arrow initially
    setLogoText([<span key="M">M</span>]); // Reset logo text

    // Helper to type text letter by letter
    const typeText = (text: string, delay: number, callback: (typed: string) => void) => {
      let typedText = '';
      const interval = delay / text.length;

      text.split('').forEach((char, index) => {
        setTimeout(() => {
          typedText += char;
          callback(typedText);
        }, index * interval);
      });
    };

    // Helper to delete text letter by letter
    const deleteText = (text: string, delay: number, callback: (remaining: string) => void) => {
      const interval = delay / text.length;

      text.split('').forEach((_, index) => {
        setTimeout(() => {
          const remainingText = text.slice(0, text.length - (index + 1));
          callback(remainingText);
        }, index * interval);
      });
    };

    // Step 1: Delete the "M" and transition to ">"
    deleteText('M', 200, () => {
      setLogoText([]);
      setShowArrow(true); // Show the arrow
    });

    // Step 2: Blink the ">" with underscore for 300ms
    setTimeout(() => {
      setBlinking(true);
    }, 200);

    setTimeout(() => {
      setBlinking(false);
    }, 500); // 200ms deletion + 300ms blinking

    // Step 3: Type out the place
    setTimeout(() => {
      typeText(place, 800, (typedPlace) => {
        setLogoText([
          <span key="place" className={styles.randomAlbum}>{typedPlace}</span>,
        ]);
      });
    }, 500); // 200ms deletion + 300ms blinking

    // Step 4: Pause for 500ms with blinking underscore
    setTimeout(() => {
      setBlinking(true);
    }, 1200); // Typing place duration + 700ms

    // Step 5: Type out the year
    setTimeout(() => {
      setBlinking(false);
      typeText(year, 200, (typedYear) => {
        setLogoText([
          <span key="place" className={styles.randomAlbum}>{place}</span>,
          <span key="year" className={styles.randomAlbum}> {typedYear}</span>,
        ]);
      });
    }, 1700); // Typing place + 500ms pause

    // Step 6: Blink for 2 seconds
    setTimeout(() => {
      setBlinking(true);
    }, 1900); // Typing animations + blinking

    // Step 7: Delete everything letter by letter
    setTimeout(() => {
      setBlinking(false);
      const fullText = `${place} ${year}`;
      deleteText(fullText, 500, (remainingText) => {
        setLogoText([
          <span key="remaining" className={styles.randomAlbum}>{remainingText}</span>,
        ]);
      });
    }, 2900); // Typing animations + 1s blinking

    // Step 8: Retype "M" with blinking underscore
    setTimeout(() => {
      setLogoText([<span key="M">M</span>]);
      setBlinking(true);
      setShowArrow(false);
      setIsAnimating(false); // End animation
    }, 3400); // 2900ms animation + 500ms deletion
  }

  return (
    <div className={styles.logo} onClick={handleLogoClick}>
      {showArrow && <span className={styles.arrow}>&gt;</span>}
      {logoText}
      {blinking && <span className={styles.underscore}>_</span>}
    </div>
  );
}
