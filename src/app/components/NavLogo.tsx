'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLoader } from '@/app/utils/LoaderContext';
import api from '@/lib/api';
import styles from '@/app/styles/nav.module.css';

type NavLogoProps = {
  pathname: string; // Current pathname
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function NavLogo({ pathname }: NavLogoProps) {
  const router = useRouter();
  const [logoText, setLogoText] = useState<JSX.Element[]>([<span key="M">M</span>]);
  const [blinking, setBlinking] = useState<boolean>(true);
  const [showArrow, setShowArrow] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { setIsVisible } = useLoader();

  const handleLogoClick = async () => {
    if (isAnimating) return; // Prevent further clicks during animation

    if (pathname === '/') {
      // Navigate FROM home TO random album post
      fetchAndNavigateToRandomAlbum();
    } else {
      // Navigate BACK to the homepage
      const container = document.querySelector("main>div");
      container?.classList.add("page-transition");
      await sleep(500);
      router.push('/');
      await sleep(500);
      container?.classList.remove("page-transition");
    }
  };

  const fetchAndNavigateToRandomAlbum = async () => {
    try {
      const response = await api.get('/albums?populate=Year&populate=Places');
      const albums = response?.data?.data;

      if (Array.isArray(albums) && albums.length > 0) {
        const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
        const rawPlace = randomAlbum?.Places?.[0]?.Title || 'Place';
        const albumPlace = rawPlace.split(',')[0]; // Extract only the first part of the place, before comma
        const albumYear = randomAlbum?.Year?.Title || 'Year';

        animateLogoWithPlaceAndYear(albumPlace, albumYear);
        await sleep(500);
        const homeCenter = document.querySelector(".homeCenter");
        const homeBottom = document.querySelector(".homeBottom");
        homeCenter?.classList.add("page-transition");
        homeBottom?.classList.add("page-transition");
        setIsVisible(true); // This is needed, since it doesn't work like the other nav links
        await sleep(500);
        router.push(`/album/${randomAlbum.documentId}`);
      } else {
        displayFallbackText('No Albums Found');
      }
    } catch (error) {
      console.error('Error fetching random album:', error);
      displayFallbackText('Error Fetching Albums');
    }
  };

  const displayFallbackText = (message: string) => {
    setLogoText([
      <span key="error" className={`${styles.randomAlbumError} ${styles.blinking}`}>
        {message}
      </span>,
    ]);
    setBlinking(false);

    setTimeout(() => {
      setLogoText([<span key="M">M</span>]);
      setBlinking(true);
    }, 5000);
  };

  const animateLogoWithPlaceAndYear = (place: string, year: string) => {
    setIsAnimating(true);
    setBlinking(false);
    setShowArrow(false);
    setLogoText([<span key="M">M</span>]);

    // Type and delete text animation logic
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

    const deleteText = (text: string, delay: number, callback: (remaining: string) => void) => {
      const interval = delay / text.length;

      text.split('').forEach((_, index) => {
        setTimeout(() => {
          const remainingText = text.slice(0, text.length - (index + 1));
          callback(remainingText);
        }, index * interval);
      });
    };

    deleteText('M', 200, () => {
      setLogoText([]);
      setShowArrow(true);
    });

    setTimeout(() => {
      setBlinking(true);
    }, 200);

    setTimeout(() => {
      setBlinking(false);
    }, 400);

    setTimeout(() => {
      typeText(place, 600, (typedPlace) => {
        setLogoText([
          <span key="place" className={styles.randomAlbum}>{typedPlace}</span>,
        ]);
      });
    }, 400);

    setTimeout(() => {
      setBlinking(true);
    }, 1000);

    setTimeout(() => {
      setBlinking(false);
      typeText(year, 200, (typedYear) => {
        setLogoText([
          <span key="place" className={styles.randomAlbum}>{place}</span>,
          <span key="year" className={styles.randomAlbum}> {typedYear}</span>,
        ]);
      });
    }, 1400);

    setTimeout(() => {
      setBlinking(true);
    }, 1600);

    setTimeout(() => {
      setBlinking(false);
      const fullText = `${place} ${year}`;
      deleteText(fullText, 400, (remainingText) => {
        setLogoText([
          <span key="remaining" className={styles.randomAlbum}>{remainingText}</span>,
        ]);
      });
    }, 3200);

    setTimeout(() => {
      setLogoText([<span key="M">M</span>]);
      setBlinking(true);
      setShowArrow(false);
      setIsAnimating(false);
    }, 3600);
  };

  return (
    <div
      className={styles.logo}
      onClick={handleLogoClick}
    >
      {showArrow && <span className={styles.arrow}>&gt;</span>}
      {logoText}
      {blinking && <span className={styles.underscore}>_</span>}
    </div>
  );
}
