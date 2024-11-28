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
  const router = useRouter();
  const pathname = usePathname();

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

  async function handleLogoClick() {
    if (pathname === '/') {
      try {
        const response = await api.get('/albums');
        const albums = response.data.data;
        if (albums.length > 0) {
          const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
          router.push(`/album/${randomAlbum.documentId}`);
        }
      } catch (error) {
        console.error('Error fetching random album:', error);
      }
    } else {
      router.push('/');
    }
  }

  return (
    <div>
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.logo} onClick={handleLogoClick}>
          M<span>_</span>
        </div>

        {/* Navigation Links */}
        <nav className={styles.navMenu}>
          <Link href="/albums">
            {counts.albums} albums
          </Link>
          <Link href="/places">
            {counts.places} places
          </Link>
          <Link href="/years">
            {counts.years} years
          </Link>
        </nav>

        {/* Burger Menu */}
        <div className={styles.burgerMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
