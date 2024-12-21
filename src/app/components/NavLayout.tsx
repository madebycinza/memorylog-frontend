'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TransitionLink } from '@/app/utils/TransitionLink';
import NavLogo from '@/app/components/NavLogo';
import api from '@/lib/api';
import styles from '@/app/styles/nav.module.css';

type Counts = {
  albums: number;
  places: number;
  years: number;
};

export default function NavLayout() {
  const [counts, setCounts] = useState<Counts>({ albums: 0, places: 0, years: 0 }); // State for counts
  const pathname = usePathname();

  // Fetch counts for albums, places, and years
  useEffect(() => {
    async function fetchCounts() {
      try {
        const [albumsRes, placesRes, yearsRes] = await Promise.all([
          api.get('/albums'),
          api.get('/places'),
          api.get('/years'),
        ]);

        setCounts({
          albums: albumsRes.data.data.length,
          places: placesRes.data.data.length,
          years: yearsRes.data.data.length,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div>
      <header className={styles.header}>
        {/* Logo */}
        <NavLogo pathname={pathname} />

        {/* Navigation Links */}
        <nav className={styles.navMenu}>
          <TransitionLink href="/albums">{counts.albums} albums</TransitionLink>
          <TransitionLink href="/places">{counts.places} places</TransitionLink>
          <TransitionLink href="/years">{counts.years} years</TransitionLink>
        </nav>

        {/* Plus icon */}
        <TransitionLink href="/about" className={styles.plusIcon}>+</TransitionLink>
      </header>
    </div>
  );
}