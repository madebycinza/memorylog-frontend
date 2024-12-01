'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import api from '@/lib/api';
import styles from './NavLayout.module.css';

type Counts = {
  albums: number;
  places: number;
  years: number;
};

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const [counts, setCounts] = useState<Counts>({ albums: 0, places: 0, years: 0 });
  const [logoText, setLogoText] = useState<JSX.Element[]>([<span key="M">M</span>]); // State for animated logo text
  const [blinking, setBlinking] = useState<boolean>(true); // State to control blinking underscore
  const [showArrow, setShowArrow] = useState<boolean>(false); // State to control visibility of >
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // State to prevent multiple animations

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [albumsRes] = await Promise.all([
          api.get('/albums'),
          api.get('/places'),
          api.get('/years'),
        ]);

        setCounts({
          albums: albumsRes.data.data.length,
          places: albumsRes.data.data.length,
          years: albumsRes.data.data.length,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    }

    fetchCounts();
  }, []);

  async function handleLogoClick() {
    if (isAnimating) return; // Prevent further clicks during animation
  
    if (pathname === '/') {
      try {
        const response = await api.get('/albums?populate=Year&populate=Places');
        const albums = response?.data?.data;
  
        if (Array.isArray(albums) && albums.length > 0) {
          const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
          const rawPlace = randomAlbum?.Places?.[0]?.Title || 'Unknown Place';
          const albumYear = randomAlbum?.Year?.Title || 'Unknown Year';
  
          // Extract only the part before the comma in the place
          const albumPlace = rawPlace.split(',')[0];
  
          // Delay the navigation by 500ms
          setTimeout(() => {
            if (randomAlbum.documentId) {
              router.push(`/album/${randomAlbum.documentId}`);
            }
          }, 500);
  
          // Trigger the animation
          animateLogoWithPlaceAndYear(albumPlace, albumYear);
        } else {
          console.error('No albums found.');
          setLogoText([<span key="error">No Albums Found</span>]); // Fallback text
        }
      } catch (error) {
        console.error('Error fetching random album:', error);
        setLogoText([<span key="error">Error Fetching Albums</span>]); // Fallback text
      }
    } else {
      router.push('/');
    }
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

    // Step 2: Blink the ">" with underscore for 500ms
    setTimeout(() => {
      setBlinking(true);
    }, 200);

    setTimeout(() => {
      setBlinking(false);
    }, 700); // 200ms deletion + 500ms blinking

    // Step 3: Type out the place
    setTimeout(() => {
      typeText(place, 800, (typedPlace) => {
        setLogoText([
          <span key="place" className={styles.randomAlbum}>{typedPlace}</span>,
        ]);
      });
    }, 700); // 200ms deletion + 500ms blinking

    // Step 4: Pause for 500ms with blinking underscore
    setTimeout(() => {
      setBlinking(true);
    }, 1500); // Typing place duration + 700ms

    // Step 5: Type out the year
    setTimeout(() => {
      setBlinking(false);
      typeText(year, 200, (typedYear) => {
        setLogoText([
          <span key="place" className={styles.randomAlbum}>{place}</span>,
          <span key="year" className={styles.randomAlbum}> {typedYear}</span>,
        ]);
      });
    }, 2000); // Typing place + 500ms pause

    // Step 6: Blink for 2 seconds
    setTimeout(() => {
      setBlinking(true);
    }, 2200); // Typing animations + blinking

    // Step 7: Delete everything letter by letter
    setTimeout(() => {
      setBlinking(false);
      const fullText = `${place} ${year}`;
      deleteText(fullText, 500, (remainingText) => {
        setLogoText([
          <span key="remaining" className={styles.randomAlbum}>{remainingText}</span>,
        ]);
      });
    }, 4200); // Typing animations + 2s blinking

    // Step 8: Retype "M" with blinking underscore
    setTimeout(() => {
      setLogoText([<span key="M">M</span>]);
      setBlinking(true);
      setShowArrow(false);
      setIsAnimating(false); // End animation
    }, 4700); // 4200ms animation + 500ms deletion
  }

  return (
    <div>
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.logo} onClick={handleLogoClick}>
          {showArrow && <span className={styles.arrow}>&gt;</span>}
          {logoText}
          {blinking && <span className={styles.underscore}>_</span>}
        </div>

        {/* Navigation Links */}
        <nav className={styles.navMenu}>
          <Link href="/albums">{counts.albums} albums</Link>
          <Link href="/places">{counts.places} places</Link>
          <Link href="/years">{counts.years} years</Link>
        </nav>

        {/* Plus icon */}
        <Link href="/about" className={styles.plusIcon}>
          +
        </Link>
      </header>

      <main>{children}</main>
    </div>
  );
}
