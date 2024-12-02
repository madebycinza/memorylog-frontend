'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import api from '@/lib/api';
import styles from './NavLayout.module.css';
import { useLoader } from '../contexts/LoaderContext';
import NavLogo from './NavLogo'; // Import NavLogo

type Counts = {
  albums: number;
  places: number;
  years: number;
};

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const [counts, setCounts] = useState<Counts>({ albums: 0, places: 0, years: 0 }); // State for counts
  const router = useRouter();
  const pathname = usePathname();
  const { triggerReverseLoader } = useLoader(); // Get loader controls

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

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault(); // Prevent default navigation
    triggerReverseLoader(); // Trigger loader slide-down animation
    setTimeout(() => router.push(href), 700); // Navigate after animation
  };

  return (
    <div>
      <header className={styles.header}>
        {/* Logo */}
        <NavLogo pathname={pathname} router={router} />

        {/* Navigation Links */}
        <nav className={styles.navMenu}>
          <Link href="/albums" onClick={(e) => handleNavLinkClick(e, '/albums')}>
            {counts.albums} albums
          </Link>
          <Link href="/places" onClick={(e) => handleNavLinkClick(e, '/places')}>
            {counts.places} places
          </Link>
          <Link href="/years" onClick={(e) => handleNavLinkClick(e, '/years')}>
            {counts.years} years
          </Link>
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
