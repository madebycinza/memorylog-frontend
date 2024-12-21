'use client';

import { useEffect, useState } from 'react';
import { TransitionLink } from '@/app/utils/TransitionLink';
import TransitionContent from '@/app/utils/TransitionContent';
import api from '@/lib/api';

type Album = {
  id: number;
  documentId: string;
  Title: string;
};

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        // Fetch only published albums using the correct query
        const response = await api.get('/albums?status=published');
        setAlbums(response.data.data); // Update state with published albums
      } catch (err) {
        console.error('Error fetching albums:', err);
        setError('Failed to load albums.');
      } finally {
        setLoading(false);
      }
    }

    fetchAlbums();
  }, []);

  if (loading) return <p></p>;
  if (error) return <p>{error}</p>;

  return (
    <TransitionContent>
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <TransitionLink href={`/album/${album.documentId}`}>{album.Title}</TransitionLink>
          </li>
        ))}
      </ul>
    </TransitionContent>
  );
}
